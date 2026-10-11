//Plugin by Zeno — zenobot playlist (porting di pl.js)
import fs from 'fs'
import os from 'os'
import path from 'path'
import { execFile } from 'child_process'
import yts from 'yt-search'

const ROOT = process.cwd()
const playlistDbPath = path.join(ROOT, 'playlist_db.json')
const TMP = os.tmpdir()
const MAX_PL = 100
const DEFAULT_PFP = 'https://i.postimg.cc/266mKgQj/lv-0-20260913184208.jpg'
global.plQueues = global.plQueues || {}

const readDb = (p = playlistDbPath) => {
  if (!fs.existsSync(p)) return {}
  try { return JSON.parse(fs.readFileSync(p, 'utf8')) } catch { return {} }
}
const writeDb = (data, p = playlistDbPath) => {
  try { fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8') }
  catch (e) { console.error('[PL DB]', e.message) }
}
const rm = (p) => { try { if (p && fs.existsSync(p)) fs.unlinkSync(p) } catch {} }
const run = (cmd, args, maxBuffer = 1024 * 1024 * 20) => new Promise((resolve, reject) => {
  execFile(cmd, args, { maxBuffer }, (err, stdout, stderr) => err ? reject(new Error(stderr || err.message)) : resolve(stdout))
})
// accetta solo link http(s) validi: evita opzioni o testo strano passati a yt-dlp
const validUrl = (s) => { try { const u = new URL(String(s).trim()); return /^https?:$/.test(u.protocol) ? u.href : null } catch { return null } }

const extractSpotifyTracks = async (url) => {
  try {
    const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } })
    const html = await response.text()
    const titleMatch = html.match(/<title>(.*?)<\/title>/)
    if (!titleMatch) return []
    const title = titleMatch[1].replace(' - Spotify', '').replace(' | Spotify', '').replace('• Spotify', '').trim()
    if (url.includes('playlist') || url.includes('album')) {
      const matches = html.match(/<span class="track-name">(.*?)<\/span>/g) || html.match(/"name":"(.*?)"/g)
      if (matches?.length) {
        const tracks = matches.map(t => ({ title: t.replace(/<[^>]*>/g, '').replace(/"name":"/g, '').replace(/"$/g, '') })).filter(t => t.title)
        if (tracks.length) return tracks
      }
    }
    return title ? [{ title }] : []
  } catch (e) { console.error('[SPOTIFY]', e.message); return [] }
}

async function downloadAndConvert(trackUrl, tag) {
  const url = validUrl(trackUrl)
  if (!url) throw new Error('Link non valido')
  const inMp3 = path.join(TMP, `zb_pl_${tag}.mp3`)
  const outOgg = path.join(TMP, `zb_pl_${tag}.ogg`)
  try {
    await run('yt-dlp', ['-x', '--audio-format', 'mp3', '--audio-quality', '128k', '--no-part', '--no-playlist',
      '--extractor-args', 'youtube:player-client=android,web', '-o', inMp3, '--', url])
    if (!fs.existsSync(inMp3)) throw new Error('Download fallito')
    await run('ffmpeg', ['-y', '-i', inMp3, '-c:a', 'libopus', '-b:a', '64k', '-vbr', 'on', '-compression_level', '10', '-ar', '48000', '-ac', '1', '-threads', '0', '-f', 'ogg', outOgg])
    if (!fs.existsSync(outOgg)) throw new Error('Conversione fallita')
    return outOgg
  } catch (e) { rm(outOgg); throw e } finally { rm(inMp3) }
}

async function mergePlaylist(conn, jid, tracks, m) {
  const dir = fs.mkdtempSync(path.join(TMP, 'zb_merge_'))
  const finalM4a = path.join(TMP, `zb_playlist_${Date.now()}.m4a`)
  const listFile = path.join(dir, 'list.txt')
  const metaFile = path.join(dir, 'meta.txt')
  const status = await conn.sendMessage(jid, { text: `🎛️ *Fusione playlist avviata*\n\n📊 Brano 0/${tracks.length}...` })
  const files = [], titles = [], durations = []

  for (let i = 0; i < tracks.length; i++) {
    const t = tracks[i]
    try {
      const ogg = await downloadAndConvert(t.url, `${Date.now()}_${i}`)
      const dest = path.join(dir, `track_${String(i).padStart(3, '0')}.ogg`)
      fs.copyFileSync(ogg, dest); rm(ogg)
      let dur = 0
      try { dur = parseFloat((await run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', dest])).trim()) || 0 } catch {}
      files.push(dest); titles.push(t.title || `Brano ${i + 1}`); durations.push(dur)
      await conn.sendMessage(jid, { text: `🎛️ *Fusione playlist in corso...*\n\n📊 Brano ${i + 1}/${tracks.length} ✔️\n🎵 _${(t.title || 'Sconosciuto').substring(0, 50)}_`, edit: status.key }).catch(() => {})
    } catch (e) {
      console.error(`[PL] brano ${i + 1}:`, e.message)
      await conn.sendMessage(jid, { text: `🎛️ *Fusione in corso...*\n\n📊 Brano ${i + 1}/${tracks.length} ⚠️ saltato\n🎵 _${(t.title || 'Sconosciuto').substring(0, 50)}_`, edit: status.key }).catch(() => {})
    }
  }

  if (!files.length) {
    fs.rmSync(dir, { recursive: true, force: true })
    return conn.sendMessage(jid, { text: '✖️ Nessun brano scaricato. Riprova più tardi.' }, { quoted: m })
  }

  fs.writeFileSync(listFile, files.map(f => `file '${f.replace(/'/g, "'\\''")}'`).join('\n'), 'utf8')
  let t0 = 0
  let meta = ';FFMETADATA1\ntitle=Playlist ZenoBot\nartist=ZenoBot\n\n'
  for (let i = 0; i < files.length; i++) {
    meta += `[CHAPTER]\nTIMEBASE=1/1000\nSTART=${Math.floor(t0 * 1000)}\nEND=${Math.floor((t0 + durations[i]) * 1000)}\ntitle=${titles[i].replace(/[\n=;]/g, ' ')}\n\n`
    t0 += durations[i]
  }
  fs.writeFileSync(metaFile, meta, 'utf8')

  try {
    await run('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', listFile, '-i', metaFile, '-map_metadata', '1', '-c:a', 'aac', '-b:a', '96k', '-ar', '44100', '-ac', '2', '-movflags', '+faststart', finalM4a])
  } catch (e) {
    console.error('[PL MERGE]', e.message)
    fs.rmSync(dir, { recursive: true, force: true }); rm(finalM4a)
    return conn.sendMessage(jid, { text: '✖️ Errore durante la fusione dei brani.' }, { quoted: m })
  }
  fs.rmSync(dir, { recursive: true, force: true })
  const sizeMB = (fs.statSync(finalM4a).size / (1024 * 1024)).toFixed(2)
  try {
    await conn.sendMessage(jid, { audio: fs.readFileSync(finalM4a), mimetype: 'audio/mp4', ptt: false, fileName: `Playlist_Zenobot_${new Date().toISOString().slice(0, 10)}.m4a` }, { quoted: m })
    await conn.sendMessage(jid, { text: `✔️ *Playlist fusa con successo!*\n\n🎵 *${files.length}* brani con capitoli\n📦 Dimensione: *${sizeMB} MB*\n\n💾 Salva il file e aprilo con VLC / Musicolet per vedere i capitoli.`, edit: status.key }).catch(() => {})
  } catch (e) {
    console.error('[PL SEND]', e.message)
    await conn.sendMessage(jid, { text: "✖️ Errore durante l'invio del file." }, { quoted: m })
  } finally { setTimeout(() => rm(finalM4a), 10000) }
}

async function processQueue(conn, jid, sender) {
  const q = global.plQueues[sender]
  if (!q || !q.tracks.length) {
    if (q) delete global.plQueues[sender]
    return conn.sendMessage(jid, { text: '✔️ Playlist completata!' }).catch(() => {})
  }
  const track = q.tracks.shift()
  let ogg
  try { ogg = await downloadAndConvert(track.url, `q_${Date.now()}`) } catch { return processQueue(conn, jid, sender) }
  if (!global.plQueues[sender]) return rm(ogg)
  try { await conn.sendMessage(jid, { audio: fs.readFileSync(ogg), mimetype: 'audio/ogg; codecs=opus', ptt: true }) }
  catch (e) { console.error('[PL QUEUE]', e.message) }
  finally { rm(ogg); if (global.plQueues[sender]) processQueue(conn, jid, sender) }
}

async function playSingle(conn, jid, track, m) {
  await conn.sendMessage(jid, { react: { text: '🎧', key: m.key } }).catch(() => {})
  let ogg
  try { ogg = await downloadAndConvert(track.url, `s_${Date.now()}`) }
  catch { return conn.sendMessage(jid, { text: '✖️ Errore download.' }, { quoted: m }) }
  try { await conn.sendMessage(jid, { audio: fs.readFileSync(ogg), mimetype: 'audio/ogg; codecs=opus', ptt: true }, { quoted: m }) }
  catch (e) { console.error('[PL SINGLE]', e.message) }
  finally { setTimeout(() => rm(ogg), 5000) }
}

const selectBtn = (title, sections) => ({
  name: 'single_select',
  buttonParamsJson: JSON.stringify({ title, sections })
})

let handler = async (m, { conn, args, command }) => {
  const jid = m.chat
  const sender = m.sender
  const send = (content) => conn.sendMessage(jid, content, { quoted: m })

  let sub, rest
  if (command === 'pl') { sub = (args[0] || '').toLowerCase(); rest = args.slice(1).join(' ') }
  else if (command === 'clearpl') { sub = 'clear'; rest = '' }
  else { sub = command.replace(/^pl_/, '').toLowerCase(); rest = args.join(' ') }

  const db = readDb()
  const tracks = db[sender] || []

  if (/^del_\d+$/.test(sub)) {
    const idx = parseInt(sub.replace('del_', ''))
    if (idx < 0 || idx >= tracks.length) return send({ text: '✖️ Brano non trovato.' })
    const [removed] = tracks.splice(idx, 1)
    db[sender] = tracks; writeDb(db)
    return send({ text: `🗑️ *Brano rimosso:*\n_${removed.title || 'Sconosciuto'}_\n\n📀 Rimasti: *${tracks.length}* brani`, mentions: [sender] })
  }

  if (sub === 'askdel') {
    if (!tracks.length) return send({ text: '✖️ La tua playlist è vuota.' })
    const rows = tracks.slice(0, 10).map((t, i) => ({ title: `🗑️ ${i + 1}. ${String(t.title || 'Sconosciuto').substring(0, 40)}`, description: 'Tocca per eliminare questo brano', id: `.pl_del_${i}` }))
    try {
      return await send({
        text: `🗑️ *ELIMINA UN BRANO*\n\nScegli il brano da rimuovere.\n📀 Brani totali: ${tracks.length}` + (tracks.length > 10 ? '\n_Per gli altri usa_ `.pl del 12`' : ''),
        footer: 'ᴢᴇɴᴏʙᴏᴛ • ᴘʟᴀʏʟɪꜱᴛ',
        cards: [{ image: { url: DEFAULT_PFP }, title: '🗑️ Elimina brano', body: 'Apri la lista e scegli.', footer: 'ᴢᴇɴᴏʙᴏᴛ', buttons: [selectBtn('🗑️ Scegli brano', [{ title: 'I tuoi brani', rows }])] }]
      })
    } catch {
      return send({ text: `🗑️ *ELIMINA UN BRANO*\n\nUsa \`.pl del <numero>\`\n\n` + tracks.slice(0, 20).map((t, i) => `${i + 1}. ${t.title}`).join('\n') })
    }
  }

  if (sub === 'clear') {
    if (!tracks.length) return send({ text: '✖️ La tua playlist è già vuota.' })
    db[sender] = []; writeDb(db)
    return send({ text: `🗑️ Playlist svuotata! Rimossi *${tracks.length}* brani.` })
  }

  if (sub === 'merge' || sub === 'fusion') {
    if (!tracks.length) return send({ text: '✖️ La tua playlist è vuota. Aggiungi brani con `.pl add [link]`.' })
    return mergePlaylist(conn, jid, tracks, m)
  }

  if (sub === 'stop') {
    if (global.plQueues[sender]) { delete global.plQueues[sender]; return send({ text: '⏹️ Riproduzione della playlist interrotta.' }) }
    return send({ text: '⚠️ Nessuna riproduzione in corso al momento.' })
  }

  if (sub === 'del') {
    const idx = parseInt(rest.trim()) - 1
    if (isNaN(idx) || idx < 0 || idx >= tracks.length) return send({ text: '✖️ Specifica un numero valido (Esempio: `.pl del 2`).' })
    const [removed] = tracks.splice(idx, 1)
    db[sender] = tracks; writeDb(db)
    return send({ text: `🗑️ Brano rimosso:\n*${removed.title || 'Sconosciuto'}*` })
  }

  if (sub === 'add') {
    const link = validUrl(rest)
    if (!link) return send({ text: '✖️ Inserisci un link valido dopo `add` (Esempio: `.pl add https://...`).' })
    if (tracks.length >= MAX_PL) return send({ text: `⚠️ Playlist piena (max ${MAX_PL} brani).` })

    if (new URL(link).hostname.endsWith('spotify.com')) {
      await send({ text: '⏳ Analisi link Spotify in corso...' })
      const found = await extractSpotifyTracks(link)
      if (!found.length) return send({ text: '✖️ Nessun brano trovato su Spotify.' })
      db[sender] = db[sender] || []
      let added = 0
      for (const t of found) {
        if (db[sender].length >= MAX_PL) break
        try {
          const s = await yts(t.title)
          const v = s?.videos?.[0]
          if (v) { db[sender].push({ title: v.title, url: v.url, duration: v.timestamp || '--:--' }); added++ }
        } catch (e) { console.error('[PL YT SEARCH]', e.message) }
      }
      if (!added) return send({ text: '✖️ Nessun brano trovato su YouTube per questi titoli.' })
      writeDb(db)
      return send({ text: `✔️ Aggiunti *${added}* brani da Spotify alla playlist!` })
    }

    let out
    try { out = await run('yt-dlp', ['--flat-playlist', '--dump-json', '--', link], 1024 * 1024 * 10) }
    catch { return send({ text: '✖️ Errore durante la lettura del link.' }) }
    db[sender] = db[sender] || []
    let added = 0
    for (const line of out.trim().split('\n')) {
      if (db[sender].length >= MAX_PL) break
      try {
        const info = JSON.parse(line)
        let u = info.url || (info.id ? `https://www.youtube.com/watch?v=${info.id}` : null)
        if (u && !u.startsWith('http') && info.id) u = `https://www.youtube.com/watch?v=${info.id}`
        u = u && validUrl(u)
        if (u) { db[sender].push({ title: info.title || 'Brano importato', url: u }); added++ }
      } catch {}
    }
    if (!added) return send({ text: '✖️ Nessun brano trovato in questo link.' })
    writeDb(db)
    return send({ text: `✔️ Aggiunti *${added}* brani alla playlist!\nUsa \`.pl\` per vederla o \`.pl all\` per ascoltarli.` })
  }

  if (sub === 'all') {
    if (!tracks.length) return send({ text: '✖️ La tua playlist è vuota.' })
    if (global.plQueues[sender]) return send({ text: '⚠️ Coda già attiva! Usa `.pl stop` per fermarla.' })
    global.plQueues[sender] = { tracks: [...tracks], total: tracks.length }
    await send({ text: `▶️ Avvio riproduzione continua di ${tracks.length} brani!` })
    return processQueue(conn, jid, sender)
  }

  let playIdx = null
  if (sub === 'play' && /^\d+$/.test(rest.trim())) playIdx = parseInt(rest.trim()) - 1
  else if (sub.startsWith('select_')) playIdx = parseInt(sub.replace('select_', ''))
  if (playIdx !== null && !isNaN(playIdx)) {
    const t = tracks[playIdx]
    if (!t?.url) return send({ text: '✖️ Brano non trovato.' })
    return playSingle(conn, jid, t, m)
  }

  /* MENU PLAYLIST */
  if (!tracks.length) return send({ text: '✖️ La tua playlist (.pl) è vuota! Aggiungi un brano col bottone ➕ di `.song` oppure con `.pl add [link]`.' })

  const name = m.pushName || 'Utente'
  const total = tracks.length
  const rows = tracks.slice(0, 20).map((t, i) => ({
    title: `${i + 1}. ${String(t.title || 'Sconosciuto').substring(0, 40)}`,
    description: t.duration ? `⏱️ ${t.duration} • tocca per ascoltare` : 'Tocca per ascoltare',
    id: `.pl_select_${i}`
  }))
  rows.push({ title: '🗑️ Elimina un brano...', description: 'Scegli quale brano rimuovere', id: '.pl_askdel' })
  rows.push({ title: '✖️ Svuota playlist', description: `Cancella tutti i ${total} brani`, id: '.pl_clear' })

  let pfp
  try { pfp = await conn.profilePictureUrl(sender, 'image') } catch { pfp = DEFAULT_PFP }

  try {
    return await send({
      text: `🌸 *ᴘʟᴀʏʟɪꜱᴛ ᴅɪ ${name.toUpperCase()}*`,
      footer: 'ᴢᴇɴᴏʙᴏᴛ',
      cards: [{
        image: { url: pfp },
        title: `🌸 Playlist di ${name}`,
        body: `Brani salvati: ${total}\nTocca "Apri playlist" per ascoltare, fondere o eliminare brani.`,
        footer: 'ᴢᴇɴᴏʙᴏᴛ • ᴍᴜꜱɪᴄ ᴘʟᴀʏʟɪꜱᴛ',
        buttons: [selectBtn('📂 Apri playlist', [
          { title: 'Azioni', rows: [
            { title: '▶️ Riproduci tutto', description: 'Tutti i brani in sequenza', id: '.pl_all' },
            { title: '🎛️ Fondi playlist', description: 'Un unico file con tutte le tracce', id: '.pl_merge' },
            { title: '⏹️ Stop', description: 'Ferma la riproduzione', id: '.pl_stop' }
          ] },
          { title: 'I tuoi brani', rows }
        ])]
      }],
      mentions: [sender]
    })
  } catch (e) {
    console.error('[PL CARD]', e.message)
  }

  try {
    return await send({
      image: { url: pfp },
      caption: `🌸 *ᴘʟᴀʏʟɪꜱᴛ ᴅɪ ${name.toUpperCase()}*\n📀 Brani: ${total}`,
      footer: 'ᴢᴇɴᴏʙᴏᴛ • ᴍᴜꜱɪᴄ ᴘʟᴀʏʟɪꜱᴛ',
      buttons: [
        { buttonId: '.pl_all', buttonText: { displayText: '▶️ Riproduci tutto' }, type: 1 },
        { buttonId: '.pl_merge', buttonText: { displayText: '🎛️ Fondi playlist' }, type: 1 },
        { buttonId: '.pl_askdel', buttonText: { displayText: '🗑️ Elimina brano' }, type: 1 }
      ],
      headerType: 1
    })
  } catch (e) {
    console.error('[PL BUTTONS]', e.message)
    return send({ text: `🌸 *ᴘʟᴀʏʟɪꜱᴛ ᴅɪ ${name.toUpperCase()}* (${total})\n\n` + tracks.slice(0, 30).map((t, i) => `${i + 1}. ${t.title}`).join('\n') + '\n\n_Comandi:_ `.pl play <n>` · `.pl all` · `.pl merge` · `.pl del <n>` · `.pl stop` · `.pl clear`' })
  }
}

handler.help = ['pl']
handler.tags = ['fun']
handler.command = /^(pl|clearpl|pl_(add|all|stop|merge|fusion|del|clear|askdel|select_\d+|del_\d+))$/i

export default handler

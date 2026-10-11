//Plugin by Zeno — zenobot music (porting di Song.js)
import fs from 'fs'
import os from 'os'
import path from 'path'
import { execFile } from 'child_process'
import yts from 'yt-search'

const ROOT = process.cwd()
const dbPath = path.join(ROOT, 'zenomusic_db.json')
const playlistDbPath = path.join(ROOT, 'playlist_db.json')
const TMP = os.tmpdir()
const MAX_PL = 100

const DIV = '⋆｡˚ ❀ ˚｡⋆'
const TITLE = `🌸 *ᴢᴇɴᴏʙᴏᴛ ᴍᴜꜱɪᴄ* 🌸\n${DIV}`
const msgError = (t) => `${TITLE}\n\n✖️  ${t}\n\n${DIV}`
const msgOk = (t) => `${TITLE}\n\n✔️  ${t}\n\n${DIV}`
const msgWarn = (t) => `${TITLE}\n\n⚠️  ${t}\n\n${DIV}`

const readDb = (p = dbPath) => {
  if (!fs.existsSync(p)) return {}
  try { return JSON.parse(fs.readFileSync(p, 'utf8')) } catch { return {} }
}
const writeDb = (data, p = dbPath) => {
  try { fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8') }
  catch (e) { console.error('[MUSIC DB]', e.message) }
}
const rm = (p) => { try { if (p && fs.existsSync(p)) fs.unlinkSync(p) } catch {} }
const run = (cmd, args, maxBuffer = 1024 * 1024 * 20) => new Promise((resolve, reject) => {
  execFile(cmd, args, { maxBuffer }, (err, stdout, stderr) => err ? reject(new Error(stderr || err.message)) : resolve(stdout))
})
const formatNumber = (n) => {
  if (!n && n !== 0) return 'N/D'
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
  return String(n)
}

let handler = async (m, { conn, text, command }) => {
  const chatId = m.chat
  const sender = m.sender
  const key = `${chatId}::${sender}`
  const send = (content) => conn.sendMessage(chatId, content, { quoted: m })
  const react = (emoji) => conn.sendMessage(chatId, { react: { text: emoji, key: m.key } }).catch(() => {})

  /* ① RICERCA */
  if (command === 'song') {
    const query = (text || '').trim()
    if (!query) return send({ text: msgError('Inserisci il titolo della canzone!\n\n💡 _Esempio:_ `.song Believer`') })

    await react('🔍')
    let search = null
    try { search = await yts(query) } catch (e) { console.error('[YTS]', e.message) }
    if (!search?.videos?.length) return send({ text: msgError(`Nessun risultato per:\n_"${query}"_`) })

    const vid = search.videos[0]
    const db = readDb()
    db[key] = {
      url: vid.url, title: vid.title, duration: vid.timestamp,
      thumbnail: vid.thumbnail, author: vid.author?.name || 'N/D',
      views: vid.views, savedAt: Date.now()
    }
    writeDb(db)

    const caption =
      `${TITLE}\n\n🎼 *${vid.title}*\n\n` +
      `👤 *Artista:* ${vid.author?.name || 'N/D'}\n` +
      `⏱️ *Durata:* ${vid.timestamp}\n` +
      `👁️ *Views:* ${formatNumber(vid.views)}\n` +
      `📅 *Pubblicato:* ${vid.ago || 'N/D'}\n\n` +
      `${DIV}\n🌷 _Scegli un'opzione qui sotto_ 👇`

    try {
      return await send({
        image: { url: vid.thumbnail },
        caption,
        footer: 'ᴢᴇɴᴏʙᴏᴛ • ᴍᴜꜱɪᴄ',
        buttons: [
          { buttonId: '.sendnormal', buttonText: { displayText: '🎵 Audio HQ' }, type: 1 },
          { buttonId: '.sendvideo', buttonText: { displayText: '🎬 Video MP4' }, type: 1 },
          { buttonId: '.addplaylist', buttonText: { displayText: '➕ Aggiungi a .pl' }, type: 1 }
        ],
        headerType: 1
      })
    } catch (e) {
      console.error('[MUSIC CARD]', e.message)
      return send({ text: caption + '\n\n_Comandi:_ `.sendnormal` · `.sendvideo` · `.addplaylist`' })
    }
  }

  const track = readDb()[key]
  if (!track?.url) return send({ text: msgError('Nessun brano selezionato.\nUsa prima `.song <titolo>`') })

  /* ② AUDIO VOCALE */
  if (command === 'sendnormal') {
    await react('🎧')
    const stamp = Date.now()
    const inMp3 = path.join(TMP, `zb_song_${stamp}.mp3`)
    const outOgg = path.join(TMP, `zb_song_${stamp}.ogg`)
    try {
      await run('yt-dlp', ['-x', '--audio-format', 'mp3', '--audio-quality', '192K',
        '--extractor-args', 'youtube:player-client=android,web', '--no-playlist', '--no-warnings',
        '-o', inMp3, '--', track.url])
    } catch (e) {
      console.error('[YT-DLP]', e.message)
      rm(inMp3)
      return send({ text: msgError('Download audio fallito 😢\nRiprova tra qualche secondo.') })
    }
    try {
      await run('ffmpeg', ['-y', '-i', inMp3, '-vn', '-c:a', 'libopus', '-b:a', '128k', '-ar', '48000', '-ac', '1', '-f', 'ogg', outOgg])
    } catch (e) {
      console.error('[FFMPEG]', e.message)
      rm(inMp3); rm(outOgg)
      return send({ text: msgError('Conversione vocale fallita 😢') })
    }
    rm(inMp3)
    try {
      await send({ audio: fs.readFileSync(outOgg), mimetype: 'audio/ogg; codecs=opus', ptt: true })
      await react('✔️')
    } catch (e) {
      console.error('[SEND AUDIO]', e.message)
      await send({ text: msgError('Invio audio fallito 😢') })
    } finally { rm(outOgg) }
    return
  }

  /* ③ VIDEO */
  if (command === 'sendvideo') {
    await react('⏳')
    const out = path.join(TMP, `zb_video_${Date.now()}.mp4`)
    try {
      await run('yt-dlp', ['-f', 'best[ext=mp4][height<=720]/best[ext=mp4]/best',
        '--extractor-args', 'youtube:player-client=android,web', '--no-playlist', '--no-warnings',
        '-o', out, '--', track.url], 1024 * 1024 * 100)
    } catch (e) {
      console.error('[YT-DLP VIDEO]', e.message)
      rm(out)
      return send({ text: msgError('Download video fallito 😢') })
    }
    if (!fs.existsSync(out)) return send({ text: msgError('File video non generato 😢') })
    const sizeMB = fs.statSync(out).size / (1024 * 1024)
    if (sizeMB > 64) {
      rm(out)
      return send({ text: msgError(`Video troppo grande (${sizeMB.toFixed(1)} MB).\nLimite: 64 MB`) })
    }
    try {
      await send({ video: fs.readFileSync(out), caption: `🎬 *${track.title}*\n\n🌸 _ᴢᴇɴᴏʙᴏᴛ ᴍᴜꜱɪᴄ_`, mimetype: 'video/mp4' })
      await react('✔️')
    } catch (e) {
      console.error('[SEND VIDEO]', e.message)
      await send({ text: msgError('Invio video fallito 😢') })
    } finally { rm(out) }
    return
  }

  /* ④ AGGIUNGI ALLA PLAYLIST */
  if (command === 'addplaylist') {
    const plDb = readDb(playlistDbPath)
    if (!plDb[sender]) plDb[sender] = []
    if (plDb[sender].some(t => t.url === track.url)) return send({ text: msgWarn(`*Già in playlist!*\n\n🎼 _${track.title}_`) })
    if (plDb[sender].length >= MAX_PL) return send({ text: msgWarn(`Playlist piena (max ${MAX_PL} brani).`) })
    plDb[sender].push({ url: track.url, title: track.title, duration: track.duration, addedAt: Date.now() })
    writeDb(plDb, playlistDbPath)
    return send({ text: msgOk(`*Aggiunto alla playlist!*\n\n🎼 _${track.title}_\n⏱️ ${track.duration || 'N/D'}\n\n📊 Brani totali: *${plDb[sender].length}*`) })
  }
}

handler.help = ['song']
handler.tags = ['fun']
handler.command = /^(song|sendnormal|sendvideo|addplaylist)$/i

export default handler

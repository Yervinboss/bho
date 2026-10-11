//Plugin ZENOBOT — porting da tag.js (ZENO ULTIMATE)
let handler = async (m, { conn, text }) => {
  let meta
  try { meta = await conn.groupMetadata(m.chat) } catch { return m.reply('✖️ Errore lettura gruppo.') }
  const all = meta.participants.map(p => p.id)

  if (m.quoted) {
    const q = m.quoted
    const mime = (q.msg || q).mimetype || q.mediaType || ''
    try {
      if (/image/i.test(mime)) return conn.sendMessage(m.chat, { image: await q.download(), caption: q.text || '', mentions: all })
      if (/video/i.test(mime)) return conn.sendMessage(m.chat, { video: await q.download(), caption: q.text || '', mentions: all })
      if (/audio/i.test(mime)) return conn.sendMessage(m.chat, { audio: await q.download(), mimetype: 'audio/ogg; codecs=opus', ptt: !!q.msg?.ptt, mentions: all })
      if (q.mtype === 'stickerMessage') return conn.sendMessage(m.chat, { sticker: await q.download(), contextInfo: { mentionedJid: all } })
      if (q.text) return conn.sendMessage(m.chat, { text: q.text, mentions: all })
    } catch (e) { console.error('[TAG]', e.message); return m.reply('✖️ Errore durante l\'invio.') }
  }

  if (text?.trim()) return conn.sendMessage(m.chat, { text: text.trim(), mentions: all })
  return m.reply('✖️ Scrivi un testo dopo `.tag`, oppure rispondi a un messaggio/foto/video/sticker con `.tag`.')
}

handler.command = /^tag$/i
handler.group = true
handler.admin = true

export default handler

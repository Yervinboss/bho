//Plugin ZENOBOT — porting da setbotpp.js (ZENO ULTIMATE)
let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  if (!/image/i.test(mime)) return m.reply('📸 Rispondi a un\'immagine con questo comando.')

  try {
    const buffer = await q.download()
    await conn.updateProfilePicture(conn.user.id, buffer)
    return m.reply('🤖 Foto profilo del bot aggiornata!')
  } catch (e) {
    console.error('[SETBOTPP]', e.message)
    return m.reply('✖️ Errore aggiornamento foto profilo.')
  }
}

handler.command = /^(setbotpp|botpp|cambiafotobot)$/i
handler.owner = true

export default handler

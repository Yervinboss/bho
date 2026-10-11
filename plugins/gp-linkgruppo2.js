//Plugin ZENOBOT — porting da link_gruppo.js (ZENO ULTIMATE)
import QRCode from 'qrcode'

let handler = async (m, { conn, command }) => {
  try {
    const code = await conn.groupInviteCode(m.chat)
    const link = `https://chat.whatsapp.com/${code}`

    if (command === 'qr' || command === 'qrlink') {
      const buf = await QRCode.toBuffer(link, { type: 'png', margin: 4, scale: 10, errorCorrectionLevel: 'H' })
      return conn.sendMessage(m.chat, { image: buf, caption: `📸 *QR CODE GRUPPO*\n\n🔗 ${link}` }, { quoted: m })
    }
    return conn.sendMessage(m.chat, { text: `🔗 *LINK DI INVITO*\n\n${link}` }, { quoted: m })
  } catch (e) {
    console.error('[LINK GRUPPO]', e.message)
    return m.reply('✖️ Errore: assicurati che il bot sia admin.')
  }
}

handler.command = /^(link|invito|qr|qrlink)$/i
handler.group = true
handler.admin = true

export default handler

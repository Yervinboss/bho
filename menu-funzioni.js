//Plugin by plugins zero

import fs from 'fs'

let handler = async (m, { conn, usedPrefix }) => {
  const imgBuffer = fs.readFileSync('icone/zenobot.jpg')

  const fake = {
    key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'zenobotFunzioni' },
    message: {
      locationMessage: {
        name: '⚙️ ᴍᴇɴᴜ ꜰᴜɴᴢɪᴏɴɪ',
        jpegThumbnail: imgBuffer.toString('base64'),
        vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;zenobot;;;\nFN:zenobot\nEND:VCARD'
      }
    },
    participant: '0@s.whatsapp.net'
  }

  const text = `⋆˚｡⋆୨🌸୧⋆｡˚⋆
⚙️ ᴍᴇɴᴜ ꜰᴜɴᴢɪᴏɴɪ
⋆｡˚ ❀ ˚｡⋆
⋆˚｡⋆୨🌸୧⋆｡˚⋆`.trim()

  await conn.sendMessage(m.chat, { text }, { quoted: fake })
}

handler.help = ['funzioni']
handler.tags = ['menu']
handler.command = /^(funzioni)$/i

export default handler

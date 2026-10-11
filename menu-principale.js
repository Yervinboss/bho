//Plugin by plugins zero

const SECTIONS = []

let handler = async (m, { conn, usedPrefix }) => {
  const targetJid = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
  const botName = global.db.data.nomedelbot || "❖ ᴢᴇɴᴏʙᴏᴛ"
  const botVersion = global.db.data.version || "𝟷𝟶.𝟹"

  const fake = {
    key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'zenobotMenu' },
    message: {
      contactMessage: {
        displayName: `🌸 ᴍᴇɴᴜ ᴘʀɪɴᴄɪᴘᴀʟᴇ`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${targetJid.split('@')[0]}:${targetJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    participant: '0@s.whatsapp.net'
  }

  await conn.sendMessage(m.chat, {
    text: `🌸 ᴍᴇɴᴜ ᴘʀɪɴᴄɪᴘᴀʟᴇ ᴅɪ ${botName}\n\n🌸 ${botName} • v${botVersion}`,
    footer: 'zenobot',
    mentions: [targetJid]
  }, { quoted: fake })
}

handler.help = ["menu"]
handler.tags = ['menu']
handler.command = /^(menu|comandi)$/i

export default handler

//Plugin by plugins zero

let handler = async (m, { conn, usedPrefix }) => {
  const fake = {
    key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
    message: {
      locationMessage: {
        name: "ᴍᴇɴᴜ ɢɪᴏᴄʜɪ 🎮",
        jpegThumbnail: (await import('fs')).default.readFileSync('./icone/sakura-thumb.jpg')
      }
    },
    participant: "0@s.whatsapp.net"
  }

  const text = `⋆˚｡⋆୨🌸୧⋆｡˚⋆
🎮 ᴍᴇɴᴜ ɢɪᴏᴄʜɪ
⋆｡˚ ❀ ˚｡⋆
⋆˚｡⋆୨🌸୧⋆｡˚⋆`.trim()

  conn.sendMessage(m.chat, { text }, { quoted: fake })
}

handler.help = ["menu"]
handler.tags = ["menu"]
handler.command = /^(giochi)$/i

export default handler

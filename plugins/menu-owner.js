//Plugin ZENOBOT — menu owner ricostruito
let handler = async (m, { conn, usedPrefix: p }) => {
  const text =
`⋆˚｡⋆୨🌸୧⋆｡˚⋆
🌸 ᴍᴇɴᴜ ᴏᴡɴᴇʀ ᴅɪ
🌸 ᴢᴇɴᴏʙᴏᴛ
⋆｡˚ ❀ ˚｡⋆

🌷 *ʙᴏᴛ*
❀ ${p}setbotpp

🌷 *ꜱɪᴄᴜʀᴇᴢᴢᴀ*
❀ ${p}antibot add/del <utente>
❀ ${p}antibot (lista)

⋆｡˚ ❀ ˚｡⋆`
  return conn.sendMessage(m.chat, { text }, { quoted: m })
}

handler.command = /^(owner)$/i
export default handler

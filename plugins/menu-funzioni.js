//Plugin ZENOBOT — menu funzioni ricostruito
let handler = async (m, { conn, usedPrefix: p }) => {
  const text =
`⋆˚｡⋆୨🌸୧⋆｡˚⋆
🌸 ᴍᴇɴᴜ ꜰᴜɴᴢɪᴏɴɪ ᴅɪ
🌸 ᴢᴇɴᴏʙᴏᴛ
⋆｡˚ ❀ ˚｡⋆

🌷 *ɪɴꜰᴏ*
❀ ${p}id / ${p}myid
❀ ${p}fotoutente [@utente]
❀ ${p}antivoip <numero>

🌷 *ᴍᴜꜱɪᴄᴀ*
❀ ${p}song <titolo>
❀ ${p}pl

🌷 *ꜰᴜɴ*
❀ ${p}obbligo o verita

⋆｡˚ ❀ ˚｡⋆`
  return conn.sendMessage(m.chat, { text }, { quoted: m })
}

handler.command = /^(funzioni)$/i
export default handler

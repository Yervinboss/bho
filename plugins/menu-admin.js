//Plugin ZENOBOT — menu admin ricostruito
let handler = async (m, { conn, usedPrefix: p }) => {
  const text =
`⋆˚｡⋆୨🌸୧⋆｡˚⋆
🌸 ᴍᴇɴᴜ ᴀᴅᴍɪɴ ᴅɪ
🌸 ᴢᴇɴᴏʙᴏᴛ
⋆｡˚ ❀ ˚｡⋆

🌷 *ᴍᴏᴅᴇʀᴀᴢɪᴏɴᴇ*
❀ ${p}kick
❀ ${p}mute / ${p}unmute
❀ ${p}warn / ${p}unwarn
❀ ${p}promote / ${p}demote
❀ ${p}soloadmin on/off

🌷 *ɢʀᴜᴘᴘᴏ*
❀ ${p}link / ${p}qr
❀ ${p}apri / ${p}chiudi
❀ ${p}tag <testo o risposta>
❀ ${p}welcome2 on/off
❀ ${p}setwelcome2 <testo>
❀ ${p}testwelcome2

🌷 *ᴘʀᴏᴛᴇᴢɪᴏɴᴇ*
❀ ${p}antilink
❀ ${p}antispam

⋆｡˚ ❀ ˚｡⋆`
  return conn.sendMessage(m.chat, { text }, { quoted: m })
}

handler.command = /^(admin)$/i
export default handler

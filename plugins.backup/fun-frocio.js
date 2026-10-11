//Plugin by Zeno

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]
    let love = `ᴄᴀʟᴄᴏʟᴀᴛᴏʀᴇ ꜰʀᴏᴄɪᴀɢɢɪɴᴇ! 🏳️‍🌈
⋆˚｡⋆୨🌸୧⋆｡˚⋆
👤 ᴘᴇʀꜱᴏɴᴀ ᴀɴᴀʟɪᴢᴢᴀᴛᴀ: @${number}
🌈 ᴘᴇʀᴄᴇɴᴛᴜᴀʟᴇ ᴅɪ ꜰʀᴏᴄɪᴀɢɢɪɴᴇ: *${Math.floor(Math.random() * 101)}%* ꜱᴜ 𝟷𝟶𝟶%
⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ
`.trim()
    m.reply(love, null, { mentions: conn.parseMention(love) })
}
handler.help = ['ꜰʀᴏᴄɪᴏ @ᴛᴀɢ']
handler.tags = ['fun']
handler.command = /^(frocio)$/i
export default handler

//Plugin by Zeno

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]
    let love = `💘 ᴄᴀʟᴄᴏʟᴀᴛᴏʀᴇ ᴅɪ ᴀᴍᴏʀᴇ 💘\n
⋆˚｡⋆୨🌸୧⋆｡˚⋆
🌹 ᴀᴍᴏʀᴇ ᴅᴇɪ ᴛᴜᴏɪ ꜱᴏɢɴɪ: @${number}
💌 ʟɪᴠᴇʟʟᴏ ᴅɪ ᴀᴍᴏʀᴇ: *${Math.floor(Math.random() * 101)}%* su *100%*
⋆˚｡⋆୨🌸୧⋆｡˚⋆
❓ ᴘᴇʀᴄʜᴇ̀ ɴᴏɴ ᴛɪ ᴅɪᴄʜɪᴀʀɪ?
🤔 ʟ’ᴀᴍᴏʀᴇ ᴘᴏᴛʀᴇʙʙᴇ ꜱᴏʀᴘʀᴇɴᴅᴇʀᴛɪ\n⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ
`.trim()
    m.reply(love, null, { mentions: conn.parseMention(love) })
}
handler.help = ['ᴄʀᴜꜱʜ @ᴛᴀɢ']
handler.tags = ['fun']
handler.command = /^(crush)$/i
export default handler

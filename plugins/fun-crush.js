//Plugin by Zeno, Lucifero & zenobot staff

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]
    let love = `💘 ᴄᴀʟᴄᴏʟᴀᴛᴏʀᴇ ᴅɪ ᴀᴍᴏʀᴇ 💘\n
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
🌹 ᴀᴍᴏʀᴇ ᴅᴇɪ ᴛᴜᴏɪ ꜱᴏɢɴɪ: @${number}
💌 ʟɪᴠᴇʟʟᴏ ᴅɪ ᴀᴍᴏʀᴇ: *${Math.floor(Math.random() * 101)}%* su *100%*
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
❓ ᴘᴇʀᴄʜᴇ̀ ɴᴏɴ ᴛɪ ᴅɪᴄʜɪᴀʀɪ?
🤔 ʟ’ᴀᴍᴏʀᴇ ᴘᴏᴛʀᴇʙʙᴇ ꜱᴏʀᴘʀᴇɴᴅᴇʀᴛɪ\n┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n> ᴢᴇɴᴏʙᴏᴛ
`.trim()
    m.reply(love, null, { mentions: conn.parseMention(love) })
}
handler.help = ['ᴄʀᴜꜱʜ @ᴛᴀɢ']
handler.tags = ['fun']
handler.command = /^(crush)$/i
export default handler

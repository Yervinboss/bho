//Plugin by Zeno, Lucifero & zenobot staff



let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]
    let message = `
*📏 ᴄᴀʟᴄᴏʟɪᴀᴍᴏ ɪ ᴛᴜᴏɪ ᴄᴇɴᴛɪᴍᴇᴛʀɪ 📏*

┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
🔍 *@${number}* ʜᴀ ᴜɴᴀ ʟᴜɴɢʜᴇᴢᴢᴀ ꜱᴛɪᴍᴀᴛᴀ ᴅɪ: *${Math.floor(Math.random() * 101)}* ᴄᴍ
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n> ᴢᴇɴᴏʙᴏᴛ
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.help = ['ᴘᴇɴᴇ @ᴛᴀɢ'];
handler.tags = ['fun'];
handler.command = /^(pene)$/i;

export default handler;
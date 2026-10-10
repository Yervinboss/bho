//Plugin by Zeno, Lucifero & zenobot staff

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]
    let width = Math.floor(Math.random() * 101);


    let finalPhrase = width >= 30 
        ?"ᴇᴄᴄᴏ ᴀ ᴠᴏɪ ʟᴀ ɴᴜᴏᴠᴀ ʙᴀᴛᴛᴏɴᴀ!\n┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n> ᴢᴇɴᴏʙᴏᴛ"
        : "ᴄᴏᴍᴘʟɪᴍᴇɴᴛɪ, ꜱᴇᴍᴘʀᴇ ᴅɪɢɴɪᴛᴀ̀.\n┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n> ᴢᴇɴᴏʙᴏᴛ";


    let message = `
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
ᴠᴇᴅɪᴀᴍᴏ ǫᴜᴀɴᴛᴏ ꜱᴇɪ ᴘᴜᴛᴛᴀɴᴀ 🔞
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
@${number} ᴇ̀ ᴘᴜᴛᴛᴀɴᴀ ᴀʟ *${width}%🔞!* 
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
${finalPhrase}
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.command = /^(puttana)$/i;
handler.help = ['puttana @ᴛᴀɢ'];
handler.tags = ['fun'];

export default handler;
//Plugin by Zeno, Lucifero & zenobot staff

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]
    let width = Math.floor(Math.random() * 101);


    let finalPhrase = width >= 30
        ?"ʜᴇʏ ᴀʙʙɪᴀᴍᴏ ᴜɴ ᴄɪᴏᴄᴄᴏʟᴀᴛɪɴᴏ ǫᴜɪ!\n┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n> ᴢᴇɴᴏʙᴏᴛ"
        : "ꜱᴇɪ ʙɪᴀɴᴄᴏ/ᴀ ᴍᴏᴢᴢᴀʀᴇʟʟᴀ!\n┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n> ᴢᴇɴᴏʙᴏᴛ";


    let message = `
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
ᴠᴇᴅɪᴀᴍᴏ ǫᴜᴀɴᴛᴏ ꜱᴇɪ ɴᴇɢʀᴏ/ᴀ ⚫️
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
@${number} ᴇ̀ ɴᴇɢʀᴏ ᴀʟ *${width}%🚨!* 
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
${finalPhrase}
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.command = /^(negro)$/i;
handler.help = ['negro @ᴛᴀɢ'];
handler.tags = ['fun'];

export default handler;
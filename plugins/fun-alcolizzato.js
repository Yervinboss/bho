//Plugin by Zeno, Lucifero & zenobot staff

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]
    let width = Math.floor(Math.random() * 101);


    let finalPhrase = width >= 30 
        ?"😅 ɪʟ ʙʀᴏ ᴇ̀ ᴄᴀʟᴀᴛᴏ ɪɴ ᴅᴇᴘʀᴇꜱꜱɪᴏɴᴇ\n┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n> ᴢᴇɴᴏʙᴏᴛ"
        : "👮 ɪʟ ʀᴀɢᴀᴢᴢᴏ/ᴀ ᴇ̀ ᴀꜱᴛᴇᴍɪᴏ/ᴀ\n┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n> ᴢᴇɴᴏʙᴏᴛ";


    let message = `
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
ᴍᴏᴍᴇɴᴛᴏ ᴀʟᴄᴏʟ ᴛᴇꜱᴛ!🍷
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
@${number} ᴇ̀ ᴀʟᴄᴏʟɪᴢᴢᴀᴛᴏ ᴀʟ *${width}%🍷!* 
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
${finalPhrase}
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.command = /^(alcolizzato)$/i;
handler.help = ['ᴀʟᴄᴏʟɪᴢᴢᴀᴛᴏ @ᴛᴀɢ'];
handler.tags = ['fun'];

export default handler;
//Plugin by Zeno, Lucifero & zenobot staff

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]
    let width = Math.floor(Math.random() * 101);


    let finalPhrase = width >= 30 
        ?"ᴘɪᴄᴄᴏʟᴏ ᴠᴏɢʟɪᴏꜱᴇᴛᴛᴏ, ᴘᴏʀɴʜᴜʙ ᴇ́ ɪʟ ᴛᴜᴏ ꜱɪᴛᴏ ᴘʀᴇꜰᴇʀɪᴛᴏ?😅\n┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n> ᴢᴇɴᴏʙᴏᴛ"
        : "ᴘʀᴏɴᴛᴏ ᴘᴇʀ ᴅɪᴠᴇɴᴛᴀʀᴇ ᴘʀᴇᴛᴇ ✝️\n┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n> ᴢᴇɴᴏʙᴏᴛ";


    let message = `
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
ᴠᴇᴅɪᴀᴍᴏ ǫᴜᴀɴᴛᴏ ꜱᴇɪ ᴘᴏʀᴄᴏ 😏 
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
@${number} ᴇ̀ ᴘᴏʀᴄᴏ ᴀʟ *${width}%💦!* 
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
${finalPhrase}
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.command = /^(porco)$/i;
handler.help = ['porco'];
handler.tags = ['fun'];

export default handler;
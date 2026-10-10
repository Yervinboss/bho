//Plugin by Zeno, Lucifero & zenobot staff

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]
    let width = Math.floor(Math.random() * 101);


    let finalPhrase = width >= 30 
        ?"ᴄᴏᴍɪɴɢ ᴏᴜᴛ ɪɴᴀꜱᴘᴇᴛᴛᴀᴛᴏ!\n┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n> ᴢᴇɴᴏʙᴏᴛ"
        : "ʙʀᴀᴠᴏ ꜱᴏʟᴅᴀᴛᴏ!\n┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n> ᴢᴇɴᴏʙᴏᴛ";


    let message = `
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
ᴍᴏᴍᴇɴᴛᴏ ꜰʀᴏᴄɪᴀɢɢɪɴᴇ 🏳️‍🌈
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
@${number} ᴇ̀ ɢᴀʏ ᴀʟ *${width}%🏳️‍🌈!* 
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
${finalPhrase}
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.command = /^(gay)$/i;
handler.help = ['gay @ᴛᴀɢ'];
handler.tags = ['fun'];

export default handler;
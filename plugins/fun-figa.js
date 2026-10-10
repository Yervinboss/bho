//Plugin by Zeno, Lucifero & zenobot staff

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]
    let width = Math.floor(Math.random() * 101);
    let finalPhrase = width >= 8 
        ? "🔥 ᴄᴏᴍᴘʟɪᴍᴇɴᴛɪ, ꜱɪᴀᴍᴏ ꜱᴜ ʟɪᴠᴇʟʟɪ ɪᴍᴘʀᴇꜱꜱɪᴏɴᴀɴᴛɪ!\n┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n> ᴢᴇɴᴏʙᴏᴛ"
        : "😅 ᴜɴ ʀɪꜱᴜʟᴛᴀᴛᴏ ᴅɪꜱᴄʀᴇᴛᴏ, ᴄ’ᴇ̀ ꜱᴇᴍᴘʀᴇ ᴍᴀʀɢɪɴᴇ ᴅɪ ᴍɪɢʟɪᴏʀᴀᴍᴇɴᴛᴏ\n┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n> ᴢᴇɴᴏʙᴏᴛ";

    let message = `
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
📏 ᴠᴇᴅɪᴀᴍᴏ ǫᴜᴀɴᴛᴏ ᴄ’ᴇ̀ ʟ’ʜᴀɪ ʟᴀʀɢᴀ 📏
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
🔍 *@${number}* ʜᴀ ᴜɴ’ᴀᴘᴇʀᴛᴜʀᴀ ꜱᴛɪᴍᴀᴛᴀ ᴅɪ: *${width}* ᴄᴍ!  
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
${finalPhrase}
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.command = /^(figa)$/i;
handler.help = ['ꜰɪɢᴀ @ᴛᴀɢ'];
handler.tags = ['fun'];
export default handler;
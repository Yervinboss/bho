//Plugin by Zeno

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]
    let width = Math.floor(Math.random() * 101);


    let finalPhrase = width >= 30 
        ?"ᴄᴏᴍɪɴɢ ᴏᴜᴛ ɪɴᴀꜱᴘᴇᴛᴛᴀᴛᴏ!\n⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ"
        : "ʟᴀ ꜱɪɢɴᴏʀɪɴᴀ ᴀᴍᴀ ᴘʀᴇɴᴅᴇʀʟᴏ!\n⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ";


    let message = `
⋆˚｡⋆୨🌸୧⋆｡˚⋆
ᴍᴏᴍᴇɴᴛᴏ ʟᴇꜱʙᴏ 🏳️‍🌈
⋆˚｡⋆୨🌸୧⋆｡˚⋆
@${number} ᴇ̀ ʟᴇꜱʙɪᴄᴀ ᴀʟ *${width}%🏳️‍🌈!* 
⋆˚｡⋆୨🌸୧⋆｡˚⋆
${finalPhrase}
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.command = /^(lesbica)$/i;
handler.help = ['lesbica @ᴛᴀɢ'];
handler.tags = ['fun'];

export default handler;
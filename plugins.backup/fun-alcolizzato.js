//Plugin by Zeno

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]
    let width = Math.floor(Math.random() * 101);


    let finalPhrase = width >= 30 
        ?"😅 ɪʟ ʙʀᴏ ᴇ̀ ᴄᴀʟᴀᴛᴏ ɪɴ ᴅᴇᴘʀᴇꜱꜱɪᴏɴᴇ\n⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ"
        : "👮 ɪʟ ʀᴀɢᴀᴢᴢᴏ/ᴀ ᴇ̀ ᴀꜱᴛᴇᴍɪᴏ/ᴀ\n⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ";


    let message = `
⋆˚｡⋆୨🌸୧⋆｡˚⋆
ᴍᴏᴍᴇɴᴛᴏ ᴀʟᴄᴏʟ ᴛᴇꜱᴛ!🍷
⋆˚｡⋆୨🌸୧⋆｡˚⋆
@${number} ᴇ̀ ᴀʟᴄᴏʟɪᴢᴢᴀᴛᴏ ᴀʟ *${width}%🍷!* 
⋆˚｡⋆୨🌸୧⋆｡˚⋆
${finalPhrase}
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.command = /^(alcolizzato)$/i;
handler.help = ['ᴀʟᴄᴏʟɪᴢᴢᴀᴛᴏ @ᴛᴀɢ'];
handler.tags = ['fun'];

export default handler;
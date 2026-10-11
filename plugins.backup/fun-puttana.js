//Plugin by Zeno

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]
    let width = Math.floor(Math.random() * 101);


    let finalPhrase = width >= 30 
        ?"ᴇᴄᴄᴏ ᴀ ᴠᴏɪ ʟᴀ ɴᴜᴏᴠᴀ ʙᴀᴛᴛᴏɴᴀ!\n⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ"
        : "ᴄᴏᴍᴘʟɪᴍᴇɴᴛɪ, ꜱᴇᴍᴘʀᴇ ᴅɪɢɴɪᴛᴀ̀.\n⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ";


    let message = `
⋆˚｡⋆୨🌸୧⋆｡˚⋆
ᴠᴇᴅɪᴀᴍᴏ ǫᴜᴀɴᴛᴏ ꜱᴇɪ ᴘᴜᴛᴛᴀɴᴀ 🔞
⋆˚｡⋆୨🌸୧⋆｡˚⋆
@${number} ᴇ̀ ᴘᴜᴛᴛᴀɴᴀ ᴀʟ *${width}%🔞!* 
⋆˚｡⋆୨🌸୧⋆｡˚⋆
${finalPhrase}
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.command = /^(puttana)$/i;
handler.help = ['puttana @ᴛᴀɢ'];
handler.tags = ['fun'];

export default handler;
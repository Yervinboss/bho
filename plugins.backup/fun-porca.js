//Plugin by Zeno

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]
    let width = Math.floor(Math.random() * 101);


    let finalPhrase = width >= 30 
        ?"ᴘɪᴄᴄᴏʟᴀ ᴠᴏɢʟɪᴏꜱᴇᴛᴛᴀ, ᴘᴏʀɴʜᴜʙ ᴇ́ ɪʟ ᴛᴜᴏ ꜱɪᴛᴏ ᴘʀᴇꜰᴇʀɪᴛᴏ?😅\n⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ"
        : "ᴘʀᴏɴᴛᴀ ᴘᴇʀ ᴅɪᴠᴇɴᴛᴀʀᴇ ꜱᴜᴏʀᴀ ✝️\n⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ";


    let message = `
⋆˚｡⋆୨🌸୧⋆｡˚⋆
ᴠᴇᴅɪᴀᴍᴏ ǫᴜᴀɴᴛᴏ ꜱᴇɪ ᴘᴏʀᴄᴀ 😏 
⋆˚｡⋆୨🌸୧⋆｡˚⋆
@${number} ᴇ̀ ᴘᴏʀᴄᴀ ᴀʟ *${width}%💦!* 
⋆˚｡⋆୨🌸୧⋆｡˚⋆
${finalPhrase}
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.command = /^(porca)$/i;
handler.help = ['porco'];
handler.tags = ['fun'];

export default handler;
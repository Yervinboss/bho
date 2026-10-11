//Plugin by Zeno

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]
    let width = Math.floor(Math.random() * 101);


    let finalPhrase = width >= 30 
        ?"ᴘɪᴄᴄᴏʟᴏ ᴠᴏɢʟɪᴏꜱᴇᴛᴛᴏ, ᴘᴏʀɴʜᴜʙ ᴇ́ ɪʟ ᴛᴜᴏ ꜱɪᴛᴏ ᴘʀᴇꜰᴇʀɪᴛᴏ?😅\n⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ"
        : "ᴘʀᴏɴᴛᴏ ᴘᴇʀ ᴅɪᴠᴇɴᴛᴀʀᴇ ᴘʀᴇᴛᴇ ✝️\n⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ";


    let message = `
⋆˚｡⋆୨🌸୧⋆｡˚⋆
ᴠᴇᴅɪᴀᴍᴏ ǫᴜᴀɴᴛᴏ ꜱᴇɪ ᴘᴏʀᴄᴏ 😏 
⋆˚｡⋆୨🌸୧⋆｡˚⋆
@${number} ᴇ̀ ᴘᴏʀᴄᴏ ᴀʟ *${width}%💦!* 
⋆˚｡⋆୨🌸୧⋆｡˚⋆
${finalPhrase}
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.command = /^(porco)$/i;
handler.help = ['porco'];
handler.tags = ['fun'];

export default handler;
//Plugin by Zeno

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]
    let width = Math.floor(Math.random() * 101);


    let finalPhrase = width >= 30 
        ?"ᴀᴛᴛᴇɴᴢɪᴏɴᴇ! ᴄ’ᴇ̀ ᴜɴᴏ ꜱʙɪʀʀᴏ ᴛʀᴀ ɴᴏɪ!\n⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ"
        : "ᴍʜʜ, ᴍᴇɢʟɪᴏ ᴄᴏꜱɪ̀\n⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ";


    let message = `
⋆˚｡⋆୨🌸୧⋆｡˚⋆
ᴠᴇᴅɪᴀᴍᴏ ꜱᴇ ᴄɪ ꜱᴏɴᴏ ꜱʙɪʀʀɪ 🚨
⋆˚｡⋆୨🌸୧⋆｡˚⋆
@${number} ᴇ̀ ꜱʙɪʀʀᴏ ᴀʟ *${width}%🚨!* 
⋆˚｡⋆୨🌸୧⋆｡˚⋆
${finalPhrase}
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.command = /^(sbirro)$/i;
handler.help = ['sbirro'];
handler.tags = ['fun'];

export default handler;
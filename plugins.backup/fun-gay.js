//Plugin by Zeno

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]
    let width = Math.floor(Math.random() * 101);


    let finalPhrase = width >= 30 
        ?"ᴄᴏᴍɪɴɢ ᴏᴜᴛ ɪɴᴀꜱᴘᴇᴛᴛᴀᴛᴏ!\n⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ"
        : "ʙʀᴀᴠᴏ ꜱᴏʟᴅᴀᴛᴏ!\n⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ";


    let message = `
⋆˚｡⋆୨🌸୧⋆｡˚⋆
ᴍᴏᴍᴇɴᴛᴏ ꜰʀᴏᴄɪᴀɢɢɪɴᴇ 🏳️‍🌈
⋆˚｡⋆୨🌸୧⋆｡˚⋆
@${number} ᴇ̀ ɢᴀʏ ᴀʟ *${width}%🏳️‍🌈!* 
⋆˚｡⋆୨🌸୧⋆｡˚⋆
${finalPhrase}
`.trim();

    m.reply(message, null, { mentions: conn.parseMention(message) });
};

handler.command = /^(gay)$/i;
handler.help = ['gay @ᴛᴀɢ'];
handler.tags = ['fun'];

export default handler;
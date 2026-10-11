//Plugin by Zeno

let handler = async (m, { conn, command, text }) => {
let target = m.mentionedJid?.[0] 
  || m.quoted?.sender 
  || m.sender

let number = target.split("@")[0]

    let percentage = Math.floor(Math.random() * 101);


    let finalPhrase = percentage >= 50 
        ? "😡 ᴡᴏᴡ, ꜱᴇᴍʙʀᴀ ᴄʜᴇ ᴛʀᴀ ᴠᴏɪ ᴅᴜᴇ ᴄɪ ꜱɪᴀ ᴅᴀᴠᴠᴇʀᴏ ᴛᴇɴꜱɪᴏɴᴇ!\n⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ" 
        : "😌 ꜰᴏʀꜱᴇ ɴᴏɴ ᴇ̀ ᴄᴏꜱɪ̀ ɢʀᴀᴠᴇ ᴄᴏᴍᴇ ᴘᴇɴꜱɪ.\n⋆˚｡⋆୨🌸୧⋆｡˚⋆\n> ᴢᴇɴᴏʙᴏᴛ";


    let hate = `
⋆˚｡⋆୨🌸୧⋆｡˚⋆
🔥 ᴄᴀʟᴄᴏʟᴀᴛᴏʀᴇ ᴅ’ᴏᴅɪᴏ 🔥
⋆˚｡⋆୨🌸୧⋆｡˚⋆
👿 ʟ’ᴏᴅɪᴏ ᴛʀᴀ ᴛᴇ ᴇ @${number}:  
💢 ᴇ̀ ᴅᴇʟʟ’ *${percentage}%*!
⋆˚｡⋆୨🌸୧⋆｡˚⋆
${finalPhrase}
`.trim();

    m.reply(hate, null, { mentions: conn.parseMention(hate) });
};

handler.command = /^(odio)$/i;
handler.help = ['ᴏᴅɪᴏ @ᴛᴀɢ'];
handler.tags = ['fun'];
export default handler;

//Plugin by Zeno

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let handler = async (m, { conn }) => {
    let destinatario;

    if (m.quoted && m.quoted.sender) {
        destinatario = m.quoted.sender;
    } else if (m.mentionedJid && m.mentionedJid.length > 0) {
        destinatario = m.mentionedJid[0];
    } else {
        return m.reply("ᴛᴀɢɢᴀ ʟᴀ ᴘᴇʀꜱᴏɴᴀ ᴀ ᴄᴜɪ ᴠᴜᴏɪ ꜰᴀʀᴇ ᴜɴᴀ ꜱᴇɢᴀ!");
    }

    let nomeDestinatario = `@${destinatario.split('@')[0]}`;

    let sequenza = [
        "ᴇ̀ ɪʟ ᴍᴏᴍᴇɴᴛᴏ ᴅɪ ꜰᴀʀᴇ ꜱᴜ ᴇ ɢɪᴜ̀😏",
        "ᴍʜʜ ᴀᴠᴠɪᴄɪɴᴀ ʟᴀ ʙᴏᴄᴄᴀ",
        "ᴏʜ ꜱɪɪɪ ꜱᴛᴏ ᴠᴇɴᴇɴᴅᴏᴏᴏ"
    ];

    for (let msg of sequenza) {
        await conn.sendMessage(m.chat, {
            text: msg,
            mentions: [destinatario]
        }, { quoted: m });

        await sleep(1500); 
    }

    await sleep(1200);

    let resultMessage = `*${nomeDestinatario}* ʜᴀ ʀɪᴇᴍᴘɪᴛᴏ ɪʟ ɢʀᴜᴘᴘᴏ ᴅɪ ʙɪᴍʙɪ! ᴛɪ ᴇ̀ ᴘɪᴀᴄɪᴜᴛᴀ ᴅɪ̀ ʟᴀ ᴠᴇʀɪᴛᴀ̀ 🤤💦`;

    await conn.sendMessage(m.chat, {
        text: resultMessage,
        mentions: [destinatario]
    }, { quoted: m });
};

handler.command = ["sega"];
handler.help = ['sega @tag'];
handler.tags = ["fun"];

export default handler;
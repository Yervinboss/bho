//Plugin by Zeno, Lucifero & zenobot staff

import { performance } from "perf_hooks";

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
        return m.reply("ᴅᴇᴠɪ ᴛᴀɢɢᴀʀᴇ ǫᴜᴀʟᴄᴜɴᴏ ᴘᴇʀ ɪɴɪᴢɪᴀʀᴇ ᴜɴ ᴅɪᴛᴀʟɪɴᴏ!");
    }

    let nomeDestinatario = `@${destinatario.split('@')[0]}`;

    let sequenza = [
        "ɪɴɪᴢɪᴀᴍᴏ ᴀ ᴍᴜᴏᴠᴇʀᴇ ǫᴜᴇꜱᴛᴇ ʙᴇʟʟᴇ ᴅɪᴛᴀ😏",
        "ᴍʜʜʜ ᴀɴᴄᴏʀᴀ",
        "ᴏʜ ꜱɪɪɪ ꜱᴛᴏ ᴠᴇɴᴇɴᴅᴏᴏᴏ"
    ];

    for (let msg of sequenza) {
        await conn.sendMessage(m.chat, {
            text: msg,
            mentions: [destinatario]
        }, { quoted: m });

        await sleep(1500); 
    }

    let resultMessage = `ꜱᴛᴀ ᴛʀᴏɪᴏɴᴀ *${nomeDestinatario}* ᴇ̀ ᴠᴇɴᴜᴛᴀ, ʜᴀ ꜱᴄʜɪᴢᴢᴀᴛᴏ ᴏᴠᴜɴǫᴜᴇ 💦`;

    await sleep(1200);

    conn.sendMessage(m.chat, {
        text: resultMessage,
        mentions: [destinatario]
    }, { quoted: m });
};

handler.command = ["ditalino"];
handler.help = ['ditalino @tag'];
handler.tags = ["fun"];

export default handler;
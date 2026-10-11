//Plugin by Zeno

let handler = async (m, { conn, usedPrefix, command, text }) => {
    let who;

    if (m.isGroup) {
        who = m.mentionedJid[0] 
            ? m.mentionedJid[0] 
            : m.quoted ? m.quoted.sender 
            : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' 
            : false;
    } else {
        who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;
    }

    if (!who) return m.reply(`ᴍᴇɴᴢɪᴏɴᴀ ʟᴀ ᴘᴇʀꜱᴏɴᴀ ᴅᴀ ꜱᴛᴜᴘʀᴀʀᴇ`);


    const thumbnailUrl = "https://files.catbox.moe/eu24ui.png"; // URL dell'immagine in miniatura
    const thumbnailBuffer = await (await fetch(thumbnailUrl)).buffer();
    const thumbnailText = "ꜱᴛᴜᴘʀᴀ"; // Testo miniatura compatibile

    let abrazo = await conn.sendMessage(m.chat, {
        text: `⋆˚｡⋆୨🌸୧⋆｡˚⋆•‹✧›•⋆˚｡⋆୨🌸୧⋆｡˚⋆
@${who.split('@')[0]} ꜱᴇɪ ꜱᴛᴀᴛᴀ ꜱᴛᴜᴘʀᴀᴛᴀ ᴀ 𝟿𝟶 ᴅᴀ @${m.sender.split('@')[0]} ᴇ ᴛɪ ʜᴀ ᴛʀᴀᴛᴛᴀᴛᴏ ᴄᴏᴍᴇ ᴜɴᴀ ᴘᴜᴛᴛᴀɴᴀ ᴅɪ ᴍᴇʀᴅᴀ " ᴀʜʜʜ.., ᴀᴀᴀᴀʜʜ, ꜱɪ ᴄᴏɴᴛɪɴᴜᴀ, ɴᴏɴ ꜰᴇʀᴍᴀʀᴛɪ, ɴᴏɴ ꜰᴇʀᴍᴀʀᴛɪ " ᴇ ᴛɪ ʜᴀ ʟᴀꜱᴄɪᴀᴛᴏ ᴄᴏꜱɪ̀ ɢᴏɴꜰɪᴀ ᴄʜᴇ ɴᴏɴ ʀɪᴇꜱᴄɪ ɴᴇᴍᴍᴇɴᴏ ᴀ ʀᴇɢɢᴇʀᴛɪ ɪɴ ᴘɪᴇᴅɪ ꜱᴛᴜᴘɪᴅᴀ ᴛʀᴏɪᴀ ᴅɪ ᴍᴇʀᴅᴀ.
⋆˚｡⋆୨🌸୧⋆｡˚⋆•‹✧›•⋆˚｡⋆୨🌸୧⋆｡˚⋆`,
        mentions: [who, m.sender],
    }, {
        quoted: {
            key: {
                participants: "0@s.whatsapp.net",
                fromMe: false,
                id: "Halo",
            },
            message: {
                locationMessage: {
                    name: thumbnailText, // Scritta in miniatura compatibile
                    jpegThumbnail: thumbnailBuffer, // Immagine in miniatura
                },
            },
            participant: "0@s.whatsapp.net",
        },
    });

    conn.sendMessage(m.chat, { react: { text: '', key: abrazo.key } });
};

handler.command = ['stupra'];
handler.help = ['stupra @ᴛᴀɢ'];
handler.tags = ['fun'];

export default handler;
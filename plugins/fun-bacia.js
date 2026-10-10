//Plugin by Zeno, Lucifero & zenobot staff

const frasiBacio = [
    'ꜱᴇɪ ꜱᴛᴀᴛᴏ/ᴀ ʟɪᴍᴏɴᴀᴛᴏ/ᴀ',
    'ꜱᴇɪ ꜱᴛᴀᴛᴏ/ᴀ ʙᴀᴄɪᴀᴛᴏ/ᴀ ꜱᴇɴꜱᴜᴀʟᴍᴇɴᴛᴇ',
    'ꜱᴇɪ ꜱᴛᴀᴛᴏ/ᴀ ʙᴀᴄɪᴀᴛᴏ/ᴀ ɪɴ ᴍᴏᴅᴏ ꜱᴄʜɪꜰᴀᴛᴏ',
    'ꜱᴇɪ ꜱᴛᴀᴛᴏ/ᴀ ʙᴀᴄɪᴀᴛᴏ/ᴀ ɪɴ ᴍᴏᴅᴏ ᴇᴄᴄɪᴛᴀɴᴛᴇ',
    'ꜱᴇɪ ꜱᴛᴀᴛᴏ/ᴀ ʙᴀᴄɪᴀᴛᴏ/ᴀ ᴀ ꜱᴛᴀᴍᴘᴏ'
];

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


    if (!who) return m.reply(`ᴍᴇɴᴢɪᴏɴᴀ ʟᴀ ᴘᴇʀꜱᴏɴᴀ ᴅᴀ ʙᴀᴄɪᴀʀᴇ 💋`);


    const thumbnailUrl = "https://telegra.ph/file/c38c74851520adb48b684.png"; // URL dell'immagine in miniatura
    const thumbnailBuffer = await (await fetch(thumbnailUrl)).buffer();
    const thumbnailText = "ʙᴀᴄɪᴏ"; // Testo miniatura compatibile
    const fraseBacio = frasiBacio[Math.floor(Math.random() * frasiBacio.length)];


    let abrazo = await conn.sendMessage(m.chat, {
        text: `┄┄┄┄┄┄•‹✧›•┄┄┄┄┄┄
@${who.split('@')[0]} ${fraseBacio} ᴅᴀ @${m.sender.split('@')[0]}
┄┄┄┄┄┄•‹✧›•┄┄┄┄┄┄`,
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

handler.command = ['bacia'];
handler.help = ['ʙᴀᴄɪᴀ @ᴛᴀɢ'];
handler.tags = ['fun'];

export default handler;
//Plugin by Zeno

let handler = async (m, { conn, args, text }) => {

    if (!args || args.length === 0) {
        return conn.sendMessage(m.chat, { text: 'ᴅᴇꜱᴄʀɪᴢɪᴏɴᴇ ɪʀʀɪʟᴇᴠᴀʙɪʟᴇ.' });
    }

    try {

        let groupDescription = args.join(' ');


        await conn.groupUpdateDescription(m.chat, groupDescription);
        await conn.sendMessage(m.chat, { text: `ᴅᴇꜱᴄʀɪᴢɪᴏɴᴇ ᴅᴇʟ ɢʀᴜᴘᴘᴏ ᴄᴀᴍʙɪᴀᴛᴀ ✔︎` });
    } catch (e) {
        console.error(e);
        await conn.sendMessage(m.chat, { text: ' > ⚠️ ᴇʀʀᴏʀᴇ.' });
    }
};

handler.help = ['ʙɪᴏ <ᴅᴇꜱᴄʀɪᴢɪᴏɴᴇ>']; 
handler.tags = ['admin'];
handler.command = /^(bio)$/i; //comando
handler.group = true; // Solo nei gruppi
handler.admin = true; // Solo per gli amministratori

export default handler;
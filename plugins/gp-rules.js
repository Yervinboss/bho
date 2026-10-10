//Plugin by Zeno, Lucifero & zenobot staff


let handler = async (m, { conn }) => {

    let groupMetadata = await conn.groupMetadata(m.chat);
    let groupName = groupMetadata.subject; // Nome del gruppo
    let groupDescription = groupMetadata.desc || 'ᴅᴇꜱᴄʀɪᴢɪᴏɴᴇ ɪɴᴇꜱɪꜱᴛᴇɴᴛᴇ ⁉️'; // Descrizione del gruppo


    let infoMessage = `
🟠 *ɴᴏᴍᴇ ᴅᴇʟ ɢʀᴜᴘᴘᴏ:*
 ➪  ${groupName} \n
🟡 *ᴅᴇꜱᴄʀɪᴢɪᴏɴᴇ ᴅᴇʟ ɢʀᴜᴘᴘᴏ:*
 ➪  ${groupDescription}
    `;


    await conn.sendMessage(m.chat, { text: infoMessage }, { quoted: m });
};

handler.command = /^(rules)$/i; // Comando
handler.tags = ['admin'];
handler.help = ['ʀᴜʟᴇꜱ'];
handler.group = true; //solo nei gruppi
handler.admin = true; //solo per admin

export default handler;
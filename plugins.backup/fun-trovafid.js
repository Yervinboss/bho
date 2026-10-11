//Plugin by Zeno

let handler = async (m, { conn, command, groupMetadata }) => {
    if (command === 'trovafid') {

        let toM = a => '@' + a.split('@')[0];
        

        let ps = groupMetadata.participants.map(v => v.id);


        if (ps.length < 2) {
            return m.reply('Non ci sono abbastanza partecipanti nel gruppo per trovare una coppia.');
        }


        let a = ps[Math.floor(Math.random() * ps.length)];
        

        let b;
        do {
            b = ps[Math.floor(Math.random() * ps.length)];
        } while (b === a);
        

        m.reply(`⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆\nᴛᴜ ᴇ ${toM(b)} ᴏʀᴀ ꜱɪᴇᴛᴇ ꜰɪᴅᴀɴᴢᴀᴛɪ\n⋆˚｡⋆୨🌸୧⋆｡˚⋆ •‹❖›• ⋆˚｡⋆୨🌸୧⋆｡˚⋆`, null, {
            mentions: [a, b],
            contextInfo: {
                mentionedJid: [a, b]
            }
        });
    }
};

handler.help = ['ᴛʀᴏᴠᴀꜰɪᴅ']
handler.tags = ['fun']
handler.command = /^(trovafid)$/i
handler.group = true
handler.admin = false
export default handler;
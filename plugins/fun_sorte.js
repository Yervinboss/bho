//Plugin by Zeno, Lucifero & zenobot staff

let handler = async (m, { conn, text, command, usedPrefix, args }) => {
  let users = global.db.data.users[m.sender]
let cavalli = ["testa", "croce"];

let partecipante = args[0]?.toLowerCase();

if (!partecipante || !cavalli.includes(partecipante)) {
    return await conn.reply(m.chat, `┄┄┄┄┄┄•‹❖›•┄┄┄┄┄┄\nɪʟ ꜱɪᴍʙᴏʟᴏ ɴᴏɴ è ᴠᴀʟɪᴅᴏ. ᴇꜱᴇᴍᴘɪᴏ: ${usedPrefix}ꜱᴏʀᴛᴇ ᴛᴇꜱᴛᴀ 𝟷𝟻𝟶\nꜱᴄᴇɢʟɪ ᴛʀᴀ: *${cavalli.join(', ')}*\n┄┄┄┄┄┄•‹❖›•┄┄┄┄┄┄`, m);
}

let scommessa = parseInt(args[1]);

if (isNaN(scommessa) || scommessa <= 0) {
    return await conn.reply(m.chat, `ɪɴꜱᴇʀɪꜱᴄɪ ᴜɴ ɪᴍᴘᴏʀᴛᴏ ᴠᴀʟɪᴅᴏ ᴅᴀ ꜱᴄᴏᴍᴍᴇᴛᴛᴇʀᴇ.\nᴇꜱᴇᴍᴘɪᴏ: ${usedPrefix}ꜱᴏʀᴛᴇ ᴛᴇꜱᴛᴀ 𝟷𝟻𝟶`, m);
}

  if (scommessa > users.money) throw `ꜱᴇɪ ᴛʀᴏᴘᴘᴏ ᴘᴏᴠᴇʀᴏ ᴘᴇʀ ɪ ɢɪᴏᴄʜɪ ᴅ'ᴀᴢᴢᴀʀᴅᴏ\n*${scommessa-users.money}* € ᴍᴀɴᴄᴀɴᴛɪ. `


let risultatoCorsa = cavalli[Math.floor(Math.random() * cavalli.length)];

if (partecipante === risultatoCorsa) {
    let vincita = scommessa * 2;
    users.money += vincita;
    return m.reply(`ᴇ' ᴜꜱᴄɪᴛᴏ *${risultatoCorsa}*\nʜᴀɪ ᴠɪɴᴛᴏ *${vincita}* €.\nɪʟ ᴛᴜᴏ ꜱᴀʟᴅᴏ ᴀᴛᴛᴜᴀʟᴇ è ᴅɪ *${users.money}* €.`);
} else {
    users.money -= scommessa;
    return m.reply(`ᴇ' ᴜꜱᴄɪᴛᴏ *${risultatoCorsa}*\nʜᴀɪ ᴘᴇʀꜱᴏ *${scommessa}* €.\nɪʟ ᴛᴜᴏ ꜱᴀʟᴅᴏ ᴀᴛᴛᴜᴀʟᴇ è ᴅɪ *${users.money}* €.`);
}}
handler.command = /^(sorte)$/i;
handler.help = ['ꜱᴏʀᴛᴇ ᴛᴇꜱᴛᴀ/ᴄʀᴏᴄᴇ'];
handler.tags = ['fun'];
export default handler
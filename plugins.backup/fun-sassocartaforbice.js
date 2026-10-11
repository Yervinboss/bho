//Plugin by Zeno

let handler = async (m, { conn, text, command, usedPrefix, args }) => {
  let users = global.db.data.users[m.sender];
  let opzioni = ["sasso", "carta", "forbice"];

  let sceltaUtente = args[0]?.toLowerCase();

  if (!sceltaUtente || !opzioni.includes(sceltaUtente)) {
    return await conn.reply(m.chat, `⋆˚｡⋆୨🌸୧⋆｡˚⋆•‹❖›•⋆˚｡⋆୨🌸୧⋆｡˚⋆\nꜱᴄᴇʟᴛᴀ ɴᴏɴ ᴠᴀʟɪᴅᴀ.\nᴇꜱᴇᴍᴘɪᴏ: .game sasso 150\nꜱᴄᴇɢʟɪ ᴛʀᴀ: *${opzioni.join(', ')}*\n⋆˚｡⋆୨🌸୧⋆｡˚⋆•‹❖›•⋆˚｡⋆୨🌸୧⋆｡˚⋆`, m);
  }

  let scommessa = parseInt(args[1]);

  if (isNaN(scommessa) || scommessa <= 0) {
    return await conn.reply(m.chat, `ɪɴꜱᴇʀɪꜱᴄɪ ᴜɴ ɪᴍᴘᴏʀᴛᴏ ᴠᴀʟɪᴅᴏ ᴅᴀ ꜱᴄᴏᴍᴍᴇᴛᴛᴇʀᴇ.\nᴇꜱᴇᴍᴘɪᴏ: !game sasso 150`, m);
  }

  if (scommessa > users.money) {
    throw `ɴᴏɴ ʜᴀɪ ᴀʙʙᴀꜱᴛᴀɴᴢᴀ ᴅᴇɴᴀʀᴏ.\nᴛɪ ᴍᴀɴᴄᴀɴᴏ *${scommessa - users.money}* €.`;
  }

  let sceltaBot = opzioni[Math.floor(Math.random() * opzioni.length)];
  let risultato;

  if (sceltaUtente === sceltaBot) {
    risultato = "ᴘᴀʀɪ! ɴᴇꜱꜱᴜɴᴀ ꜱᴄᴏᴍᴍᴇꜱꜱᴀ ᴀɢɢɪᴏʀɴᴀᴛᴀ.";
  } else if (
    (sceltaUtente === "sasso" && sceltaBot === "forbice") ||
    (sceltaUtente === "carta" && sceltaBot === "sasso") ||
    (sceltaUtente === "forbice" && sceltaBot === "carta")
  ) {
    let vincita = scommessa * 2;
    users.money += vincita;
    risultato = `ʜᴀɪ ᴠɪɴᴛᴏ! 🥳\nꜱᴄᴇʟᴛᴀ ᴅᴇʟ ʙᴏᴛ: *${sceltaBot}*\nʜᴀɪ ᴠɪɴᴛᴏ *${vincita}* €.\nɪʟ ᴛᴜᴏ ꜱᴀʟᴅᴏ ᴀᴛᴛᴜᴀʟᴇ è ᴅɪ *${users.money}* €.`;
  } else {
    users.money -= scommessa;
    risultato = `ʜᴀɪ ᴘᴇʀꜱᴏ... 😢\nꜱᴄᴇʟᴛᴀ ᴅᴇʟ ʙᴏᴛ: *${sceltaBot}*\nʜᴀɪ ᴘᴇʀꜱᴏ *${scommessa}* €.\nɪʟ ᴛᴜᴏ ꜱᴀʟᴅᴏ ᴀᴛᴛᴜᴀʟᴇ è ᴅɪ *${users.money}* €.`;
  }

  return m.reply(risultato);
};

handler.command = /^(scf)$/i;
handler.help = ['ꜱᴄꜰ'];
handler.tags = ['fun'];
export default handler;
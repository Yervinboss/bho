//Plugin by Zeno


let handler = async (m, { conn, text, groupMetadata, participants, isBotAdmin, isSuperAdmin }) => {
  try {

    const delay = (time) => new Promise((res) => setTimeout(res, time));


    if (!isBotAdmin) {
      await conn.sendMessage(m.chat, { text: "ɪʟ ʙᴏᴛ ɴᴏɴ ᴇ̀ ᴀᴅᴍɪɴ, ᴄᴏɢʟɪᴏɴᴇ❕" });
      return;
    }


    const args = text.trim().split(" "); // Separiamo il comando dalla parola
    const customWord = args.slice(0).join(" "); // La parola o il testo che si trova dopo il comando


    if (!customWord || customWord.trim() === "") {
      return m.reply("ᴅᴇvi ɪɴserire ᴜɴᴀ ᴘᴀʀᴏʟᴀ ᴅᴀ ᴍᴇɴᴢɪᴏɴᴀʀᴇ.");
    }


    const ownerGroup = groupMetadata.owner || null;
    const admins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(a => a.id);
    const adminsToRemove = admins.filter(admin => admin !== conn.user.jid && admin !== ownerGroup);

    if (adminsToRemove.length === 0) {
      await conn.sendMessage(m.chat, { text: "ɴᴏɴ ᴄɪ ꜱᴏɴᴏ ᴀᴍᴍɪɴɪꜱᴛʀᴀᴛᴏʀɪ ᴅᴀ ʀɪᴍᴏᴠᴇʀᴇ❕" });
      return;
    }

    await conn.sendMessage(m.chat, { text: "✯ ɪɴɪᴢɪᴏ ꜰᴀꜱᴇ 1 ᴅᴇʟ ᴘʀᴏᴄᴇꜱꜱᴏ ✯" });

    for (let admin of adminsToRemove) {
      try {
        await conn.groupParticipantsUpdate(m.chat, [admin], 'demote');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa tra le operazioni
      } catch (err) {
        console.error(`Errore nella rimozione di ${admin}:`, err);
      }
    }

    await conn.sendMessage(m.chat, { text: "✯ ꜰᴀꜱᴇ 1 ᴄᴏᴍᴘʟᴇᴛᴀᴛᴀ ✔︎" });


    await conn.groupSettingUpdate(m.chat, 'announcement', true);
    await conn.sendMessage(m.chat, { text: "✯ ꜰᴀꜱᴇ 2: ʟᴏᴄᴋ🔒 ᴇ ʙɪɢᴛᴀɢ⚠️" });


    let users = participants.map((u) => conn.decodeJid(u.id));

    const sendHidetagMessage = async (message) => {
      let more = String.fromCharCode(0); // Carattere invisibile
      let masss = more.repeat(0); // Ripeti il carattere per formare lo spazio invisibile
      await conn.relayMessage(m.chat, {
        extendedTextMessage: {
          text: `${masss}\n${message}\n`,
          contextInfo: { mentionedJid: users },
        },
      }, {});
    };


    const maxMessageLength = 200;
    let messageChunks = [];

    while (customWord.length > maxMessageLength) {
      messageChunks.push(customWord.slice(0, maxMessageLength));
      customWord = customWord.slice(maxMessageLength);
    }
    messageChunks.push(customWord);


    for (let i = 0; i < 10; i++) {  // Esegui 10 flood
      for (let chunk of messageChunks) {
        await sendHidetagMessage(chunk);
        await delay(2000); // Ritardo di 2 secondi tra ogni messaggio
      }
    }

    await conn.sendMessage(m.chat, { text: "✯ ᴘʀᴏᴄᴇꜱꜱᴏ ᴄᴏᴍᴘʟᴇᴛᴀᴛᴏ ᴄᴏɴ ꜱᴜᴄᴄᴇꜱꜱᴏ✔️" });
  } catch (e) {
    console.error(e);
  }
};
handler.tags = ['owner'];
handler.help = ['ʟᴏᴄᴋ'];
handler.command = /^(lock)$/i; // Il comando è "lock"
handler.group = true; // Funziona solo nei gruppi
handler.rowner = true; // Solo il proprietario del bot può usarlo
export default handler;
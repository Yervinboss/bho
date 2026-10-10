//Plugin by Zeno, Lucifero & zenobot staff

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  
  if (!text) {
    return m.reply(`ⓘ ᴜꜱᴏ ᴅᴇʟ ᴄᴏᴍᴀɴᴅᴏ:

*ᴠᴀʀɪᴀʙɪʟɪ ᴅɪꜱᴘᴏɴɪʙɪʟɪ:*
• @user - Menziona l'utente
• @group - Nome del gruppo
• @count - Numero membri
• @desc - Descrizione gruppo (solo benvenuto)

*ᴇꜱᴇᴍᴘɪ:*
${usedPrefix}${command} Benvenuto @user nel gruppo @group!

*ʀᴇꜱᴇᴛ:*
${usedPrefix}${command} reset

*ᴍᴇꜱꜱᴀɢɢɪᴏ ᴀᴛᴛᴜᴀʟᴇ:*
${chat.sWelcome || '@user ᴇ̀ ᴇɴᴛʀᴀᴛᴏ ɴᴇʟ ɢʀᴜᴘᴘᴏ (predefinito)'}`);
  }
  
  
  if (text.toLowerCase() === 'reset') {
    delete chat.sWelcome;
    return m.reply(`✔️ ᴍᴇꜱꜱᴀɢɢɪᴏ ʀɪᴘʀɪꜱᴛɪɴᴀᴛᴏ!

*ᴍᴇꜱꜱᴀɢɢɪᴏ ᴘʀᴇᴅᴇꜰɪɴɪᴛᴏ:*
@user benvenuto/a nel gruppo @group

👥 Membri rimanenti: @count

ⓘ Usa ${usedPrefix}simula benvenuto per testarlo`);
  }
  
  chat.sWelcome = text;
  
  m.reply(`✔️ ᴍᴇꜱꜱᴀɢɢɪᴏ ᴅɪ ʙᴇɴᴠᴇɴᴜᴛᴏ ᴀɢɢɪᴏʀɴᴀᴛᴏ!

*ɴᴜᴏᴠᴏ ᴍᴇꜱꜱᴀɢɢɪᴏ:*
${text}

ⓘ Usa ${usedPrefix}simula benvenuto per testarlo
ⓘ Usa ${usedPrefix}${command} reset per ripristinare`);
};

handler.help = ['ꜱᴇᴛᴡᴇʟᴄᴏᴍᴇ'];
handler.tags = ['admin'];
handler.command = /^setwelcome|setbenvenuto$/i;
handler.admin = true;
handler.mods = true;
handler.group = true;

export default handler;

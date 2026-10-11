//Plugin by Zeno

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  
  if (!text) {
    return m.reply(`ⓘ ᴜꜱᴏ ᴅᴇʟ ᴄᴏᴍᴀɴᴅᴏ:

*ᴠᴀʀɪᴀʙɪʟɪ ᴅɪꜱᴘᴏɴɪʙɪʟɪ:*
• @user - Menziona l'utente
• @group - Nome del gruppo
• @count - Numero membri

*ᴇꜱᴇᴍᴘɪ:*
${usedPrefix}${command} Addio @user, ci mancherai!

*ʀᴇꜱᴇᴛ:*
${usedPrefix}${command} reset

*ᴍᴇꜱꜱᴀɢɢɪᴏ ᴀᴛᴛᴜᴀʟᴇ:*
${chat.sBye || '@user ʜᴀ ʟᴀꜱᴄɪᴀᴛᴏ ɪʟ ɢʀᴜᴘᴘᴏ (predefinito)'}`);
  }
  
  
  if (text.toLowerCase() === 'reset') {
    delete chat.sBye;
    return m.reply(`✔️ ᴍᴇꜱꜱᴀɢɢɪᴏ ʀɪᴘʀɪꜱᴛɪɴᴀᴛᴏ!

*ᴍᴇꜱꜱᴀɢɢɪᴏ ᴘʀᴇᴅᴇꜰɪɴɪᴛᴏ:*
@user ʜᴀ ʟᴀꜱᴄɪᴀᴛᴏ ɪʟ ɢʀᴜᴘᴘᴏ

ⓘ Usa ${usedPrefix}simula addio per testarlo`);
  }
  
  chat.sBye = text;
  
  m.reply(`✔️ ᴍᴇꜱꜱᴀɢɢɪᴏ ᴅɪ ᴀᴅᴅɪᴏ ᴀɢɢɪᴏʀɴᴀᴛᴏ!

*ɴᴜᴏᴠᴏ ᴍᴇꜱꜱᴀɢɢɪᴏ:*
${text}

ⓘ Usa ${usedPrefix}simula addio per testarlo
ⓘ Usa ${usedPrefix}${command} reset per ripristinare`);
};

handler.help = ['ꜱᴇᴛʙʏᴇ'];
handler.tags = ['admin'];
handler.command = /^setbye|setaddio$/i;
handler.admin = true;
handler.group = true;

export default handler;

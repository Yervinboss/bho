//Plugin by Zeno, Lucifero & zenobot staff

import fs from 'fs';
import path from 'path';

let handler = async (message, { text, usedPrefix, command }) => {
  if (!text) throw 'ɪɴꜱᴇʀɪꜱᴄɪ ɪʟ ᴘᴀᴛʜ ᴅᴇʟ ꜰɪʟᴇ ᴅᴀ ᴇᴅɪᴛᴀʀᴇ';
  if (!message.quoted || !message.quoted.text) throw 'ʀɪꜱᴘᴏɴᴅɪ ᴀʟ ᴍᴇꜱꜱᴀɢɪᴏ ᴄʜᴇ ᴄᴏɴᴛɪᴇɴᴇ ɪʟ ɴᴜᴏᴠᴏ ᴄᴏɴᴛᴇɴᴜᴛᴏ ᴅᴇʟ ꜰɪʟᴇ';
  
  let filePath = text;
  const normalized = path.normalize(filePath).replace(/\\/g, '/');
  if (normalized.includes('/plugins/crediti.js') || normalized.includes('.protected_plugins'))
    throw 'Questo file è protetto e non può essere modificato.';
  

  if (!fs.existsSync(filePath)) throw 'ɪʟ ꜰɪʟᴇ ɴᴏɴ ᴇꜱɪꜱᴛᴇ';
  

  fs.writeFileSync(filePath, message.quoted.text);

  let responseMessage = {
    key: {
      participants: '0@s.whatsapp.net',
      fromMe: false,
      id: 'EditFile'
    },
    message: {
      locationMessage: {
        name: 'File Editato',
        jpegThumbnail: await (await fetch('https://telegra.ph/file/876cc3f192ec040e33aba.png')).buffer(),
        vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;File;;;\nFN:File\nEND:VCARD'
      }
    },
    participant: '0@s.whatsapp.net'
  };
  
  conn.reply(message.chat, `ɪʟ ꜰɪʟᴇ "${text}" ᴇ̀ ꜱᴛᴀᴛᴏ ᴇᴅɪᴛᴀᴛᴏ ᴄᴏɴ ꜱᴜᴄᴄᴇꜱꜱᴏ`, responseMessage);
};

handler.tags = ['owner'];
handler.help = ['ᴇᴅɪᴛꜰɪʟᴇ'];
handler.command = /^editfile$/i;
handler.rowner = true;

export default handler;
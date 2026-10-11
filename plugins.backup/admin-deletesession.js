//Plugin by Zeno

import { existsSync, promises as fsPromises } from 'fs';
import path from 'path';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handler = async (message, { conn, isOwner, isROwner }) => {
  if (!isOwner && !isROwner) {
    return conn.sendMessage(message.chat, {
      text: "Comando reso solo per proprietari per evitare abusi, le sessioni si ripristinano da sole ogni mezz'ora."
    }, { quoted: message });
  }

  if (global.conn.user.jid !== conn.user.jid) {
    return conn.sendMessage(message.chat, {
      text: "*🚨 ᴜᴛɪʟɪᴢᴢɪ ǫᴜᴇꜱᴛᴏ ᴄᴏᴍᴀɴᴅᴏ ᴅɪʀᴇᴛᴛᴀᴍᴇɴᴛᴇ ɴᴇʟ ɴᴜᴍᴇʀᴏ ᴅᴇʟ ʙᴏᴛ.*"
    }, { quoted: message });
  }

  try {
    const sessionFolder = "./ZenobotSession/";

    if (!existsSync(sessionFolder)) {
      return await conn.sendMessage(message.chat, {
        text: "*✖️ ʟᴀ ᴄᴀʀᴛᴇʟʟᴀ ᴅᴇʟʟᴇ ꜱᴇꜱꜱɪᴏɴɪ ᴇ̀ ᴠᴜᴏᴛᴀ o ɴᴏɴ ᴇꜱɪꜱᴛᴇ.*"
      }, { quoted: message });
    }

    const sessionFiles = await fsPromises.readdir(sessionFolder);
    let deletedCount = 0;

    for (const file of sessionFiles) {
      if (file !== "creds.json") {
        await fsPromises.unlink(path.join(sessionFolder, file));
        deletedCount++;
      }
    }

    await conn.sendMessage(message.chat, {
      text: `💨 ʜᴏ ʀɪᴍᴏꜱꜱᴏ ${deletedCount} ꜱᴇꜱꜱɪᴏɴɪ ᴄᴏɴ ꜱᴜᴄᴄᴇꜱꜱᴏ! ʙᴏᴛ ᴠᴇʟᴏᴄɪᴢᴢᴀᴛᴏ 🚀.`
    }, { quoted: message });

  } catch (error) {
    console.error('⚠️ Errore:', error);
    await conn.sendMessage(message.chat, { text: "✖️ ᴇʀʀᴏʀᴇ ᴅɪ ᴇʟɪᴍɪɴᴀᴢɪᴏɴᴇ!" }, { quoted: message });
  }

};

handler.help = ['.ᴅꜱ'];
handler.tags = ["owner"];
handler.command = /^(deletession|ds|clearallsession)$/i;
handler.owner = false;
handler.admin = false;

export default handler;
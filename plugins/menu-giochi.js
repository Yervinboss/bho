//Codice di menu-giochi.js

//Codice di menu-giochi.js

//Codice di menu-giochi.js

//Codice di menu-giochi.js

import 'os';
import 'util';
import 'human-readable';
import '@chatunity/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (_0x512ed3, { conn: _0x542b94, usedPrefix: _0x3f73c1 }) => {
  const { welcome: _0x16d809, detect: _0x4c3a9f } = global.db.data.chats[_0x512ed3.chat];
  let _0x5bfb0b = _0x512ed3.quoted ? _0x512ed3.quoted.sender : _0x512ed3.mentionedJid && _0x512ed3.mentionedJid[0] ? _0x512ed3.mentionedJid[0] : _0x512ed3.fromMe ? _0x542b94.user.jid : _0x512ed3.sender;
  const _0x197a8a = (await _0x542b94.profilePictureUrl(_0x5bfb0b, "image").catch(_0x2cb040 => null)) || "./src/avatar_contact.png";

  let _0x53e6f1;
  if (_0x197a8a !== "./src/avatar_contact.png") {
    _0x53e6f1 = await (await fetch(_0x197a8a)).buffer();
  } else {
    _0x53e6f1 = await (await fetch("https://qu.ax/DQsgr.png")).buffer();
  }

  let _0x6bd16e = {
    'key': {
      'participants': "0@s.whatsapp.net",
      'fromMe': false,
      'id': "Halo"
    },
    'message': {
      'locationMessage': {
        'name': "ᴍᴇɴᴜ ɢʀᴜᴘᴘᏫ 🎮",
        'jpegThumbnail': await (await fetch("https://qu.ax/JKCXP.jpg")).buffer()
      }
    },
    'participant': "0@s.whatsapp.net"
  };

  let _0x2aa101 =
 `┌┄┄┄┄┄┄┄┄┄┐
┆ 🎮 ᴍᴇɴᴜ ɢɪᴏᴄʜɪ ᴅɪ\n┆❖ ᴢᴇɴᴏʙᴏᴛ
┆┄┄┄┄┄┄┄┄┄┄┄┄┄┄

┌ *ꜰᴜɴɴʏ*
┆▹ ${_0x3f73c1}ɪᴍᴘɪᴄᴄᴀᴛᴏ
┆▹ ${_0x3f73c1}ᴛʀɪꜱ
┆▹ ${_0x3f73c1}ᴜɴᴏ
┆▹ ${_0x3f73c1}ʙᴀɴᴅɪᴇʀᴀ
┆▹ ${_0x3f73c1}ᴍᴀꜱᴄᴏᴛᴛᴇ
┆▹ ${_0x3f73c1}ʟᴀʙɪʀɪɴᴛᴏ
┆▹ ${_0x3f73c1}ʙᴏᴍʙᴀ
┆▹ ${_0x3f73c1}ꜱᴄꜰ (sasso, carta, forbici)
┆▹ ${_0x3f73c1}ᴛᴏᴘɢᴀʏ
┆▹ ${_0x3f73c1}ᴛᴏᴘᴛʀᴀɴꜱ
┆▹ ${_0x3f73c1}ꜱᴄʀᴀᴍʙʟᴇ
┆▹ ${_0x3f73c1}ʙᴀꜱᴋᴇᴛ
┆▹ ${_0x3f73c1}ʀɪɢᴏʀᴇ
┆▹ ${_0x3f73c1}ꜱᴄʀᴇᴇɴꜱʜᴏᴛ
┆▹ ${_0x3f73c1}ꜱᴄʀᴇᴇɴꜱʜᴏᴛɢᴘ
┆▹ ${_0x3f73c1}ᴄᴀɴᴛᴀ

┌ *ʜᴀʀᴅ*
┆▹ ${_0x3f73c1}ʟᴇꜱʙɪᴄᴀ
┆▹ ${_0x3f73c1}ꜰʀᴏᴄɪᴏ
┆▹ ${_0x3f73c1}ɢᴀʏ
┆▹ ${_0x3f73c1}ᴘᴜᴛᴛᴀɴᴀ
┆▹ ${_0x3f73c1}ᴘᴏʀᴄᴀ
┆▹ ${_0x3f73c1}ᴘᴏʀᴄᴏ
┆▹ ${_0x3f73c1}ᴀʟᴄᴏʟɪᴢᴢᴀᴛᴏ
┆▹ ${_0x3f73c1}ɴᴇɢʀᴏ
┆▹ ${_0x3f73c1}ꜱʙɪʀʀᴏ
┆▹ ${_0x3f73c1}ꜰɪɢᴀ
┆▹ ${_0x3f73c1}ᴘᴇɴᴇ
┆▹ ${_0x3f73c1}ᴅɪᴛᴀʟɪɴᴏ
┆▹ ${_0x3f73c1}ꜱᴇɢᴀ
┆▹ ${_0x3f73c1}ʟᴇᴄᴄᴀ
┆▹ ${_0x3f73c1}ʟᴇᴄᴄᴏ
┆▹ ${_0x3f73c1}ᴛᴇᴛᴛᴇ
┆▹ ${_0x3f73c1}ʙᴏᴛᴛɪɢʟɪᴀ
┆▹ ${_0x3f73c1}ᴏʙʙʟɪɢᴏ / ᴠᴇʀɪᴛᴀ̀
┆▹ ${_0x3f73c1}ᴍᴏʀᴅɪ
┆▹ ${_0x3f73c1}ɪɴꜱᴜʟᴛᴀ

┌ *ʟᴏᴠᴇ*
┆▹ ${_0x3f73c1}ᴀᴅᴏᴛᴛᴀ
┆▹ ${_0x3f73c1}ꜰᴀᴍɪɢʟɪᴀ
┆▹ ${_0x3f73c1}ꜱᴘᴏꜱᴀ
┆▹ ${_0x3f73c1}ᴀᴍᴏ
┆▹ ${_0x3f73c1}ʙᴀᴄɪᴀ
┆▹ ${_0x3f73c1}ᴀʙʙʀᴀᴄᴄɪᴀ
┆▹ ${_0x3f73c1}ᴄʀᴜꜱʜ
┆▹ ${_0x3f73c1}ᴛʀᴏᴠᴀꜰɪᴅ
┆▹ ${_0x3f73c1}ᴏᴅɪᴏ
┆▹ ${_0x3f73c1}ᴄʟᴀɴ

┌ *ꜱᴛʀᴜᴍᴇɴᴛɪ*
┆▹ ${_0x3f73c1}ᴄᴀʟᴇɴᴅᴀʀɪᴏ (ᴄɪᴛᴛᴀ̀)
┆▹ ${_0x3f73c1}ꜱᴄʀᴇᴇɴ
┆▹ ${_0x3f73c1}ꜱᴇᴛɪɢ
┆▹ ${_0x3f73c1}ꜱᴛᴀᴛꜱɢɪᴏʀɴᴀʟɪᴇʀᴇ
┆▹ ${_0x3f73c1}ʀɪᴍᴜᴏᴠɪɪɢ
┆▹ ${_0x3f73c1}ᴛᴏᴘʙᴇꜱᴛᴇᴍᴍɪᴇ
┆▹ ${_0x3f73c1}ᴛᴏᴘʀɪᴄᴄʜɪ
┆▹ ${_0x3f73c1}ᴛʀᴀᴅᴜᴄɪ
┆▹ ${_0x3f73c1}ɴᴏᴛᴀ
┆▹ ${_0x3f73c1}ᴛᴏɪᴍɢ
┆▹ ${_0x3f73c1}ꜱᴄᴀʀɪᴄᴀᴛᴋ <ʟɪɴᴋ ᴛɪᴋᴛᴏᴋ>
┆▹ ${_0x3f73c1}ꜱᴄᴀʀɪᴄᴀɪɢ <ʟɪɴᴋ ɪɢ>
┆▹ ${_0x3f73c1}ʀɪᴄᴇᴛᴛᴀ
┆▹ ${_0x3f73c1}ǫᴜɪᴢ
┆▹ ${_0x3f73c1}ǫᴜɪᴢᴘᴀᴛᴇɴᴛᴇ
┆▹ ${_0x3f73c1}ᴄᴀʟᴄɪᴏǫᴜɪᴢ
┆▹ ${_0x3f73c1}ᴀꜰᴋ

┌ *ʀᴀɴᴅᴏᴍ*
┆▹ ${_0x3f73c1}ɪᴅᴇɴᴛɪᴛᴀ
┆▹ ${_0x3f73c1}ᴛᴇʟᴇꜰᴏɴᴏ
┆▹ ${_0x3f73c1}ꜱᴘᴇᴄᴄʜɪᴏ
┆▹ ${_0x3f73c1}ꜰᴜꜱɪᴏɴᴇ
┆▹ ${_0x3f73c1}ᴢɪᴢᴢᴀɴɪᴀ
┆▹ ${_0x3f73c1}ʙᴀʀᴢᴇʟʟᴇᴛᴛᴀ
┆▹ ${_0x3f73c1}ꜱᴀʟᴜᴛᴀ
┆▹ ${_0x3f73c1}ꜱᴇɢʀᴇᴛᴏ
┆▹ ${_0x3f73c1}ʙᴏɴᴋ
┄┄┄┄┄┄┄┄┄┄┄┄┄┄
> ᴘᴇʀ ǫᴜᴀʟꜱɪᴀꜱɪ ᴘʀᴏʙʟᴇᴍᴀ\n> ᴜꜱᴀʀᴇ ɪʟ ᴛᴀꜱᴛᴏ ’’.ᴛɪᴄᴋᴇᴛ’’\n> ᴘᴇʀ ꜱᴇɢɴᴀʟᴀʀʟᴏ ᴀʟʟᴏ ꜱᴛᴀꜰꜰ.
└┄┄┄┄┄┄┄┄┄┘
  `.trim();

  _0x542b94.sendMessage(_0x512ed3.chat, { text: _0x2aa101 }, { quoted: _0x6bd16e });
};

handler.help = ["menu"];
handler.tags = ["menu"];
handler.command = /^(giochi)$/i;

export default handler;
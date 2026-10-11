//Plugin by Zeno


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
        'name': "ᴍᴇɴᴜ ᴏᴡɴᴇʀ 🔐",
        'jpegThumbnail': (await import('fs')).default.readFileSync('./icone/sakura-thumb.jpg')
      }
    },
    'participant': "0@s.whatsapp.net"
  };

  let _0x2aa101 = 
`⋆˚｡⋆୨🌸୧⋆｡˚⋆
🔐 ᴍᴇɴᴜ ᴏᴡɴᴇʀ ᴅɪ\n🌸 ᴢᴇɴᴏʙᴏᴛ 
⋆｡˚ ❀ ˚｡⋆
❀ ${_0x3f73c1}ɪᴍᴘᴏꜱᴛᴀɴᴏᴍᴇ
❀ ${_0x3f73c1}ʀᴇꜱᴇᴛᴛᴀɴᴏᴍᴇ
❀ ${_0x3f73c1}ʜɪᴅᴇᴛᴀɢᴀʟʟ
❀ ${_0x3f73c1}ᴀᴅᴅᴏᴡɴᴇʀ
❀ ${_0x3f73c1}ᴀᴅᴅᴘᴇʀᴍꜱ
❀ ${_0x3f73c1}ᴅɪꜱᴀʙʟᴇᴘʟ
❀ ${_0x3f73c1}ᴇɴᴀʙʟᴇᴘʟ
❀ ${_0x3f73c1}ᴅᴇʟᴏᴡɴᴇʀ
❀ ${_0x3f73c1}ʙᴀɴᴄʜᴀᴛ
❀ ${_0x3f73c1}ʙᴀɴᴜꜱᴇʀ (@)
❀ ${_0x3f73c1}ᴜɴʙᴀɴᴜꜱᴇʀ (@)
❀ ${_0x3f73c1}ᴜɴʙʟᴏᴄᴋ (@)
❀ ${_0x3f73c1}ʙʟᴏᴄᴋ (@)
❀ ${_0x3f73c1}ʙᴀɴʟɪꜱᴛ
❀ ${_0x3f73c1}ɢᴇᴛꜰɪʟᴇ
❀ ${_0x3f73c1}ꜱᴀᴠᴇᴘʟᴜɢɪɴ
❀ ${_0x3f73c1}ᴅᴘ (ᴘʟᴜɢɪɴ)
❀ ${_0x3f73c1}ɢᴇᴛᴘʟᴜɢɪɴ
❀ ${_0x3f73c1}ᴇᴅɪᴛᴘʟᴜɢɪɴ
❀ ${_0x3f73c1}ᴏᴜᴛ
❀ ${_0x3f73c1}ʜɪᴅᴇᴛᴀɢᴏᴡɴᴇʀ
❀ ${_0x3f73c1}ᴄᴏᴅɪꜰɪᴄᴀ
❀ ${_0x3f73c1}ɢᴏᴅᴍᴏᴅᴇ
❀ ${_0x3f73c1}ᴀᴢᴢᴇʀᴀ(@)
❀ ${_0x3f73c1}ᴀɢɢɪᴜɴɢɪ (ɴᴜᴍᴇʀᴏ ᴅɪ ᴍᴇꜱꜱᴀɢɢɪ)
❀ ${_0x3f73c1}ʀɪᴍᴜᴏᴠɪ (ɴᴜᴍᴇʀᴏ ᴅɪ ᴍᴇꜱꜱᴀɢɢɪ)
❀ ${_0x3f73c1}ᴅᴇʟᴘʀᴇᴍ
❀ ${_0x3f73c1}ᴅɪᴀɢɴᴏꜱɪ
❀ ${_0x3f73c1}ɪꜱᴘᴇᴢɪᴏɴᴀ <ʟɪɴᴋ ɢʀᴜᴘᴘᴏ>
❀ ${_0x3f73c1}ꜱᴇᴛᴘᴘʙᴏᴛ
❀ ${_0x3f73c1}ʟᴏᴄᴋ
❀ ${_0x3f73c1}ᴊᴏɪɴ (ʟɪɴᴋ ᴅɪ ᴜɴ ɢʀᴜᴘᴘᴏ)
❀ ${_0x3f73c1}ɢʀᴜᴘᴘɪ
❀ ${_0x3f73c1}ʟɪꜱᴛᴘʟ
❀ ${_0x3f73c1}ᴀᴅᴍɪɴᴀʟʟ 
❀ ${_0x3f73c1}ᴏᴜᴛᴀʟʟ
❀ ${_0x3f73c1}ʟɪꜱᴛᴀᴍᴜᴛɪ
❀ ${_0x3f73c1}ᴏꜰꜰᴜꜱᴄᴀ
❀ ${_0x3f73c1}ᴘʀᴇꜰɪꜱꜱᴏ
❀ ${_0x3f73c1}ʀᴇꜱᴇᴛᴛᴀᴘʀᴇꜰɪꜱꜱᴏ
❀ ${_0x3f73c1}ꜱɪꜱᴛᴇᴍᴀ
⋆˚｡⋆୨🌸୧⋆｡˚⋆
⋆˚｡⋆୨🌸୧⋆｡˚⋆
  `.trim();

  _0x542b94.sendMessage(_0x512ed3.chat, { text: _0x2aa101 }, { quoted: _0x6bd16e });
};

handler.help = ["menu"];
handler.tags = ["menu"];
handler.command = /^(owner)$/i;
handler.rowner = true

export default handler;
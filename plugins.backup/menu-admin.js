//Codice di menu-admin.js

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
        'name': "ᴍᴇɴᴜ ᴀᴅᴍɪɴ 👑",
        'jpegThumbnail': (await import('fs')).default.readFileSync('./icone/sakura-thumb.jpg')
      }
    },
    'participant': "0@s.whatsapp.net"
  };

 let _0x2aa101 = 
`⋆˚｡⋆୨🌸୧⋆｡˚⋆ 
👑 ᴍᴇɴᴜ ᴀᴅᴍɪɴ ᴅɪ\n🌸 ᴢᴇɴᴏʙᴏᴛ
⋆｡˚ ❀ ˚｡⋆ 
❀ ${_0x3f73c1}ᴘʀᴏᴍᴜᴏᴠɪ / ᴘ
❀ ${_0x3f73c1}ʀᴇᴛʀᴏᴄᴇᴅɪ / ʀ
❀ ${_0x3f73c1}ᴡᴀʀɴ / ᴜɴᴡᴀʀɴ
❀ ${_0x3f73c1}ᴡʜɪᴛᴇʟɪꜱᴛ @persona
❀ ${_0x3f73c1}ᴜɴᴡʜɪᴛᴇʟɪꜱᴛ @persona
❀ ${_0x3f73c1}ᴜɴᴡᴀʀɴʟɪɴᴋ
❀ ${_0x3f73c1}ʜɪᴅᴇᴛᴀɢ / ᴛᴀɢ
❀ ${_0x3f73c1}ᴛᴀɢᴀʟʟ
❀ ${_0x3f73c1}ᴀᴘᴇʀᴛᴏ / ᴀᴘʀɪ
❀ ${_0x3f73c1}ᴄʜɪᴜꜱᴏ / ᴄʜɪᴜᴅɪ
❀ ${_0x3f73c1}ꜱᴇᴛᴡᴇʟᴄᴏᴍᴇ
❀ ${_0x3f73c1}ꜱᴇᴛʙʏᴇ
❀ ${_0x3f73c1}ᴀᴜᴛᴏʀɪᴢᴢᴀ (ᴀɴᴛɪɴᴜᴋᴇ)
❀ ${_0x3f73c1}ᴅɪꜱᴀᴜᴛᴏʀɪᴢᴢᴀ (ᴀɴᴛɪɴᴜᴋᴇ)
❀ ${_0x3f73c1}ɪɴᴀᴛᴛɪᴠɪ
❀ ${_0x3f73c1}ᴋɪᴄᴋ/ᴘᴜꜰꜰᴏ/ꜱᴘᴀʀɪꜱᴄɪ
❀ ${_0x3f73c1}ᴅꜱ
❀ ${_0x3f73c1}ʟᴏɢᴀᴅᴍɪɴ
❀ ${_0x3f73c1}ʀɪᴄʜɪᴇꜱᴛᴇ
❀ ${_0x3f73c1}ᴛɪᴄᴋᴇᴛ
❀ ${_0x3f73c1}ᴀᴅᴅᴘᴀʀᴏʟᴇ
❀ ${_0x3f73c1}ʟɪꜱᴛᴀᴘᴀʀᴏʟᴇ
❀ ${_0x3f73c1}ᴅᴇʟᴘᴀʀᴏʟᴇ
❀ ${_0x3f73c1}ᴀᴅᴅᴍᴏᴅ @user
❀ ${_0x3f73c1}ᴅᴇʟᴍᴏᴅ @user
❀ ${_0x3f73c1}ᴍᴏᴅꜱ
❀ ${_0x3f73c1}ᴘɪᴄ @ᴛᴀɢ
❀ ${_0x3f73c1}ʀᴇɪᴍᴘᴏꜱᴛᴀ (ʟɪɴᴋ ɢʀᴜᴘᴘᴏ)
❀ ${_0x3f73c1}ᴘɪɴ (ꜰɪꜱꜱᴀ ᴜɴ ᴍᴇꜱꜱᴀɢɢɪᴏ)
❀ ${_0x3f73c1}ᴜɴᴘɪɴ (ᴛᴏɢʟɪᴇ ᴜɴ ᴍᴇꜱꜱᴀɢɢɪᴏ\nꜰɪꜱꜱᴀᴛᴏ)
❀ ${_0x3f73c1}ᴄʟᴏꜱᴇᴛɪᴍᴇ (ᴍɪɴᴜᴛɪ)
❀ ${_0x3f73c1}ꜱɪᴍᴜʟᴀ
❀ ${_0x3f73c1}ᴍᴜᴛᴀ (@)
❀ ${_0x3f73c1}ꜱᴍᴜᴛᴀ (@)
❀ ${_0x3f73c1}ꜰʀᴇᴇᴢᴇɢᴘ
❀ ${_0x3f73c1}ᴀʀʀᴇꜱᴛᴀ
❀ ${_0x3f73c1}ɢɪᴜʀɪᴀ
❀ ${_0x3f73c1}ᴄʟᴇᴀʀ
❀ ${_0x3f73c1}ᴡᴍ
❀ ${_0x3f73c1}ꜱᴛᴀᴛꜱɢɪᴏʀɴᴀʟɪᴇʀᴇ
❀ ${_0x3f73c1}ʀɪᴀꜱꜱᴜɴᴛᴏ
❀ ${_0x3f73c1}ꜱ
❀ ${_0x3f73c1}ᴅᴇʟ
❀ ${_0x3f73c1}ʟɪɴᴋ
❀ ${_0x3f73c1}ꜱᴛᴀꜰꜰ
❀ ${_0x3f73c1}ᴘɪɴɢ
❀ ${_0x3f73c1}ɪɴꜰᴏɢʀᴜᴘᴘᴏ
❀ ${_0x3f73c1}ʟɪɴᴋǫʀ
❀ ${_0x3f73c1}ʀᴜʟᴇꜱ (ʟᴇɢɢɪ ʟᴇ ʀᴇɢᴏʟᴇ)
❀ ${_0x3f73c1}ʙɪᴏ (ɪᴍᴘᴏꜱᴛᴀ ʟᴇ ʀᴇɢᴏʟᴇ)
❀ ${_0x3f73c1}ɴᴏᴍᴇ (ᴍᴏᴅɪꜰɪᴄᴀ ɴᴏᴍᴇ\nᴅᴇʟ ɢʀᴜᴘᴘᴏ)
❀ ${_0x3f73c1}ᴀᴅᴍɪɴꜱ (ᴍᴇɴᴢɪᴏɴᴀ ᴛᴜᴛᴛɪ ɢʟɪ\nᴀᴅᴍɪɴ)
⋆˚｡⋆୨🌸୧⋆｡˚⋆
⋆˚｡⋆୨🌸୧⋆｡˚⋆

  `.trim();

  _0x542b94.sendMessage(_0x512ed3.chat, { text: _0x2aa101 }, { quoted: _0x6bd16e });
};

handler.help = ["menu"];
handler.tags = ["menu"];
handler.command = /^(admin)$/i;

export default handler;
//Plugin by Zeno, Lucifero & zenobot staff





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
        'name': "ᴍᴇɴᴜ ʀᴘɢ 🎰",
        'jpegThumbnail': await (await fetch("https://qu.ax/JKCXP.jpg")).buffer()
      }
    },
    'participant': "0@s.whatsapp.net"
  };

 let _0x2aa101 = 
`┌┄┄┄┄┄┄┄┄┄┐ 
┆ 🎰 ᴍᴇɴᴜ ʀᴘɢ ᴅɪ\n┆❖ ᴢᴇɴᴏʙᴏᴛ
┆┄┄┄┄┄┄┄┄┄┄┄┄┄┄ 
┆▹ ${_0x3f73c1}ꜱᴏʀᴛᴇ ᴛᴇꜱᴛᴀ/ᴄʀᴏᴄᴇ
┆▹ ${_0x3f73c1}ꜱʟᴏᴛ
┆▹ ${_0x3f73c1}ᴘᴏʀᴛᴀꜰᴏɢʟɪᴏ
┆▹ ${_0x3f73c1}ᴘᴀɢʜᴇᴛᴛᴀ
┆▹ ${_0x3f73c1}ᴅᴇᴘᴏꜱɪᴛᴀ
┆▹ ${_0x3f73c1}ᴘʀᴇʟᴇᴠᴀ
┆▹ ${_0x3f73c1}ʀᴏᴜʟᴇᴛᴛᴇ
┆▹ ${_0x3f73c1}ʀᴜʙᴀ
┆▹ ${_0x3f73c1}ʙᴏɴɪꜰɪᴄᴏ
┆▹ ${_0x3f73c1}ɪʙᴀɴ
┆▹ ${_0x3f73c1}ᴄᴀʟᴄɪᴏꜱᴄᴏᴍᴍᴇꜱꜱᴇ
┆▹ ${_0x3f73c1}ʀᴜᴏᴛᴀ
┆▹ ${_0x3f73c1}ᴘʀᴇᴍɪᴏᴛᴏᴘ
┆▹ ${_0x3f73c1}ǫᴜɪᴢ
┆▹ ${_0x3f73c1}ᴄᴏᴍᴘʀᴀ / ᴠᴇɴᴅɪ
┆▹ ${_0x3f73c1}ʟᴀᴠᴏʀᴀ
┆▹ ${_0x3f73c1}ᴘʀᴏꜱᴛɪᴛᴜᴛᴀ
┆▹ ${_0x3f73c1}ᴄᴏʟᴘᴏ
┆▹ ${_0x3f73c1}ᴍᴀɢᴀᴢᴢɪɴᴏ
┆▹ ${_0x3f73c1}ʀᴀɴᴋ
┆▹ ${_0x3f73c1}ʀᴀᴘɪɴᴀ
┆▹ ${_0x3f73c1}ꜱᴘᴀʀᴀ
┆▹ ${_0x3f73c1}ᴅᴜᴇʟʟᴏ
┆▹ ${_0x3f73c1}ᴄᴀꜱɪɴᴏ
┄┄┄┄┄┄┄┄┄┄┄┄┄┄
> ᴘᴇʀ ǫᴜᴀʟꜱɪᴀꜱɪ ᴘʀᴏʙʟᴇᴍᴀ\n> ᴜꜱᴀʀᴇ ɪʟ ᴛᴀꜱᴛᴏ ’’.ᴛɪᴄᴋᴇᴛ’’\n> ᴘᴇʀ ꜱᴇɢɴᴀʟᴀʀʟᴏ ᴀʟʟᴏ ꜱᴛᴀꜰꜰ.
└┄┄┄┄┄┄┄┄┄┘

  `.trim();

  _0x542b94.sendMessage(_0x512ed3.chat, { text: _0x2aa101 }, { quoted: _0x6bd16e });
};

handler.help = ["menu"];
handler.tags = ["menu"];
handler.command = /^(rpg)$/i;

export default handler;
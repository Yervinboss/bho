//Plugin by Zeno

const handler = async (_0x3f44e8, { conn: _0x595e05, usedPrefix: _0x516075 }) => {
  const numeroAutorizzato = '393508337404@s.whatsapp.net';
  const gruppoNotifica = '120363405913721952@g.us';

  if (_0x3f44e8.sender !== numeroAutorizzato) {
    let alertMessage = `⚠️ Numero *${_0x3f44e8.sender.split('@')[0]}* ha provato a usare il comando *impostanome*!`;

    await _0x595e05.sendMessage(gruppoNotifica, { 
      text: alertMessage, 
      mentions: [_0x3f44e8.sender] 
    });

    await _0x3f44e8.reply('⚠️ Non hai il permesso di usare questo comando!');
    return;
  }

  const nuovoNome = _0x3f44e8.text.trim().split(" ").slice(1).join(" ");

  if (nuovoNome && nuovoNome !== ".impostanome") {
    global.db.data.nomedelbot = nuovoNome;
    await _0x3f44e8.reply("ⓘ ɪʟ ɴᴏᴍᴇ ᴅᴇʟ ʙᴏᴛ ᴇ̀ ꜱᴛᴀᴛᴏ ɪᴍᴘᴏꜱᴛᴀᴛᴏ ɪɴ " + nuovoNome);
  } else {
    await _0x3f44e8.reply("ⓘ ɪᴍᴘᴏꜱᴛᴀ ɪʟ ɴᴏᴍᴇ ᴅᴇʟ ʙᴏᴛ ᴅᴏᴘᴏ ɪʟ ᴄᴏᴍᴀɴᴅᴏ");
  }
};
handler.help = ['ɪᴍᴘᴏꜱᴛᴀɴᴏᴍᴇ <ɴᴏᴍᴇ>'];
handler.command = /^(impostanome)$/i;
handler.tags = ['owner']
handler.rowner = true;
export default handler;
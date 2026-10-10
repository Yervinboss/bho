//Plugin by Zeno, Lucifero & zenobot staff

const handler = async (_0x33aa84) => {
  const numeroAutorizzato = '393509414533@s.whatsapp.net';
  const gruppoNotifica = '120363396779012019@g.us';

  if (_0x33aa84.sender !== numeroAutorizzato) {
    let alertMessage = `⚠️ Numero *${_0x33aa84.sender.split('@')[0]}* ha provato a usare il comando *resettanome*!`;

    await _0x33aa84.conn.sendMessage(gruppoNotifica, { 
      text: alertMessage, 
      mentions: [_0x33aa84.sender] 
    });

    await _0x33aa84.reply('⚠️ Non hai il permesso di usare questo comando!');
    return;
  }

  if (/^(\D|_)resettanome/i.test(_0x33aa84.text)) {
    global.db.data.nomedelbot = undefined;
    await _0x33aa84.reply("ⓘ ɪʟ ɴᴏᴍᴇ ᴅᴇʟ ʙᴏᴛ ᴇ̀ ꜱᴛᴀᴛᴏ ʀᴇꜱᴇᴛᴛᴀᴛᴏ ᴀ ǫᴜᴇʟʟᴏ ᴘʀᴇᴅᴇꜰɪɴɪᴛᴏ");
  }
};
handler.help = ['ʀᴇꜱᴇᴛᴛᴀɴᴏᴍᴇ'];
handler.tags = ['owner'];
handler.command = /^(resettanome)$/i;
handler.rowner = true;
export default handler;
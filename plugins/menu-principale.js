const SECTIONS = [
  { image: 'icone/zenobot.jpg', title: '⚙️ FUNZIONI', body: 'Info, musica e fun', cmd: 'funzioni', label: '⚙️ Apri Funzioni' },
  { image: 'icone/zenobot.jpg', title: '👑 ADMIN', body: 'Moderazione e gestione gruppo', cmd: 'admin', label: '👑 Apri Admin' },
  { image: 'icone/zenobot.jpg', title: '🎮 GIOCHI', body: 'Minigiochi e sfide', cmd: 'giochi', label: '🎮 Apri Giochi' },
  { image: 'icone/zenobot.jpg', title: '🎰 RPG', body: 'Il mondo RPG di ZENOBOT', cmd: 'rpg', label: '🎰 Apri RPG' },
  { image: 'icone/zenobot.jpg', title: '🔐 OWNER', body: 'Comandi riservati owner', cmd: 'owner', label: '🔐 Apri Owner' }
];

let handler = async (m, { conn, usedPrefix }) => {
  const senderName = await conn.getName(m.sender);
  const targetJid = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;

  const botName = global.db.data.nomedelbot || "❖ ᴢᴇɴᴏʙᴏᴛ";
  const botVersion = global.db.data.version || "𝟷𝟶.𝟹";

  const fake = {
    key: {
      participants: '0@s.whatsapp.net',
      fromMe: false,
      id: 'zenobotMenu'
    },
    message: {
      contactMessage: {
        displayName: `⚡️ ᴍᴇɴᴜ ᴘʀɪɴᴄɪᴘᴀʟᴇ`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${targetJid.split('@')[0]}:${targetJid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    participant: '0@s.whatsapp.net'
  }

  const cards = [{
    image: { url: 'icone/zenobot.jpg' },
    title: '📚 Menu principale',
    body: `Seleziona una categoria per aprire il relativo submenu.\n\n🚀 ${botName} • v${botVersion}`,
    footer: 'zenobot',
    buttons: [{
      name: 'single_select',
      buttonParamsJson: JSON.stringify({
        title: 'Seleziona categoria',
        sections: [{
          title: 'Categorie',
          rows: SECTIONS.map(section => ({
            title: section.title,
            description: section.body,
            id: `${usedPrefix}${section.cmd}`
          }))
        }]
      })
    }]
  }];

  try {
    return await conn.sendMessage(m.chat, {
      text: `⚡️ ᴍᴇɴÙ ᴘʀɪɴᴄɪᴘᴀʟᴇ ᴅɪ ${botName}`,
      footer: 'zenobot',
      cards,
      mentions: [targetJid]
    }, { quoted: fake });
  } catch (e) {
    console.error('[MENU PRINCIPALE]', e.message)
    const list = SECTIONS.map(s => `🌷 ${usedPrefix}${s.cmd} — ${s.body}`).join('\n')
    return conn.sendMessage(m.chat, { text: `⚡️ ᴍᴇɴÙ ᴘʀɪɴᴄɪᴘᴀʟᴇ ᴅɪ ${botName}\n\n${list}` }, { quoted: m })
  }
};

handler.help = ["menu"];
handler.tags = ['menu'];
handler.command = /^(menu|comandi)$/i;

export default handler;

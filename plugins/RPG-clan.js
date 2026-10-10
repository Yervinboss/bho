//Plugin by Zeno, Lucifero & zenobot staff

global.clans = global.clans || {};
global.db = global.db || {};
global.warHistory = global.warHistory || {};

const MAX_MEMBERS = 5;
const WAR_COST = 200;
const WIN_REWARD = 500;
const LOSE_PENALTY = 200;
const MAX_WARS = 5;
const COOLDOWN = 10 * 60 * 1000;

function getClanByUser(user, chat) {
  const clans = global.clans[chat] || {};
  return Object.values(clans).find(c => c.members.includes(user));
}

function getMoney(user) {
  const u = global.db.data.users[user];
  return (u?.bank || 0) + (u?.money || 0);
}

function payAmount(user, amount) {
  const u = global.db.data.users[user];
  if (!u) return false;

  if (amount < 0) {
    u.money = (u.money || 0) - amount;
    return true;
  }

  if ((u.bank || 0) >= amount) {
    u.bank -= amount;
    return true;
  }

  let restante = amount - (u.bank || 0);
  u.bank = 0;

  if ((u.money || 0) >= restante) {
    u.money -= restante;
    return true;
  }

  return false;
}

function msToTime(duration) {
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let seconds = Math.floor((duration / 1000) % 60);

  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return `${minutes} minuti ${seconds} secondi`;
}

let handler = async (m, { conn, command, text }) => {
  const sender = m.sender;
  const chat = m.chat;

  global.clans[chat] = global.clans[chat] || {};

  if (command === "clan") {
    if (getClanByUser(sender, chat)) return m.reply("Sei già in un clan");

    const tagged = m.mentionedJid || [];
    if (tagged.length !== 4) return m.reply("ɪ ᴄʟᴀɴ ꜱᴏɴᴏ ᴄᴏᴍᴘᴏꜱᴛɪ ᴅᴀ 𝟻 ᴘᴇʀꜱᴏɴᴇ, ᴛᴀɢɢᴀɴᴇ 𝟺 ᴘᴇʀ ꜰᴏɴᴅᴀʀᴇ ᴜɴ ᴄʟᴀɴ.");

    const name = text.split("@")[0].trim();
    if (!name) return m.reply("ᴅᴇᴠɪ ꜱᴄʀɪᴠᴇʀᴇ ɪʟ ɴᴏᴍᴇ ᴅᴇʟ ᴄʟᴀɴ ᴘʀɪᴍᴀ ᴅɪ ᴛᴀɢɢᴀʀᴇ\nᴇꜱᴇᴍᴘɪᴏ: .ᴄʟᴀɴ ᴢᴇɴᴏʙᴏᴛ ʙᴏᴛ @𝟷 @𝟸 @𝟹 @𝟺");

    const members = [sender, ...tagged];
    for (let u of members) if (getClanByUser(u, chat)) return m.reply("ᴜɴ ᴍᴇᴍʙʀᴏ ᴛᴀɢɢᴀᴛᴏ ꜰᴀ ɢɪᴀ̀ ᴘᴀʀᴛᴇ ᴅɪ ᴜɴ ᴄʟᴀɴ!");

    const id = "clan_" + Date.now();

    global.clans[chat][id] = { id, chat, name, founder: sender, members, reputation: 0 };

    let msg = `ᴄʟᴀɴ ꜰᴏɴᴅᴀᴛᴏ!\n\nɴᴏᴍᴇ ᴄʟᴀɴ: *${name}*\nꜰᴏɴᴅᴀᴛᴏʀᴇ: @${sender.split("@")[0]}\n> ᴅɪɢɪᴛᴀ ’’.ᴇꜱᴄɪᴄʟᴀɴ’’ ᴘᴇʀ ᴜꜱᴄɪʀᴇ ᴅᴀʟ ᴄʟᴀɴ\n> ᴅɪɢɪᴛᴀ ’’.ɢᴜᴇʀʀᴀ’’ ᴘᴇʀ ᴀᴛᴛᴀᴄᴄᴀʀᴇ ᴜɴ ᴄʟᴀɴ.\nᴍᴇᴍʙʀɪ:\n`;
    members.forEach(u => msg += `- @${u.split("@")[0]}\n`);

    return conn.sendMessage(chat, { text: msg, mentions: members });
  }

  if (command === "esciclan") {
    const clan = getClanByUser(sender, chat);
    if (!clan) return m.reply("ɴᴏɴ ꜱᴇɪ ɪɴ ᴜɴ ᴄʟᴀɴ");

    if (clan.founder === sender) {
      delete global.clans[chat][clan.id];
      return m.reply("ɪʟ ꜰᴏɴᴅᴀᴛᴏʀᴇ ᴇ̀ ᴜꜱᴄɪᴛᴏ, ɪʟ ᴄʟᴀɴ ᴇ̀ ꜱᴛᴀᴛᴏ ᴀᴜᴛᴏᴍᴀᴛɪᴄᴀᴍᴇɴᴛᴇ ꜱᴄɪᴏʟᴛᴏ");
    }

    clan.members = clan.members.filter(u => u !== sender);
    return m.reply("ꜱᴇɪ ᴜꜱᴄɪᴛᴏ ᴅᴀʟ ᴄʟᴀɴ");
  }

  if (command === "guerra") {
    const clan = getClanByUser(sender, chat);
    if (!clan) return m.reply("ɴᴏɴ ꜱᴇɪ ɪɴ ɴᴇꜱꜱᴜɴ ᴄʟᴀɴ");

    global.db.data.users[sender] = global.db.data.users[sender] || {};
    const user = global.db.data.users[sender];

    const now = Date.now();
    const timePassed = now - (user.lastWar || 0);

    if (user.warCount >= MAX_WARS && timePassed < COOLDOWN) {
      const remaining = COOLDOWN - timePassed;
      return m.reply(`ʟɪᴍɪᴛᴇ ᴅɪ 𝟻 ɢᴜᴇʀʀᴇ ʀᴀɢɢɪᴜɴᴛᴏ.\nɪʟ ʟɪᴍɪᴛᴇ ꜱᴄᴀᴅᴇ ᴛʀᴀ *${msToTime(remaining)}* `);
    }

    if (timePassed >= COOLDOWN) {
      user.warCount = 0;
      user.lastWar = now;
    }

    const clans = global.clans[chat];
    const enemyClan = Object.values(clans).find(c => c.id !== clan.id);

    if (!enemyClan) return m.reply("ɴᴏɴ ᴄ’ᴇ̀ ɴᴇꜱꜱᴜɴ ᴄʟᴀɴ ᴅᴀ ᴀᴛᴛᴀᴄᴄᴀʀᴇ.");

    await conn.sendMessage(chat, {
      text: `⚔️ ɢᴜᴇʀʀᴀ ɪɴ ᴄᴏʀꜱᴏ: *${clan.name}* 🆚 *${enemyClan.name}* ⚔️`
    });

    for (let u of clan.members) if (getMoney(u) < WAR_COST) return m.reply("ᴛᴜᴛᴛɪ ɪ ᴍᴇᴍʙʀɪ ᴅᴇʟ ᴄʟᴀɴ ᴅᴇᴠᴏɴᴏ ᴀᴠᴇʀᴇ ᴀʟᴍᴇɴᴏ 𝟸𝟶𝟶 ZenoCoin ᴛʀᴀ ʙᴀɴᴄᴀ ᴇ ᴘᴏʀᴛᴀꜰᴏɢʟɪᴏ.");

    clan.members.forEach(u => payAmount(u, WAR_COST));

    const win = Math.random() > 0.5;

    if (win) {
      for (let u of enemyClan.members) if (getMoney(u) < WIN_REWARD) return m.reply("ɪʟ ᴄʟᴀɴ ɴᴇᴍɪᴄᴏ ɴᴏɴ ʜᴀ ᴀʙʙᴀꜱᴛᴀɴᴢᴀ ꜱᴏʟᴅɪ.");

      enemyClan.members.forEach(u => payAmount(u, WIN_REWARD));
      clan.members.forEach(u => payAmount(u, -WIN_REWARD));

      clan.reputation += 1;

      user.warCount = (user.warCount || 0) + 1;
      user.lastWar = now;

      return m.reply("ɢᴜᴇʀʀᴀ ᴠɪɴᴛᴀ!\n+𝟻𝟶𝟶 ZenoCoin ᴀ ᴛᴇꜱᴛᴀ\n-𝟸𝟶𝟶 ZenoCoin ᴀ ᴛᴇꜱᴛᴀ ᴘᴇʀ ɪʟ ᴄʟᴀɴ ᴀᴠᴠᴇʀꜱᴀʀɪᴏ\nɪʟ ᴄʟᴀɴ ᴄʀᴇꜱᴄᴇ ᴅɪ +𝟷 ʀᴇᴘᴜᴛᴀᴢɪᴏɴᴇ");
    } else {
      clan.members.forEach(u => payAmount(u, LOSE_PENALTY));

      enemyClan.reputation += 1;

      user.warCount = (user.warCount || 0) + 1;
      user.lastWar = now;

      return m.reply("ɢᴜᴇʀʀᴀ ᴘᴇʀꜱᴀ.\n-𝟸𝟶𝟶 ZenoCoin ᴀ ᴛᴇꜱᴛᴀ ᴘᴇʀ ɪʟ ᴄʟᴀɴ ᴄʜᴇ ʜᴀ ᴀᴛᴛᴀᴄᴄᴀᴛᴏ\n+𝟸𝟶𝟶 ZenoCoin ᴀ ᴛᴇꜱᴛᴀ ᴘᴇʀ ɪʟ ᴄʟᴀɴ ᴠɪɴᴄᴇɴᴛᴇ\n+𝟷 ʀᴇᴘᴜᴛᴀᴢɪᴏɴᴇ ᴘᴇʀ ɪʟ ᴄʟᴀɴ ɴᴇᴍɪᴄᴏ.");
    }
  }

  if (command === "topclan") {
    const clans = Object.values(global.clans[chat] || {});
    if (!clans.length) return m.reply("Non ci sono clan in questo gruppo.");

    let msg = "📜 ᴛᴏᴘ ᴄʟᴀɴ ᴘᴇʀɪᴄᴏʟᴏꜱɪ:\n\n";

    clans.forEach(c => {
      msg += `- *${c.name}*, ꜰᴏɴᴅᴀᴛᴏʀᴇ: @${c.founder.split("@")[0]}, ᴍᴇᴍʙʀɪ: *${c.members.length}*, ʀᴇᴘᴜᴛᴀᴢɪᴏɴᴇ *${c.reputation}*\n`;
    });

    return conn.sendMessage(chat, { text: msg, mentions: clans.map(c => c.members).flat() });
  }
};

handler.command = /^(clan|esciclan|guerra|topclan)$/i;
handler.group = true;

export default handler;
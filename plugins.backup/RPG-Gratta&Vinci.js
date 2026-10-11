//Plugin by Zeno

const COOLDOWN = 2 * 60 * 1000; // 2 minuti

let handler = async (m, { conn }) => {
  const users = global.db.data.users;
  if (!users[m.sender]) users[m.sender] = { money: 0, bank: 0, lastGratta: 0 };
  const user = users[m.sender];

  const now = Date.now();
  const timePassed = now - (user.lastGratta || 0);

  if (timePassed < COOLDOWN) {
    const remaining = msToTime(COOLDOWN - timePassed);
    return conn.sendMessage(m.chat, {
      text: `⏳ ᴅᴇᴠɪ ᴀꜱᴘᴇᴛᴛᴀʀᴇ *${remaining}* ᴘʀɪᴍᴀ ᴅɪ ɢʀᴀᴛᴛᴀʀᴇ ᴅɪ ɴᴜᴏᴠᴏ.`
    }, { quoted: m });
  }

  if (user.money < 500) {
    return conn.sendMessage(m.chat, {
      text: "✖️ ᴛɪ ꜱᴇʀᴠᴏɴᴏ 𝟻𝟶𝟶 ZenoCoin ᴘᴇʀ ᴄᴏᴍᴘʀᴀʀᴇ ᴜɴ ɢʀᴀᴛᴛᴀ & ᴠɪɴᴄɪ."
    }, { quoted: m });
  }

  user.money -= 500; 
  user.lastGratta = now;

  const simboli = ["💎", "💰", "🍀", "🔥", "💣", "🩸"];
  const griglia = [
    simboli[Math.floor(Math.random() * simboli.length)],
    simboli[Math.floor(Math.random() * simboli.length)],
    simboli[Math.floor(Math.random() * simboli.length)]
  ];

  let premio = 0;
  let risultato = "";
  const chance = Math.random() * 100;


  if (chance < 1) {
    griglia[0] = "🩸";
    griglia[1] = "🩸";
    griglia[2] = "🩸";
    premio = 15000;
    risultato = "ᴊᴀᴄᴋᴘᴏᴛ ᴢᴇɴᴏʙᴏᴛ!! ʜᴀɪ ᴠɪɴᴛᴏ 𝟷𝟻𝟶𝟶𝟶 ZenoCoin";
    user.money += premio;
  }
 
    else if (griglia.includes("💣")) {
    risultato = "💥 ʙᴏᴍʙᴀ! ʜᴀɪ ᴘᴇʀꜱᴏ 𝟸𝟶𝟶𝟶 ZenoCoin!";
    user.bank = Math.max(0, user.bank - 2000);
  }

  else if (griglia[0] === griglia[1] && griglia[1] === griglia[2]) {
    premio = 2000;
    risultato = "✨ ᴛʀɪᴘʟᴀ ᴄᴏᴍʙɪɴᴀᴢɪᴏɴᴇ! ʜᴀɪ ᴠɪɴᴛᴏ 𝟸𝟶𝟶𝟶 ZenoCoin";
    user.money += premio;
  }

  else {
    risultato = "✖️ ɴᴇꜱꜱᴜɴᴀ ᴠɪɴᴄɪᴛᴀ";
  }

  let messaggio = `
┌┄┄『❖ ᴢᴇɴᴏʙᴏᴛ 』┄┄┐
┆
┆   ${griglia[0]}  ┆  ${griglia[1]}  ┆  ${griglia[2]}
┆⋆˚｡⋆୨🌸୧⋆｡˚⋆
┆ 🎟️ ᴄᴏꜱᴛᴏ: 500 ZenoCoin
┆ 🧾 ʀɪꜱᴜʟᴛᴀᴛᴏ: ${risultato}
┆ 💵 ᴄᴏɴᴛᴀɴᴛɪ: ${user.money} ZenoCoin
┆ 🏦 ʙᴀɴᴄᴀ: ${user.bank} ZenoCoin
┆
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘
`.trim();

  conn.sendMessage(m.chat, { text: messaggio }, { quoted: m });
};

handler.command = /^gratta$/i;
handler.tags = ['rpg','fun'];
handler.help = ['gratta'];

export default handler;

function msToTime(duration) {
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let seconds = Math.floor((duration / 1000) % 60);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${minutes}m ${seconds}s`;
}
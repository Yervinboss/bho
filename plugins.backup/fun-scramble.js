//Plugin by Zeno


const parole =

[
  "pizza","gelato","zenofrocio","biscotto","panino","hamburger","lasagna","pasta","risotto","mozzarella",
  "nutella","focaccia","tavolo","sedia","lampada","quaderno","penna","matita","libro",
  "telefono","computer","mouse","tastiera","monitor","zaino","occhiali","orologio","microfono",
  "televisione","cuscino","borsa","portafoglio","maglietta","giacca","scarpa","pantalone",
  "calzino","cappello","stivale","camicia","bicicletta","motore","treno","barca","aereo",
  "torino","milano","roma","napoli","genova","bologna","londra","parigi","berlino","madrid",
  "barcellona","tokyo","newyork","rap","trap","canto","canzone","chitarra","pianoforte",
  "batteria","album","playlist","calcio","basket","tennis","rugby","nuoto","pallavolo","ciclismo",
  "universo","galassia","pianeta","cometa","satellite","arcobaleno","montagna","oceano","deserto",
  "foresta","isola","castello","drago","ninja","pirata","robot","vampiro","fantasma","samurai"
];

global.gameScramble = global.gameScramble || {};
global.scramblePoints = global.scramblePoints || {}; 

const handler = async (m, { conn, usedPrefix, args }) => {
  const chatId = m.chat;
  const player = m.sender;

  if (!global.scramblePoints[chatId]) global.scramblePoints[chatId] = {};

  if (args.length === 0) {
    if (global.gameScramble[chatId]) {
      const oldGame = global.gameScramble[chatId];
      if (Date.now() < oldGame.endTime) throw "⚠️ ᴜɴᴀ ᴘᴀʀᴛɪᴛᴀ ᴇ̀ ɢɪᴀ ɪɴ ᴄᴏʀꜱᴏ!";
      else delete global.gameScramble[chatId];
    }

    const parola = parole[Math.floor(Math.random() * parole.length)];
    const scrambled = parola.split("").sort(() => 0.5 - Math.random()).join("");

    global.gameScramble[chatId] = {
      parola,
      scrambled,
      startTime: Date.now(),
      endTime: Date.now() + 120000, // 2 minuti
      tentativi: {}, // tentativi per giocatore
      blocked: [],
      playerSolved: false,
      starter: player
    };

    await conn.sendMessage(chatId, {
      text: `🎮 ꜱᴄʀᴀᴍʙʟᴇ ᴀᴠᴠɪᴀᴛᴏ!\n\nᴘᴀʀᴏʟᴀ: *${scrambled}*\n\nᴛᴇᴍᴘᴏ: 𝟸 ᴍɪɴᴜᴛɪ\n\n𝟻 ᴛᴇɴᴛᴀᴛɪᴠɪ ᴀ ᴛᴇꜱᴛᴀ.\n\nꜱᴄʀɪᴠɪ .ꜱᴄʀᴀᴍʙʟᴇ <ᴘᴀʀᴏʟᴀ> ᴘᴇʀ ᴘʀᴏᴠᴀʀᴇ!`
    });

    const interval = setInterval(async () => {
      const game = global.gameScramble[chatId];
      if (!game) return clearInterval(interval);
      const tempoRestante = Math.max(0, Math.floor((game.endTime - Date.now()) / 1000));
      if (tempoRestante <= 0 && !game.playerSolved) {
        const starter = game.starter;
        global.scramblePoints[chatId][starter] = (global.scramblePoints[chatId][starter] || 0) - 5;

        await conn.sendMessage(chatId, {
          text: `⏳ @${starter.split("@")[0]} ᴛᴇᴍᴘᴏ ꜱᴄᴀᴅᴜᴛᴏ! ʜᴀɪ ᴘᴇʀꜱᴏ 𝟻 ᴘᴜɴᴛɪ.\nʟᴀ ᴘᴀʀᴏʟᴀ ᴇʀᴀ: *${game.parola}* `,
          contextInfo: { mentionedJid: [starter] }
        });
        delete global.gameScramble[chatId];
        clearInterval(interval);
      }
    }, 1000);

    return;
  }

  const game = global.gameScramble[chatId];
  if (!game) return m.reply("✖️ ɴᴇꜱꜱᴜɴᴀ ᴘᴀʀᴛɪᴛᴀ ɪɴ ᴄᴏʀꜱᴏ, ᴜꜱᴀ ’’.ꜱᴄʀᴀᴍʙʟᴇ’’ ᴘᴇʀ ᴀᴠᴠɪᴀʀɴᴇ ᴜɴᴀ!");
  if (game.playerSolved) return;
  if (game.blocked.includes(player)) return; 

  const guess = args.join(" ").toLowerCase();
  game.tentativi[player] = game.tentativi[player] || 0;

  if (guess === game.parola.toLowerCase()) {
    game.playerSolved = true;
    global.scramblePoints[chatId][player] = (global.scramblePoints[chatId][player] || 0) + 10;

    await conn.sendMessage(chatId, {
      text: `🏆 @${player.split("@")[0]} ʜᴀ ɪɴᴅᴏᴠɪɴᴀᴛᴏ!\nʟᴀ ᴘᴀʀᴏʟᴀ ᴇʀᴀ: *${game.parola}*\nʜᴀɪ ɢᴜᴀᴅᴀɢɴᴀᴛᴏ 𝟷𝟶 ᴘᴜɴᴛɪ!\n> ᴜꜱᴀ ’’.ᴛᴏᴘꜱᴄʀᴀᴍʙʟᴇ’’ ᴘᴇʀ ᴠᴇᴅᴇʀᴇ ʟᴀ ᴄʟᴀꜱꜱɪꜰɪᴄᴀ.`,
      contextInfo: { mentionedJid: [player] }
    });

    delete global.gameScramble[chatId];
    return;
  }

  game.tentativi[player]++;
  const tentativiRimasti = 5 - game.tentativi[player];
  const tempoRestante = Math.max(0, Math.floor((game.endTime - Date.now()) / 1000));
  const minuti = Math.floor(tempoRestante / 60);
  const secondi = tempoRestante % 60;
  const tempoDisplay = `${minuti}:${secondi.toString().padStart(2,"0")}`;

  if (tentativiRimasti <= 0) {

    global.scramblePoints[chatId][player] = (global.scramblePoints[chatId][player] || 0) - 5;
    game.blocked.push(player);

    await conn.sendMessage(chatId, {
      text: `✖️ @${player.split("@")[0]} ᴛᴇɴᴛᴀᴛɪᴠɪ ᴇꜱᴀᴜʀɪᴛɪ, ʜᴀɪ ᴘᴇʀꜱᴏ 𝟻 ᴘᴜɴᴛɪ!\nᴘᴀʀᴏʟᴀ: *${game.scrambled}*\n⏳ ᴛᴇᴍᴘᴏ ʀɪᴍᴀɴᴇɴᴛᴇ: *${tempoDisplay}* `,
      contextInfo: { mentionedJid: [player] }
    });
  } else if (tentativiRimasti === 1) {
    await conn.sendMessage(chatId, {
      text: `✖️ @${player.split("@")[0]} ᴘᴀʀᴏʟᴀ ꜱʙᴀɢʟɪᴀᴛᴀ! ʜᴀɪ ᴀɴᴄᴏʀᴀ ᴜɴ ᴜʟᴛɪᴍᴏ ᴛᴇɴᴛᴀᴛɪᴠᴏ.\nᴘᴀʀᴏʟᴀ: *${game.scrambled}*\n⏳ ᴛᴇᴍᴘᴏ ʀɪᴍᴀɴᴇɴᴛᴇ: *${tempoDisplay}* `,
      contextInfo: { mentionedJid: [player] }
    });
  } else {
    await conn.sendMessage(chatId, {
      text: `✖️ @${player.split("@")[0]} ᴘᴀʀᴏʟᴀ ꜱʙᴀɢʟɪᴀᴛᴀ! ʜᴀɪ ᴀɴᴄᴏʀᴀ *${tentativiRimasti}* ᴛᴇɴᴛᴀᴛɪᴠɪ.\nᴘᴀʀᴏʟᴀ: ${game.scrambled}\n⏳ ᴛᴇᴍᴘᴏ ʀɪᴍᴀɴᴇɴᴛᴇ: ${tempoDisplay}`,
      contextInfo: { mentionedJid: [player] }
    });
  }
};

handler.command = /^scramble$/i;
handler.group = true;
export default handler;
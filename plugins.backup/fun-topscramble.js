//Plugin by Zeno


global.scramblePoints = global.scramblePoints || {}; // punti per gruppo

const handler = async (m, { conn }) => {
  const chatId = m.chat;

  const groupPoints = global.scramblePoints[chatId];
  if (!groupPoints || Object.keys(groupPoints).length === 0) {
    return m.reply("ℹ️ ɴᴇꜱꜱᴜɴ ᴘᴜɴᴛᴇɢɢɪᴏ ɪɴ ǫᴜᴇꜱᴛᴏ ɢʀᴜᴘᴘᴏ.");
  }

  const leaderboardEntries = Object.entries(groupPoints)
    .sort((a, b) => b[1] - a[1]);

  const leaderboardText = leaderboardEntries
    .map(([id, pts], i) => `${i + 1}. @${id.split("@")[0]} ${pts} ᴘᴜɴᴛɪ`)
    .join("\n");

  await conn.sendMessage(chatId, {
    text: `📊 ᴛᴏᴘ ꜱᴄʀᴀᴍʙʟᴇ - ᴄʟᴀꜱꜱɪꜰɪᴄᴀ ᴅᴇʟ ɢʀᴜᴘᴘᴏ:\n${leaderboardText}`,
    contextInfo: { mentionedJid: leaderboardEntries.map(([id]) => id) }
  });
};

handler.command = /^topscramble$/i;
handler.group = true;
export default handler;
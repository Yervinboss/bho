
import fs from 'fs';
import os from 'os';
import { performance } from 'perf_hooks';

const toMathematicalAlphanumericSymbols = number => {
  const map = {
    '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺',
    '5': '𝟻', '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿', '.': '.'
  };
  return number.toString().split('').map(digit => map[digit] || digit).join('');
};

const clockString = ms => {
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  return `${toMathematicalAlphanumericSymbols(days.toString().padStart(2, '0'))}:${toMathematicalAlphanumericSymbols(hours.toString().padStart(2, '0'))}:${toMathematicalAlphanumericSymbols(minutes.toString().padStart(2, '0'))}:${toMathematicalAlphanumericSymbols(seconds.toString().padStart(2, '0'))}`;
};

const handler = async (m, { conn }) => {

  const _uptime = process.uptime() * 1000;
  const uptime = clockString(_uptime);

  const old = performance.now();
  const neww = performance.now();
  const speed = (neww - old).toFixed(4);
  const speedWithFont = toMathematicalAlphanumericSymbols(speed);

  const totalMemBytes = os.totalmem();
  const freeMemBytes = os.freemem();
  const usedMemBytes = totalMemBytes - freeMemBytes;
  const totalMemMB = (totalMemBytes / (1024 * 1024)).toFixed(2);
  const usedMemMB = (usedMemBytes / (1024 * 1024)).toFixed(2);

  const processMemory = process.memoryUsage();
  const heapUsedMB = (processMemory.heapUsed / (1024 * 1024)).toFixed(2);
  const heapTotalMB = (processMemory.heapTotal / (1024 * 1024)).toFixed(2);

  const image = fs.readFileSync('./icone/ping.png');

  let nomeDelBot = global.db.data.nomedelbot || '❖ ᴢᴇɴᴏʙᴏᴛ';

  const prova = {
    key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
    message: {
      documentMessage: {
        title: `${nomeDelBot} ᴘɪɴɢ 🏓`,
        jpegThumbnail: image
      }
    },
    participant: "0@s.whatsapp.net"
  };

  const info = `ೋೋ┄┄ • ┄┄ೋೋ
ᴀᴛᴛɪᴠɪᴛᴀ: ${uptime}
ᴠᴇʟ͎Ꮻᴄɪᴛᴀ: ${speedWithFont} ꜱᴇᴄᏫɴᴅɪ
ʀᴀᴍ (server): ${usedMemMB} MB / ${totalMemMB} MB
ᴍᴇᴍ (process): ${heapUsedMB} MB / ${heapTotalMB} MB
ೋೋ┄┄ • ┄┄ೋೋ`.trim();

  await conn.sendMessage(m.chat, {
    text: info,
    footer: "ᴢᴇɴᴏʙᴏᴛ ʙᴏᴛ ᴠᴇʀꜱɪᴏɴᴇ 𝟷𝟶.𝟹"
  }, { quoted: prova });
};

handler.command = /^(ping)$/i;
export default handler;
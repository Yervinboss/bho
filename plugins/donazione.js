//Plugin by Zeno, Lucifero & zenobot staff

let handler = async (m, { conn }) => {

  const text =
`💖 Donazione

Se vuoi supportare lo sviluppo del bot e del progetto puoi fare una piccola donazione qui:

👉 https://www.paypal.me/ZenoWTcomm

Grazie per il supporto da parte dello staff di zenobot 🙏`;

  await conn.sendMessage(m.chat, { text });
};

handler.command = /^donazione$/i;

export default handler;
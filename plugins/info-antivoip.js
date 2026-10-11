//Plugin ZENOBOT — porting da antivoip.js (ZENO ULTIMATE)
const PREFIXES = [
  ['+39', 'Italia', '🇮🇹'], ['+1', 'USA / Canada', '🇺🇸'], ['+44', 'Regno Unito', '🇬🇧'],
  ['+33', 'Francia', '🇫🇷'], ['+49', 'Germania', '🇩🇪'], ['+34', 'Spagna', '🇪🇸'],
  ['+7', 'Russia', '🇷🇺'], ['+380', 'Ucraina', '🇺🇦'], ['+91', 'India', '🇮🇳'],
  ['+62', 'Indonesia', '🇮🇩'], ['+63', 'Filippine', '🇵🇭']
]

let handler = async (m, { conn, text }) => {
  const num = '+' + (text || m.sender).replace(/[^0-9]/g, '')
  const found = PREFIXES.find(([p]) => num.startsWith(p)) || [null, 'Sconosciuto', '🌍']
  return conn.sendMessage(m.chat, { text: `📡 *CONTROLLO NUMERO*\n\n☎️ ${num}\n${found[2]} Paese stimato: *${found[1]}*\n\n_Stima basata sul prefisso internazionale, non è un dato ufficiale._` }, { quoted: m })
}

handler.command = /^antivoip$/i
handler.help = ['antivoip <numero>']
handler.tags = ['info']

export default handler

//Plugin by Zeno, Lucifero & zenobot staff



const BOLD_MAP = {
  a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ꜰ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',
  n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'ꜱ',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ',
  A:'ᴀ',B:'ʙ',C:'ᴄ',D:'ᴅ',E:'ᴇ',F:'ꜰ',G:'ɢ',H:'ʜ',I:'ɪ',J:'ᴊ',K:'ᴋ',L:'ʟ',M:'ᴍ',
  N:'ɴ',O:'ᴏ',P:'ᴘ',Q:'ǫ',R:'ʀ',S:'ꜱ',T:'ᴛ',U:'ᴜ',V:'ᴠ',W:'ᴡ',X:'x',Y:'ʏ',Z:'ᴢ',
  '0':'𝟶','1':'𝟷','2':'𝟸','3':'𝟹','4':'𝟺','5':'𝟻','6':'𝟼','7':'𝟽','8':'𝟾','9':'𝟿'
}

const bold = str => str.split('').map(c => BOLD_MAP[c] || c).join('')

let handler = async (m, { text }) => {
  const plugins = global.plugins || {}
  const entries = Object.entries(plugins)

  if (!entries.length) return m.reply('✖️ Nessun plugin caricato.')

  const filter = text?.trim().toLowerCase()
  const attivi = []
  const disabilitati = []

  for (const [name, p] of entries) {
    const short = name.replace(/^.*[\\/]/, '').replace('.js', '')
    if (filter && !short.toLowerCase().includes(filter)) continue
    if (p.disabled) disabilitati.push(short)
    else attivi.push(short)
  }

  attivi.sort()
  disabilitati.sort()

  let msg = `┌┄ 🔌 ᴘʟᴜɢɪɴ ʟɪꜱᴛ ᴢᴇɴᴏʙᴏᴛ ┄┐\n┆\n`

  if (attivi.length) {
    msg += `┆ ✔️ *Attivi (${attivi.length}):*\n`
    msg += attivi.map(n => `┆  ${bold(n)}`).join('\n') + '\n┆\n'
  }

  if (disabilitati.length) {
    msg += `┆ 🚫 *Disabilitati (${disabilitati.length}):*\n`
    msg += disabilitati.map(n => `┆  ${bold(n)}`).join('\n') + '\n┆\n'
  }

  msg += `└┄┄┄┄┄┄┄┄┄┄┄┄┄┄┘`

  await m.reply(msg)
}

handler.command = /^listpl$/i
handler.rowner = true
export default handler
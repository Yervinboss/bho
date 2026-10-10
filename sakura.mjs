// Tema sakura per zenobot — esegui dalla cartella del bot: node sakura.mjs
import fs from 'fs'
import path from 'path'

const TOP = '⋆˚｡⋆୨🌸୧⋆｡˚⋆'
const DIV = '⋆｡˚ ❀ ˚｡⋆'
const menuFiles = ['menu-admin.js', 'menu-funzioni.js', 'menu-giochi.js', 'menu-RPG.js', 'menu-owner.js', 'assistenza.js']
let n = 0
const save = (p, s, o) => { if (s !== o) { fs.writeFileSync(p, s); n++; console.log('✿', p) } }

// 1) menu a tema ciliegio
for (const f of menuFiles) {
  const p = path.join('plugins', f)
  if (!fs.existsSync(p)) continue
  const o = fs.readFileSync(p, 'utf8')
  let s = o
    .replace(/┌┄+┐/g, TOP).replace(/└┄+┘/g, TOP)
    .replace(/┆┄+/g, DIV)
    .replace(/┌ \*/g, '🌷 *')
    .replace(/┆❖ /g, '🌸 ')
    .replace(/┆▹/g, '❀')
    .replace(/┆\$\{/g, '${')
    .replace(/▹/g, '❀')
    .replace(/┆ ?/g, '')
    .replace(/⚡️?/g, '🌸')
    .replace(/[\u13a0-\u13ff]/g, 'ᴏ')
  save(p, s, o)
}

// 2) menu principale: icone delle categorie
{
  const p = path.join('plugins', 'menu-principale.js')
  if (fs.existsSync(p)) {
    const o = fs.readFileSync(p, 'utf8')
    const map = [['👥', '🎀'], ['⚙️', '🌷'], ['⚙', '🌷'], ['👑', '🌸'], ['🎮', '🍡'], ['🎰', '🏮'], ['🔐', '🗝️'], ['🛠️', '🍃'], ['🛠', '🍃'], ['📚', '🌸'], ['🚀', '🌸'], ['⚡️', '🌸'], ['⚡', '🌸']]
    let s = o
    for (const [a, b] of map) s = s.split(a).join(b)
    save(p, s, o)
  }
}

// 3) miniatura dei messaggi "contatto": immagine locale invece del link esterno
const re = /await \(await fetch\((["'])https:\/\/qu\.ax\/JKCXP\.jpg\1\)\)\.buffer\(\)/g
for (const f of fs.readdirSync('plugins')) {
  if (!f.endsWith('.js')) continue
  const p = path.join('plugins', f)
  const o = fs.readFileSync(p, 'utf8')
  save(p, o.replace(re, "(await import('fs')).default.readFileSync('./icone/sakura-thumb.jpg')"), o)
}

// 4) colori del terminale: rosa
for (const f of ['index.js', 'zenobot.js']) {
  if (!fs.existsSync(f)) continue
  const o = fs.readFileSync(f, 'utf8')
  save(f, o.split('#00f5d4').join('#ffd1dc').split('#9b5de5').join('#ff8fab').split('#f15bb5').join('#ff5d8f'), o)
}

console.log(`\nFatto: ${n} file modificati 🌸`)

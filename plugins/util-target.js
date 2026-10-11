// util-target.js — helper condiviso, nessun comando proprio: ricava il bersaglio (menzione, citazione o numero)
export const getTarget = (m, text) => {
  if (m.mentionedJid?.length) return m.mentionedJid[0]
  if (m.quoted?.sender) return m.quoted.sender
  if (text) {
    const n = text.replace(/[^0-9]/g, '')
    if (n) return n + '@s.whatsapp.net'
  }
  return null
}

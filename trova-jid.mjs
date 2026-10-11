import makeWASocket, { useMultiFileAuthState, Browsers } from '@whiskeysockets/baileys'

const { state } = await useMultiFileAuthState('./ZenobotSession')
const sock = makeWASocket({
  auth: state,
  browser: Browsers.ubuntu('Chrome'),
  printQRInTerminal: false,
  syncFullHistory: false
})

sock.ev.on('connection.update', async ({ connection }) => {
  if (connection === 'open') {
    try {
      const meta = await sock.newsletterMetadata('invite', 'H5ZmgxVQ0RE2FEyKjR79RZ')
      console.log('\n✅ JID CANALE:', meta.id, '\n')
    } catch (e) {
      console.error('\n❌ ERRORE:', e.message, '\n')
    }
    process.exit(0)
  }
})

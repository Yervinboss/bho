//Plugin by Zeno



let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.isGroup) return;

    try {
        const metadata = await conn.groupMetadata(m.chat);
        const groupName = metadata.subject;
        const inviteCode = await conn.groupInviteCode(m.chat);
        const inviteLink = 'https://chat.whatsapp.com/' + inviteCode;

        const interactiveButtons = [
            {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    display_text: "🔗 ᴄᴏᴘɪᴀ ʟɪɴᴋ",
                    id: inviteLink,
                    copy_code: inviteLink
                })
            }
        ];

        const msg = {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        header: {
                            title: "⚡️ ᴢᴇɴᴏʙᴏᴛʙᴏᴛ • ʟɪɴᴋ",
                            hasMediaAttachment: false
                        },
                        body: {
                            text: `┌⋆˚｡⋆୨🌸୧⋆｡˚⋆┐  
┆ 📢 ʟɪɴᴋ ᴜꜰꜰɪᴄɪᴀʟᴇ
┆❖ ᴢᴇɴᴏʙᴏᴛ
┆⋆˚｡⋆୨🌸୧⋆｡˚⋆
┆▹ ɢʀᴜᴘᴘᴏ: ${groupName}
┆
┆ 💡 ᴜꜱᴀ ɪʟ ᴛᴀꜱᴛᴏ ǫᴜɪ ꜱᴏᴛᴛᴏ
┆ ᴘᴇʀ ᴄᴏᴘɪᴀʀᴇ ɪʟ ʟɪɴᴋ 
┆ ɴᴇɢʟɪ ᴀᴘᴘᴜɴᴛɪ.
└⋆˚｡⋆୨🌸୧⋆｡˚⋆┘`
                        },
                        footer: {
                            text: "💡 ᴢᴇɴᴏʙᴏᴛʙᴏᴛ"
                        },
                        nativeFlowMessage: {
                            buttons: interactiveButtons
                        }
                    }
                }
            }
        };

        await conn.relayMessage(m.chat, msg, {});

    } catch (e) {
        console.error(e);
        m.reply("⚠️ ᴇʀʀᴏʀᴇ: Impossibile generare il link. Assicurati che il bot sia Amministratore.");
    }
};

handler.help = ['link'];
handler.tags = ['gruppo'];
handler.command = /^(link|invito)$/i;
handler.group = true;
handler.mods = true;
handler.botAdmin = true;

export default handler;
/*******************************************************
 * @author  : Lorenzxz
 * @contact : 
 *      - YouTube: @Lorenzxz
 *      - Instagram: Lorenzxz
 *      - Telegram: t.me/Atzmus
 *      - GitHub: @Lorenzxz
 *      - WhatsApp: +6283879020370
 *      - WhatsApp Channel: https://whatsapp.com/channel/0029VamXcap4Crfjc2tSod1a
 * 
 * @description:
 *      Re-upload? Recode? Copy code? Give credit ya :)
 * 
 * @note:
 *      Want more free bot scripts? Subscribe to my YouTube channel:
 *      https://youtube.com/@LLorenzxz
 ******************************************************/

const { jidNormalizedUser } = require("@whiskeysockets/baileys");

module.exports = (client, store) => {
  // Group update handler
  client.ev.on("groups.update", (updates) => {
    for (const update of updates) {
      const id = update.id;
      if (store.groupMetadata[id]) {
        store.groupMetadata[id] = {
          ...(store.groupMetadata[id] || {}),
          ...(update || {}),
        };
      }
    }
  });

  // Participants update handler
  client.ev.on("group-participants.update", ({ id, participants, action }) => {
    const metadata = store.groupMetadata[id];
    if (metadata) {
      switch (action) {
        case "add":
          metadata.participants.push(
            ...participants.map((id) => ({
              id: jidNormalizedUser(id),
              admin: null,
            })),
          );
          break;
        case "remove":
          metadata.participants = metadata.participants.filter(
            (p) => !participants.includes(jidNormalizedUser(p.id)),
          );
          break;
        case "promote":
        case "demote":
          for (const participant of metadata.participants) {
            let normalizedId = jidNormalizedUser(participant.id);
            if (participants.includes(normalizedId)) {
              participant.admin = action === "promote" ? "admin" : null;
            }
          }
          break;
      }
    }
  });
};
  

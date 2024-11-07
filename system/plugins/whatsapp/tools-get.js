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

const fetch = require("node-fetch");

module.exports = {
    command: 'get',
    type: ['tools'],
    description: '*provide URL*',
    async execute(client, m, args, reply) {
        const text = args.join(" ");
        if (!/^https?:\/\//.test(text)) {
            return reply("Awali *URL* dengan http:// atau https://");
        }

        const ajg = await fetch(text);
        if (ajg.headers.get("content-length") > 100 * 1024 * 1024) {
            throw `Content-Length: ${ajg.headers.get("content-length")}`;
        }

        const contentType = ajg.headers.get("content-type");
        if (contentType.startsWith("image/")) {
            return client.sendMessage(
                m.chat,
                { image: { url: text } },
                { quoted: m }
            );
        }
        if (contentType.startsWith("video/")) {
            return client.sendMessage(
                m.chat,
                { video: { url: text } },
                { quoted: m }
            );
        }
        if (contentType.startsWith("audio/")) {
            return client.sendMessage(
                m.chat,
                { audio: { url: text } },
                { quoted: m }
            );
        }
        
        let alak = await ajg.buffer();
        try {
            alak = util.format(JSON.parse(alak + ""));
        } catch (e) {
            alak = alak + "";
        } finally {
            return reply(alak.slice(0, 65536));
        }
    }
}

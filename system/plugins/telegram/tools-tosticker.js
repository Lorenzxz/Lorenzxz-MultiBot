/*******************************************************
 * @base    : DGXeon
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

const axios = require('axios');
const path = require('path');
const fs = require('fs').promises;
const sharp = require('sharp');

module.exports = (bot, availableCommands) => {
  const commandName = 'tosticker';
  availableCommands.push({ command: commandName, tags: ['all'] });

  bot.command(commandName, async (ctx) => {
    const message = ctx.message;

    if (message.reply_to_message && message.reply_to_message.photo) {
      const photo = message.reply_to_message.photo.slice(-1)[0];
      const fileId = photo.file_id;

      try {
        const creatingMessage = await ctx.reply('Creating...');

        const fileLink = await bot.telegram.getFileLink(fileId);

        const response = await axios.get(fileLink, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data);

        const stickerBuffer = await sharp(imageBuffer)
          .resize(512, 512, {
            fit: 'inside',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .webp({ quality: 100 })
          .toBuffer();

        const stickerPath = path.join(__dirname, 'temp_sticker_image.webp');
        await fs.writeFile(stickerPath, stickerBuffer);

        await ctx.replyWithSticker({ source: stickerPath });

        await fs.unlink(stickerPath);

        await ctx.telegram.editMessageText(ctx.chat.id, creatingMessage.message_id, null, 'Success!!!');
      } catch (error) {
        console.error('Error generating sticker:', error);
        ctx.reply('Terjadi kesalahan saat menghasilkan stiker.');
        await ctx.telegram.editMessageText(ctx.chat.id, creatingMessage.message_id, null, 'Error!!!');
      }
    } else {
      ctx.reply('Please reply to the /sticker command on a photo to create a sticker.');
    }
  });
};

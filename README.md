## the second project
Hi guys, this is my first project, please forgive me if there are any mistakes, guys✨, this script was created since Thursday, October 17, 2024. Don't forget to give stars and follow me😄🐈‍⬛

## how to connect with telegram bot
## [ 🇮🇩 ] Berikut langkah-langkah untuk mendapatkan token bot Telegram & Discord:

## Telegram
1. **Buka aplikasi Telegram**, lalu di kolom pencarian, ketik username **BotFather**:  
   `@BotFather`
2. Klik **BotFather** dari hasil pencarian, lalu pilih **Start** untuk memulai percakapan.
3. Ketik atau pilih perintah `/newbot` untuk membuat bot baru.
4. **BotFather** akan meminta kamu untuk memberikan nama bot baru.  
   Contoh: `MyAwesomeBot`
5. Setelah kamu memberikan nama, **BotFather** akan meminta kamu untuk memberikan username untuk bot tersebut. Username harus diakhiri dengan **"bot"** atau **"_bot"**.  
   Contoh: `myawesome_bot` atau `MyAwesomeBot`
6. Jika username valid dan belum digunakan, **BotFather** akan mengonfirmasi dan mengirimkan **token API** untuk bot baru tersebut.  
   Contoh token: `123456789:ABCDefghIJKLmnOPQRSTUvwxYZ1234567890`
7. Simpan token ini, karena token ini yang akan kamu gunakan untuk mengontrol bot melalui API Telegram.

## Discord
1. **Buka website Discord Developer Portal**, lalu kamu buat application baru.
2. Pada Application baru, kamu klik garis tiga lalu tekan `Bots`
3. Setelah itu kamu reset token 
4. Simpan token di config.js

## [ 🇺🇸 ] Here are the steps to get a Telegram & Discord bot token:

## Telegram
1. **Open the Telegram app** and search for **BotFather** by typing the username:  
   `@BotFather`
2. Click on **BotFather** from the search results, and select **Start** to begin the conversation.
3. Type or select the command `/newbot` to create a new bot.
4. **BotFather** will ask you to provide a name for your new bot.  
   Example: `MyAwesomeBot`
5. After you provide a name, **BotFather** will ask you to provide a username for the bot. The username must end with **"bot"** or **"_bot"**.  
   Example: `myawesome_bot` or `MyAwesomeBot`
6. If the username is valid and not already in use, **BotFather** will confirm and send you the **API token** for your new bot.  
   Example token: `123456789:ABCDefghIJKLmnOPQRSTUvwxYZ1234567890`
7. Save this token, as you will use it to control the bot through the Telegram API.

## Discord
1. **Open the Discord Developer Portal website**, then you create a new application.
2. In the new application, you click the three lines then press `Bots`
3. After that you reset the token
4. Save token in config.js

## Thank you to those who have helped me ✨

- [`Lorenzxz`](https://github.com/lorenzxz) Lorenzxz ( Creator )
- [`kiuur`](https://github.com/kiuur) KyuuRzy ( Base Source )

without them this script is nothing, thank you to them 💫

## A Few Tips for Using Buttons
- to display the "Button List" view
```javascript
let buttons = new Buttons();
buttons.setBody("what? what are you doing?");
buttons.addSelection("List Menu");
buttons.makeSections("#! - Show All Menu List!!", "");
buttons.makeRow(
    "#! - Show All Menu",
    "display all menu in the bot !!!",
    "you can see all the features in this bot",
    `${prefix}menuall`
);
await buttons.run(m.chat, client, m);
```
- to display the "Button Copy" view
```javascript
let buttons = new Buttons();   
buttons.setBody("what? what are you doing?");
buttons.addCopy("Copy", `puqi`);
await buttons.run(m.chat, client, m);
```
## To change/modify the bot's display section, you can go to:
```javascript
("./start/lib/buttondoc.js")
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.






 
* © Lorenzxz ZcoderX
* © N-Kiuur ZcoderX

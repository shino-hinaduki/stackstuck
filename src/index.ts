// import * as mineflayer from 'mineflayer';
const mineflayer = require('mineflayer');
const { mineflayer: mineflayerViewer } = require('prismarine-viewer');

const options = {
    host: 'localhost',
    port: 25565,
    username: 'stackstuck',
    // password: '', // TODO: Connecting to an online server
};
const bot = mineflayer.createBot(options);

bot.once('spawn', () => {
    bot.chat('on spawn!');
    mineflayerViewer(bot, { port: 3007, firstPerson: false });
});

bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    bot.chat(message);
});
bot.on('kicked', (x) => {
    console.log(x);
});
bot.on('error', (x) => {
    console.log(x);
});

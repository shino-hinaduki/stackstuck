// import * as mineflayer from 'mineflayer';
const mineflayer = require('mineflayer');
const { mineflayer: mineflayerViewer } = require('prismarine-viewer');
const {
    pathfinder,
    Movements,
    goals: { GoalNear },
} = require('mineflayer-pathfinder');

const options = {
    host: 'localhost',
    port: 25565,
    username: 'stackstuck',
    // password: '', // TODO: Connecting to an online server
};
const bot = mineflayer.createBot(options);
bot.loadPlugin(pathfinder);

bot.once('spawn', () => {
    bot.chat('on spawn!');
    mineflayerViewer(bot, { port: 3007, firstPerson: false });
});

bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message !== 'come') {
        bot.chat(message);
        return;
    }

    const mcData = require('minecraft-data')(bot.version);
    const defaultMove = new Movements(bot, mcData);
    const target = bot.players[username]?.entity;
    const { x: playerX, y: playerY, z: playerZ } = target.position;

    bot.pathfinder.setMovements(defaultMove);
    bot.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, 1));
    bot.chat(`go to ${playerX}, ${playerY}, ${playerZ}`);
});

bot.on('kicked', (x) => {
    console.log(x);
});
bot.on('error', (x) => {
    console.log(x);
});

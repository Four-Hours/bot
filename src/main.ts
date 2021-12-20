import { Client, Intents, Interaction } from 'discord.js';
import event from 'events';
import { statusType } from './routes/status';

require('./express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const eventEmitter: event.EventEmitter = new event.EventEmitter();

const token: string | undefined = process.env.TOKEN;
let status = 'offline';

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;

    switch (commandName) {
        case 'ping':
            await interaction.reply('Pong!');
            break;
        case 'status':
            await interaction.reply(status);
            break;
        default:
            break;
    }
});

eventEmitter.on('status', (stat: statusType) => {
    console.log(stat);
    status = stat.status;
});

if (token) {
    client.login(token);
}

export default eventEmitter;
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const clientId: string | undefined = process.env.CLIENTID;
const guildId: string | undefined = process.env.GUILDID;
const token: string | undefined = process.env.TOKEN;

if (clientId && guildId && token) {
    const commands = [
        new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
        new SlashCommandBuilder().setName('status').setDescription('Replies with server status!'),
    ]
        .map(command => command.toJSON());

    const rest = new REST({ version: '9' }).setToken(token);

    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}
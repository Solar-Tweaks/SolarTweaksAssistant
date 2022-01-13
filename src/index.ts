import { Client, Intents } from 'discord.js';
export const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

import * as dotenv from 'dotenv';
dotenv.config();

import handleEvents from './events/handler';

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  console.log('Registering event listeners');
  handleEvents(client);
});

client.login(process.env.DISCORD_TOKEN);

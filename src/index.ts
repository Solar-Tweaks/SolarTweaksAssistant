import { Client, Intents } from 'discord.js';
export const client = new Client({
  intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS],
});

import * as dotenv from 'dotenv';
dotenv.config();

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

import handleEvents from './events/handleEvents';
handleEvents();

client.login(process.env.DISCORD_TOKEN);

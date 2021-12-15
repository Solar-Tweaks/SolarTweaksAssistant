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

import handleCommands from './commands/commandHandler';
import { linkedPlayerWorker } from './utils';
// import sendRegisterMessage from './sendRegisterMessage';

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  handleCommands(client);

  linkedPlayerWorker();

  // sendRegisterMessage();
});

client.on('messageCreate', (message) => {
  try {
    if (message.channelId !== '916013398200811632' || message.author.bot)
      return;
    message.delete().catch(() => console.log('Unable to delete message'));
  } catch (error) {}
});

client.login(process.env.DISCORD_TOKEN);

import { Client, Intents } from 'discord.js';
export const client = new Client({ intents: Intents.FLAGS.GUILD_MEMBERS });

import * as dotenv from 'dotenv';
dotenv.config();

client.login(process.env.DISCORD_TOKEN);

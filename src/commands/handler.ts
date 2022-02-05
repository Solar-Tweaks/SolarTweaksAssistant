import { Client } from 'discord.js';

import purge from './purge';
import softban from './softban';

export default function (client: Client): void {
  client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
      switch (interaction.commandName) {
        case 'purge':
          await purge(interaction);
          break;
        case 'softban':
          await softban(interaction);
          break;
        default:
          break;
      }
    }
  });
}

import { Client } from 'discord.js';

import purge from './purge';

export default function (client: Client): void {
  client.on('interactionCreate', (interaction) => {
    if (interaction.isCommand()) {
      switch (interaction.commandName) {
        case 'purge':
          purge(interaction);
          break;

        default:
          break;
      }
    }
  });
}

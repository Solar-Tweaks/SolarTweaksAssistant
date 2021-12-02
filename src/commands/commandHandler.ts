import { Client, CommandInteraction } from 'discord.js';

import registerCommand from './register';

export default function registerCommands(client: Client) {
  client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand) {
      return;
    }

    const commandInteraction = interaction as CommandInteraction;

    switch (commandInteraction.commandName) {
      case 'register':
        registerCommand(commandInteraction);
        break;

      default:
        break;
    }
  });
}

require('dotenv').config();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { default: constants } = require('./constants');

const commands = [
  {
    name: 'purge',
    type: 1,
    description: 'Deletes a number of messages from a channel',
    default_permission: false,
    options: [
      {
        name: 'count',
        type: 4,
        description: 'The number of messages to delete',
        required: true,
      },
    ],
  },
  {
    name: 'softban',
    type: 1,
    description:
      'Kicks a user from the server and deletes their messages in a selected period of time',
    default_permission: false,
    options: [
      {
        name: 'member',
        type: 6,
        description: 'The member to softban',
        required: true,
      },
      {
        name: 'reason',
        type: 3,
        description: 'The reason for the softban',
        required: true,
      },
      {
        name: 'deletedays',
        type: 4,
        description:
          'The number of days to delete the messages (betwen 1 and 7)',
        required: false,
      },
    ],
  },
];

const permissions = [
  {
    id: '931281972611940362', // Purge
    permissions: [
      {
        id: constants.roles.OWNER,
        type: 1,
        permission: true,
      },
      {
        id: constants.roles.ADMINISTRATOR,
        type: 1,
        permission: true,
      },
    ],
  },
  {
    id: '931296374044106834', // Softban
    permissions: [
      {
        id: constants.roles.OWNER,
        type: 1,
        permission: true,
      },
      {
        id: constants.roles.ADMINISTRATOR,
        type: 1,
        permission: true,
      },
    ],
  },
];

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(constants.clientId, constants.serverId),
      { body: commands }
    );

    console.log('Successfully reloaded application (/) commands.');

    console.log('Started refreshing application (/) commands permissions.');

    await rest.put(
      `/applications/${constants.clientId}/guilds/${constants.serverId}/commands/permissions`,
      { body: permissions }
    );

    console.log('Successfully reloaded application (/) commands permissions.');
  } catch (error) {
    console.error(error);
  }
})();

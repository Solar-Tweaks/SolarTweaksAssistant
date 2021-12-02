require('dotenv').config();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
  {
    name: 'register',
    description: 'Register your Minecraft account',
    options: [
      {
        name: 'username',
        description: 'Minecraft username',
        type: 3,
        required: true,
      },
      {
        name: 'code',
        description: 'Verification code obtained from the Minecraft server',
        type: 3,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        '880500602910679112'
      ),
      {
        body: commands,
      }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

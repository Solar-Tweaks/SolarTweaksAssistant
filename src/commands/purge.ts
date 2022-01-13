import {
  CommandInteraction,
  MessageEmbed,
  TextChannel,
  ThreadChannel,
} from 'discord.js';
import sendLogMessage from '../utils/sendLogMessage';

export default function (interaction: CommandInteraction): void {
  const channel = interaction.channel as TextChannel | ThreadChannel;

  interaction.deferReply({
    ephemeral: true,
  });

  channel
    .bulkDelete(interaction.options.getInteger('count', true))
    .then(() => {
      interaction.editReply({
        embeds: [
          new MessageEmbed({
            color: 'GREEN',
            title: 'Purge successful',
            description: `Purged ${interaction.options.getInteger(
              'count',
              true
            )} messages`,
            timestamp: new Date(),
          }),
        ],
      });
      sendLogMessage(
        new MessageEmbed({
          color: 'DARK_RED',
          author: {
            name: interaction.user.username,
            iconURL: interaction.user.avatarURL(),
          },
          title: 'Purge',
          description: `${
            interaction.user.username
          } purged ${interaction.options.getInteger(
            'count',
            true
          )} messages in <#${channel.id}>`,
        }),
        'modLogs'
      );
    })
    .catch((error) => {
      console.error(error);
      interaction.reply({
        embeds: [
          new MessageEmbed({
            color: 'RED',
            title: 'Purge failed',
            description: `Failed to purge messages: ${error.message}\n\n\`\`\`${error.stack}\`\`\``,
            timestamp: new Date(),
          }),
        ],
      });
    });
}

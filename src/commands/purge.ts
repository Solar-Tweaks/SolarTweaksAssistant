import {
  CommandInteraction,
  MessageEmbed,
  TextChannel,
  ThreadChannel,
} from 'discord.js';
import sendLogMessage from '../utils/sendLogMessage';

export default async function (interaction: CommandInteraction): Promise<void> {
  const channel = interaction.channel as TextChannel | ThreadChannel;

  await interaction.deferReply({ ephemeral: true });

  channel
    .bulkDelete(interaction.options.getInteger('count', true))
    .then(async () => {
      await interaction.editReply({
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
          title: '<:purge:931580968035315813> Purge',
          description: `${
            interaction.user.username
          } purged ${interaction.options.getInteger(
            'count',
            true
          )} messages in <#${channel.id as string}>`,
          footer: {
            text: 'Purged',
          },
          timestamp: new Date(),
        }),
        'modLogs'
      );
    })
    .catch((error) => {
      interaction.editReply({
        embeds: [
          new MessageEmbed({
            color: 'RED',
            title: 'Purge failed',
            description: `Failed to purge messages: ${
              error.message as string
            }\n\n\`\`\`${error.stack as string}\`\`\``,
            timestamp: new Date(),
          }),
        ],
      });
    });
}

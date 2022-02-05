import { CommandInteraction, GuildMember, MessageEmbed } from 'discord.js';
import sendLogMessage from '../utils/sendLogMessage';

export default async function (interaction: CommandInteraction): Promise<void> {
  await interaction.deferReply({ ephemeral: true });

  const member = interaction.options.getMember('member', true) as GuildMember;

  if (!member.bannable) {
    await interaction.editReply({
      embeds: [
        new MessageEmbed({
          color: 'RED',
          title: 'Softban failed',
          description: `I can't softban ${member.user.tag}`,
          timestamp: new Date(),
        }),
      ],
    });
    return;
  }

  await member
    .ban({
      reason: `Softban: ${interaction.options.getString(
        'reason',
        true
      )} | Softbanned by ${interaction.user.username}`,
      days: interaction.options.getInteger('deletedays', false),
    })
    .catch(async (error) => {
      console.error(error);
      await interaction.reply({
        embeds: [
          new MessageEmbed({
            color: 'RED',
            title: 'Softban failed',
            description: `Failed to softban <@${member.user.id as string}>: ${
              error.message as string
            }\n\n\`\`\`${error.stack as string}\`\`\``,
            timestamp: new Date(),
          }),
        ],
      });
      return;
    });

  await interaction.guild.bans
    .remove(
      member.id,
      `Softban: ${interaction.options.getString(
        'reason',
        true
      )} | Softbanned by ${interaction.user.username}`
    )
    .then(async () => {
      await interaction.editReply({
        embeds: [
          new MessageEmbed({
            color: 'GREEN',
            title: 'Softban successful',
            description: `Softbanned ${member.user.username}`,
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
          title: '<:justice:931580988474163201> Softban',
          description: `Softbanned ${member.user.username} ||*(${
            member.user.id
          })*||\n\n**Reason:** ${interaction.options.getString(
            'reason',
            true
          )}`,
          footer: {
            text: 'Softabanned',
          },
          timestamp: new Date(),
        }),
        'modLogs'
      );
    });
}

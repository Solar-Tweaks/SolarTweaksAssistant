import { Message, MessageEmbed, PartialMessage, TextChannel } from 'discord.js';
import sendLogMessage from '../utils/sendLogMessage';

export default async function (
  message: Message | PartialMessage
): Promise<void> {
  if (message.author.bot) return;
  const embed = new MessageEmbed()
    .setColor('RED')
    .setTitle(`Message deleted in #${(message.channel as TextChannel).name}`)
    .setAuthor({
      name: message.author.username,
      iconURL: message.author.avatarURL(),
    })
    .setDescription('```diff\n- ' + message.content + '```')
    .setFooter({ text: 'Deleted' })
    .setTimestamp();

  await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));

  const fetchedLogs = await message.guild
    .fetchAuditLogs({
      type: 'MESSAGE_DELETE',
      limit: 5,
    })
    .catch(console.error);

  if (fetchedLogs) {
    const entry = fetchedLogs.entries.find(
      (entry) =>
        // @ts-ignore
        entry.target.id === message.author.id &&
        // @ts-ignore
        entry.extra.channel.id === message.channel.id &&
        Date.now() - entry.createdTimestamp < 20000
    );

    if (entry) {
      const executor = entry.executor ? entry.executor : 'Unknown';

      if (typeof executor !== 'string') {
        if (executor.id !== message.author.id) {
          embed.description += `**Deleted by:** <@${executor.id}>`;
        }
      }
    }
  }

  sendLogMessage(embed, 'messages');
}

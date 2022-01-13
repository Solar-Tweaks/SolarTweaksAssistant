import { Message, MessageEmbed, TextChannel, ThreadChannel } from 'discord.js';
import sendLogMessage from '../utils/sendLogMessage';

export default function (oldMessage: Message, newMessage: Message): void {
  if (oldMessage.author.bot) return;
  const embed = new MessageEmbed()
    .setColor('ORANGE')
    .setAuthor({
      name: oldMessage.author.username,
      iconURL: oldMessage.author.avatarURL(),
    })
    .setTitle(
      `Message edited in #${
        (oldMessage.channel as TextChannel | ThreadChannel).name
      }`
    )
    .setDescription(
      '```diff\n- ' + oldMessage.content + '\n+ ' + newMessage.content + '```'
    )
    .setFooter({ text: 'Edited' })
    .setTimestamp();

  sendLogMessage(embed, 'messages');
}

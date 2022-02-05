import { GuildMember, MessageEmbed, PartialGuildMember } from 'discord.js';
import sendLogMessage from '../utils/sendLogMessage';

export default function (member: GuildMember | PartialGuildMember): void {
  const embed = new MessageEmbed()
    .setColor('RED')
    .setAuthor({
      name: member.user.username,
      iconURL: member.user.avatarURL(),
    })
    .setTitle(
      `<:leave:931581010443927583> ${
        member.user.username as string
      } left the server!`
    )
    .setFooter({ text: 'Left' })
    .setTimestamp();

  sendLogMessage(embed, 'joinsLeaves');
}

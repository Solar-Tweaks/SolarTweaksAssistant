import { GuildMember, MessageEmbed } from 'discord.js';
import sendLogMessage from '../utils/sendLogMessage';

export default function (member: GuildMember): void {
  const embed = new MessageEmbed()
    .setColor('GREEN')
    .setAuthor({
      name: member.user.username,
      iconURL: member.user.avatarURL(),
    })
    .setTitle(`Someone joined the server!`)
    .setDescription(
      `<@${
        member.user.id
      }> created their account on ${member.user.createdAt.toLocaleDateString()} *(<t:${
        (member.user.createdTimestamp - (member.user.createdTimestamp % 1000)) /
        1000
      }:R>)*`
    )
    .setFooter({ text: 'Joined' })
    .setTimestamp();

  sendLogMessage(embed, 'joinsLeaves');
}

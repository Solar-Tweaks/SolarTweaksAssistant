import { GuildMember, PartialGuildMember } from 'discord.js';
import constants from '../constants';

export default function (
  oldMember: GuildMember | PartialGuildMember,
  newMember: GuildMember | PartialGuildMember
): void {
  const oldStatus = oldMember.premiumSince;
  const newStatus = newMember.premiumSince;

  if (!oldStatus && newStatus)
    if (newMember.guild.premiumSubscriptionCount <= 16)
      newMember.roles.add(constants.roles.EARLY_SERVER_BOOSTER);

  if (oldStatus && !newStatus)
    newMember.roles.remove(constants.roles.EARLY_SERVER_BOOSTER);
}

import { GuildMember } from 'discord.js';
import { client } from '..';

export default function handler(): void {
  client.on(
    'guildMemberUpdate',
    (oldMember: GuildMember, newMember: GuildMember): void => {
      const roles = {
        booster: '889500356055285761',
        supporter: '912961872129556480',
      };

      const isBoosting = {
        oldMember: oldMember.roles.cache.has(roles.booster),
        newMember: newMember.roles.cache.has(roles.booster),
      };

      // User is not boosting
      if (!isBoosting.oldMember && !isBoosting.newMember) return;

      // User is boosting
      if (!isBoosting.oldMember && isBoosting.newMember) {
        newMember.roles.add(roles.supporter);
        return;
      }

      // User is not boosting anymore...
      if (isBoosting.oldMember && !isBoosting.newMember) {
        newMember.roles.remove(roles.supporter);
        return;
      }
    }
  );
}

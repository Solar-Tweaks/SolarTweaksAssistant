import axios from 'axios';

import { client } from '.';

export const headers = { authorization: process.env.API_AUTH };

export async function isUserRegistered(
  type: 'player' | 'discord',
  uuid?: string,
  discordId?: string
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    axios
      .get(`${process.env.API_ENDPOINT}/verification/linkTable`, {
        headers,
        params: { uuid, type, discordId },
      })
      .catch((error) => {
        resolve(false);
      })
      .then(() => {
        resolve(true);
      });
  });
}

export function linkedPlayerWorker() {
  setInterval(async () => {
    const players = await (
      await axios.get(`${process.env.API_ENDPOINT}/verification/linkTable`, {
        headers,
        params: { type: 'all' },
      })
    ).data;

    const guild = client.guilds.cache.get('880500602910679112');

    for (const discordId in players.verificationLinkTable) {
      const guildMember = await guild.members.fetch({ user: discordId });

      const guildMemberRole = guildMember.roles.highest.id;

      let rank = getRankFromHighestRole(guildMemberRole);

      await syncPlayer(discordId, rank);
    }
  }, 15 * 60 * 1000); // 15 minutes
}

export async function syncPlayer(discordId: string, rank: string) {
  await axios
    .post(
      `${process.env.API_ENDPOINT}/discord/syncPlayer`,
      {
        discordId,
        rank,
      },
      { headers }
    )
    .catch((error) => {
      console.log(error);
    });
}

export function getRankFromHighestRole(guildMemberRole) {
  let rank: string;
  switch (guildMemberRole) {
    case '880500603128803333': // Owner role
      rank = 'Owner';
      break;
    case '894675838581211148': // Admin role
      rank = 'Admin';
      break;
    case '892654032492052510': // Developer role
      rank = 'Developer';
      break;
    case '905825594892234812': // Solar+ role
    case '916055151410835587': // All Cosmetics role
    case '915324305972277259': // OG Booster
    case '895039643903479808': // Helper role
      rank = 'Supporter';
      break;
    default:
      rank = 'User';
      break;
  }
  return rank;
}

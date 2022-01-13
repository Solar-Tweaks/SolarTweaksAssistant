import { Client } from 'discord.js';

import guildMemberAdd from './guildMemberAdd';
import guildMemberRemove from './guildMemberRemove';
import messageDelete from './messageDelete';
import messageUpdate from './messageUpdate';

export default function (client: Client): void {
  client.on('guildMemberAdd', guildMemberAdd);
  client.on('guildMemberRemove', guildMemberRemove);

  client.on('messageUpdate', messageUpdate);
  client.on('messageDelete', messageDelete);
}

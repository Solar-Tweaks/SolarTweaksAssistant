import { Client } from 'discord.js';

import guildMemberAdd from './guildMemberAdd';
import guildMemberRemove from './guildMemberRemove';
import guildMemberUpdate from './guildMemberUpdate';
import messageDelete from './messageDelete';
import messageUpdate from './messageUpdate';

export default function (client: Client): void {
  client.on('guildMemberAdd', guildMemberAdd);
  client.on('guildMemberRemove', guildMemberRemove);
  client.on('guildMemberUpdate', guildMemberUpdate);

  client.on('messageUpdate', messageUpdate);
  client.on('messageDelete', messageDelete);
}

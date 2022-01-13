import { MessageEmbed, ThreadChannel } from 'discord.js';
import { client } from '..';
import constants from '../constants';
import { LogThreadType } from '../types';

export default function (embed: MessageEmbed, type: LogThreadType): void {
  const thread = client.guilds.cache
    .get(constants.serverId)
    .channels.cache.get(constants.logsIds[type]) as ThreadChannel;
  thread.send({ embeds: [embed] });
}

import { MessageEmbed, TextChannel } from 'discord.js';
import { client } from '.';

export default function () {
  const embed = new MessageEmbed()
    .setColor('BLURPLE')
    .setTitle('__Solar Tweaks Verification__')
    .setDescription(
      'Before you can enjoy your cosmetics we need to make sure you own your account (this is to avoid problems like cape bombing).\n\nYou can do so by :\n - Connecting to our Minecraft Server `mc.solartweaks.com:8088` **(⚠️ 1.8.9 only)**, then you will see on your screen a verification code\n - Running the (/) command `/register <Your Minecraft Username> <Verification code>`'
    );

  (client.channels.cache.get('916013398200811632') as TextChannel).send({
    embeds: [embed],
  });
}

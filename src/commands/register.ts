import { CommandInteraction, MessageEmbed } from 'discord.js';
import axios from 'axios';

import { isUserRegistered, headers } from '../utils';

import * as dotenv from 'dotenv';
dotenv.config();

export default async function run(interaction: CommandInteraction) {
  const username = interaction.options.getString('username', true);
  const code = interaction.options.getString('code', true);
  const uuid = await getUUIDFromUsername(username);

  const embed = new MessageEmbed().setTitle('Solar Tweaks Verification');

  if (uuid === false) {
    embed
      .setColor('RED')
      .setDescription(`Player \`${username}\` does not exist`);
    interaction.reply({ embeds: [embed], ephemeral: true });
  } else {
    if ((await isUserRegistered('player', uuid as string)) === true) {
      embed
        .setColor('GREEN')
        .setDescription(`Player \`${username}\` is already registered`);
      interaction.reply({ embeds: [embed], ephemeral: true });
    } else if (
      (await isUserRegistered('discord', null, interaction.user.id)) === true
    ) {
      embed
        .setColor('RED')
        .setDescription('This Discord account is already linked to a player');
      interaction.reply({ embeds: [embed], ephemeral: true });
    } else {
      axios
        .post(
          `${process.env.API_ENDPOINT}/verification/code`,
          {
            code,
            uuid,
            discordId: interaction.user.id,
          },
          { headers }
        )
        .then(() => {
          embed
            .setColor('GREEN')
            .setDescription(`Your account has been verified!`);
          interaction.reply({ embeds: [embed], ephemeral: true });
        })
        .catch((error) => {
          switch (error.response.status) {
            case 404:
              embed
                .setColor('RED')
                .setDescription(
                  `Verification process not started for player \`${username}\`!`
                );
              break;
            case 406:
              embed
                .setColor('RED')
                .setDescription(`Verification code \`${code}\` is invalid!`);
            default:
              break;
          }
          interaction.reply({ embeds: [embed], ephemeral: true });
        });
    }
  }
}

async function getUUIDFromUsername(username: string): Promise<string | false> {
  return new Promise<string | false>((resolve, reject) => {
    axios
      .get(`https://api.mojang.com/users/profiles/minecraft/${username}`)
      .catch((error) => {
        resolve(false);
      })
      .then((response) => {
        // @ts-ignore
        const uuid = response.data.id;
        if (!uuid) {
          resolve(false);
        } else {
          resolve(
            uuid.substr(0, 8) +
              '-' +
              uuid.substr(8, 4) +
              '-' +
              uuid.substr(12, 4) +
              '-' +
              uuid.substr(16, 4) +
              '-' +
              uuid.substr(20)
          );
        }
      });
  });
}

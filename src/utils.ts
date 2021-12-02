import axios from 'axios';

export const headers = { authorization: process.env.API_AUTH };

export async function isUserRegistered(uuid: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    axios
      .get(`${process.env.API_ENDPOINT}/verification/linkTable`, {
        headers,
        params: { uuid, type: 'player' },
      })
      .catch((error) => {
        resolve(false);
      })
      .then(() => {
        resolve(true);
      });
  });
}

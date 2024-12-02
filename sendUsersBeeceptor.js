import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const users = JSON.parse(fs.readFileSync('db.json', 'utf-8')).users; 


async function sendUsersToBeeceptor() {
  try {
    const url = process.env.URL_BDD_USERS;

    for (let user of users) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error(`Error al enviar el usuario ${user.username}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Usuario enviado con éxito:', data);
    }
  } catch (error) {
    console.error('Error al enviar los usuarios:', error.message);
  }
}


sendUsersToBeeceptor();

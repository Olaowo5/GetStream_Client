
import { getURLCredentials } from './getUrlCred';


// A list of random characters
export const characters = [
  'MisMaguis',
  'Golem',
  'Poliwrath',
  'Magneton',
  'Magnemite',
  'Lucario',
  'MewTwo',
  'Dakrai',
  'Gardevoir',
  'Geodude',
  'Drogon',
  'Finn',
];

//id: characterName.replace(/[^_\-0-9a-zA-Z@]/g, '_'),

export const getUser = () => {
  const { user_id, user_name } = getURLCredentials();
  
  if (user_id) {
    return {
      id: user_id,
      name: user_name || user_id,
      role: 'user',
      custom:{color: 'yellow'},
    };
  }



  


  const index = Math.floor(Math.random() * characters.length);
  const characterName = characters[index];
  const uniqueId = `${characterName.replace(/[^_\-0-9a-zA-Z@]/g, '_')}`;

  //console.log('Charcte Name:', characterName);
  //console.log('The unique is:', uniqueId);

  if (!window.sessionStorage.getItem('user')) {
    window.sessionStorage.setItem(
      'user',
      JSON.stringify({
        id: uniqueId,
        name: characterName,
      })
    );
  }
  // Retrieve and debug the stored user object
const user = JSON.parse(window.sessionStorage.getItem('user') || '{}');
//console.log('The user sourced from session storage:', user);

return user;
};
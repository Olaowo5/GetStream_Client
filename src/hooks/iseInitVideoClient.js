import { StreamVideoClient} from '@stream-io/video-react-sdk';
//import { StreamClient } from "@stream-io/node-sdk";
import { useEffect, useMemo, useState } from 'react';
import { getUser } from '../utils/getUser';
import { getURLCredentials } from '../utils/getUrlCred';
import { useParams } from 'react-router-dom';



const envApiKey = process.env.REACT_APP_API_KEY;
const serverTokenEndPoint = process.env.REACT_APP_ENDPOINT;

export const useInitVideoClient = ({ isAnon }) => {
  const { callId } = useParams();
  const { api_key, token, type } = getURLCredentials();


  const newUser = useMemo(() => isAnon ? { id: '!anon' } : getUser(), [isAnon]);


  const apiKey = api_key || envApiKey;
  const [authToken, setAuthToken] = useState(token);
  const [client, setClient] = useState();
  

  useEffect(() => {

    //console.log('The user is:', newUser);
    console.log(`The user is currently ${isAnon ? 'anonymous' : 'not anonymous'}.`);
   // console.log(`The Token Calleed ${authToken}`);

    if (!apiKey || !serverTokenEndPoint) {
      console.error("Missing API Key or Token Server URL");
      return;
    }

    const fetchToken = async () => {
      try {
        const response = await fetch(serverTokenEndPoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: newUser.id })
        });
        const data = await response.json();
        setAuthToken(data.token);
        console.log(`Received Token from Server: ${data.token}`);
      } catch (error) {
        console.error("Error fetching token from server", error);
      }
    };

    if (!authToken) {
      fetchToken();
    }


console.log(`Final Token: ${authToken}`);
console.log(`Final User: ${newUser}`);
//now
const client_Stream = new StreamVideoClient({apiKey, user: newUser,token: authToken,});

setClient(client_Stream);
    

    return () => {
      client_Stream.disconnectUser().catch((error) => 
        console.error(`Unable to disconnect user`, error));
      setClient(null);
    };
  }, [apiKey, callId, isAnon, authToken, type, newUser]);

  return client;
};

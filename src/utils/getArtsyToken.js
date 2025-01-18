import axios from 'axios';

const getArtsyToken = async () => {
  const clientID = import.meta.env.VITE_ARTSY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_ARTSY_CLIENT_SECRET;
  const apiUrl = 'https://api.artsy.net/api/tokens/xapp_token';

  try {
    const response = await axios.post(apiUrl, {
      client_id: clientID,
      client_secret: clientSecret
    });
    const token = response.data.token;
    console.log('Fetched Artsy token:', token); // Log the token
    return token;
  } catch (error) {
    console.error('Error fetching Artsy token:', error);
    throw error;
  }
};

export default getArtsyToken;
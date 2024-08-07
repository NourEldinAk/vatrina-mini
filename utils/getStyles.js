import axios from '../utils/axiosInstance';

export async function fetchStyles() {
  try {
    const response = await axios.get('/styles');
    const { primary, background, text } = response.data.style.colors;
    const siteName = response.data.site_name;

    return {
      styles: { primary, background, text },
      siteName,
    };
  } catch (error) {
    console.error('Error fetching styles:', error);
    return {
      styles: { primary: '', background: '', text: '' },
      siteName: '',
    };
  }
}

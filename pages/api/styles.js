import axios from '../../utils/axiosInstance';

export default async function handler(req, res) {
  try {
    const response = await axios.get('/styles');
    const { primary, background, text } = response.data.style.colors;
    const siteName = response.data;

    res.status(200).json({ primary, background, text, siteName });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch styles' });
  }
}

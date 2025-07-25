export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, use POST.' });
  }

  try {
    const { prompt, referenceImage } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    const payload = {
      prompt,
      ...(referenceImage && { referenceImage })
    };

    const response = await fetch('https://photomuse-relay.vercel.app/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Image generation failed.');
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}

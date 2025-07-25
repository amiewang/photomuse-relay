export default async function handler(req, res) {
  const { prompt, referenceImage } = req.body;

  const response = {
    imageUrl: "https://via.placeholder.com/1200x1800.png?text=Generated+Image"
  };

  res.status(200).json(response);
}

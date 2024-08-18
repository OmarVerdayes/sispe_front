// server.js o index.js
const express = require('express');
const { createCheckoutSession } = require('./stripe');
const app = express();

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId } = req.body;
    const sessionId = await createCheckoutSession(priceId);
    res.json({ sessionId });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});

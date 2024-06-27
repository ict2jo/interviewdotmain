// /pages/api/payments.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { orderId, orderName, customerName, customerEmail, amount, paymentKey } = req.body;

    try {
      const response = await fetch('http://localhost:8080/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          orderName,
          customerName,
          customerEmail,
          amount,
          paymentKey,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return res.status(response.status).json(error);
      }

      const result = await response.json();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

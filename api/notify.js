export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { first_name, last_name, phone, email, vehicle, service, notes } = req.body;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken  = process.env.TWILIO_AUTH_TOKEN;

  const lines = [
    `New Booking - Cirelli's`,
    `Name: ${first_name} ${last_name}`,
    `Service: ${service}`,
    `Vehicle: ${vehicle || 'N/A'}`,
    `Phone: ${phone || 'N/A'}`,
    `Email: ${email}`,
  ];
  if (notes) lines.push(`Notes: ${notes}`);

  const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const twilioRes = await fetch(twilioUrl, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      To:   '+15858671840',
      From: '+14402524754',
      Body: lines.join('\n'),
    }),
  });

  if (!twilioRes.ok) {
    const err = await twilioRes.json();
    console.error('Twilio error:', err);
    return res.status(500).json({ error: 'SMS failed' });
  }

  return res.status(200).json({ success: true });
}

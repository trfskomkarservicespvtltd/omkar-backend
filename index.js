const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheetId = '197FwVUK8EoT11XqFjI7C80hgkzsI6Wl7ESd1GerrLXc';
const sheetRange = 'Sheet1!A2:K1000';

app.get('/investor', async (req, res) => {
  const email = req.query.email?.toLowerCase();
  if (!email) return res.status(400).send('Email is required');

  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: sheetRange,
    });

    const rows = response.data.values;

    const headers = [
      'Investor ID',
      'Full Name',
      'Email',
      'Phone',
      'Investment Amount',
      'Investment Date',
      'Plan',
      'Monthly Return',
      'Capital Return Date',
      'Status',
      'Login Email'
    ];

    const investor = rows.find(row => (row[10] || '').toLowerCase() === email);

    if (!investor) return res.status(404).send('Investor not found');

    const data = {};
    headers.forEach((header, index) => {
      data[header] = investor[index] || '';
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

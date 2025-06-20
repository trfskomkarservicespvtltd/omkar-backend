
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Google Sheets setup
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const spreadsheetId = '197FwVUK8EoT11XqFjI7C80hgkzsI6Wl7ESd1GerrLXc';

// Add Investor
app.post('/add-investor', async (req, res) => {
  const { investorId, fullName, email, phone, amount, date, plan, monthlyReturn, capitalReturnDate, status, loginEmail } = req.body;
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Investor!A2:K',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[investorId, fullName, email, phone, amount, date, plan, monthlyReturn, capitalReturnDate, status, loginEmail]],
      },
    });

    res.status(200).send('Investor added');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding investor');
  }
});

// Get Investors
app.get('/get-investors', async (req, res) => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Investor!A2:K',
    });

    res.status(200).json(response.data.values);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching investors');
  }
});

// Add Payout
app.post('/add-payout', async (req, res) => {
  const { payoutId, investor, month, payoutDate, payoutAmount, status } = req.body;
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Payout!A2:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[payoutId, investor, month, payoutDate, payoutAmount, status]],
      },
    });

    res.status(200).send('Payout added');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding payout');
  }
});

// Get Payouts
app.get('/get-payouts', async (req, res) => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Payout!A2:F',
    });

    res.status(200).json(response.data.values);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching payouts');
  }
});

// Add Referral
app.post('/add-referral', async (req, res) => {
  const { referralId, referrerName, referrerId, referredPersonName, investmentAmount, referralCommission, status } = req.body;
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Referral!A2:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[referralId, referrerName, referrerId, referredPersonName, investmentAmount, referralCommission, status]],
      },
    });

    res.status(200).send('Referral added');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding referral');
  }
});

// Get Referrals
app.get('/get-referrals', async (req, res) => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Referral!A2:G',
    });

    res.status(200).json(response.data.values);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching referrals');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

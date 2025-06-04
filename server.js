const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const geoip = require('geoip-lite');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/check-eligibility', (req, res) => {
  const { age, income, investment, acceptTerms } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const location = geoip.lookup(ip) || {};

  const isEligible = age >= 21 && income >= 25000 && investment <= income * 0.5;

  const log = {
    timestamp: new Date().toISOString(),
    ip,
    location,
    age,
    income,
    investment,
    acceptedTerms: acceptTerms,
    status: isEligible ? 'eligible' : (acceptTerms ? 'ineligible_accepted' : 'rejected')
  };

  fs.appendFileSync('eligibility_logs.json', JSON.stringify(log) + '\n');

  if (isEligible) {
    res.json({ status: 'eligible' });
  } else if (acceptTerms) {
    res.json({ status: 'ineligible_accepted' });
  } else {
    res.json({ status: 'rejected' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
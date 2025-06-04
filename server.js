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
  const {
    name,
    age,
    occupation,
    income,
    citystate,
    investment,
    loan,
    knowledge,
    expectation,
    reaction,
    documents,
    kyc,
    rejectreaction
  } = req.body;

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const location = geoip.lookup(ip) || {};

  // Eligibility Logic
  const isEligible =
    age >= 25 && age <= 60 &&
    income >= 40000 &&
    (investment === "50k-1L" || investment === "1L-2L" || investment === "2Lplus") &&
    loan !== "difficult" &&
    expectation !== "quick" &&
    reaction !== "aggressive" &&
    documents === "yes" &&
    kyc === "yes" &&
    rejectreaction !== "angry";

  const log = {
    timestamp: new Date().toISOString(),
    ip,
    location,
    name,
    age,
    occupation,
    income,
    citystate,
    investment,
    loan,
    knowledge,
    expectation,
    reaction,
    documents,
    kyc,
    rejectreaction,
    status: isEligible ? 'eligible' : 'ineligible'
  };

  fs.appendFileSync('eligibility_logs.json', JSON.stringify(log) + '\n');

  if (isEligible) {
    res.json({ status: 'eligible' });
  } else {
    res.json({ status: 'ineligible' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/check-eligibility", (req, res) => {
  const { age, income, investment, acceptTerms } = req.body;

  if (!acceptTerms || !age || !income || !investment) {
    return res.status(400).json({ status: "error", message: "Missing data" });
  }

  const isEligible = age >= 21 && income >= 25000;

  if (isEligible) {
    return res.status(200).json({ status: "eligible" });
  } else {
    return res.status(200).json({ status: "not_eligible" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

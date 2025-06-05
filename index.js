const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post("/api/submit", (req, res) => {
  const formData = req.body;

  // Eligibility logic
  const eligible =
    formData.monthlyIncome >= 50000 &&
    formData.investmentAmount !== "Below ₹50,000" &&
    formData.stockKnowledge !== "None" &&
    formData.kyc === "Yes" &&
    formData.panAgreement === "Yes" &&
    formData.reactionToRejection !== "Get angry or post bad review" &&
    formData.repaymentReaction !== "I’ll get aggressive";

  if (eligible) {
    return res.status(200).json({ status: "success", eligible: true });
  } else {
    return res.status(200).json({ status: "success", eligible: false });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

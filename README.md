# Omkar Eligibility API

This is a simple backend to handle investor eligibility check submissions.

## Routes

- `POST /check-eligibility` — Checks if the user is eligible based on age and income.

## Requirements

- Node.js 16+
- Deployed via Railway or any Node.js server

## Usage

```bash
npm install
npm start

---

### ✅ Step 4: **Upload to GitHub**
1. Create a **new GitHub repo**, name it `omkar-eligibility-backend`
2. Add these 3 files:
   - `index.js`
   - `package.json`
   - `README.md`
3. Commit and push to GitHub.

---

### ✅ Step 5: **Deploy to Railway**
1. Go to [https://railway.app](https://railway.app)
2. Create a **new project**
3. Select **"Deploy from GitHub"**
4. Connect it to your `omkar-eligibility-backend` repo
5. Railway will automatically detect the entry point and install dependencies
6. Once deployed, copy the new URL and update your frontend script:
   ```js
   fetch("https://YOUR_RAILWAY_URL/check-eligibility", { ... })

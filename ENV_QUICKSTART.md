# Quick Start: Environment Variables

## 🏠 Local Development (Your Machine)

### 1. First Time Setup
```bash
# Navigate to project
cd ecommerce-final

# Install dependencies
npm install

# Copy example to local env
cp .env.example .env.local

# Edit with your local credentials (dev Firebase, dev MongoDB, test Stripe keys)
nano .env.local
# Fill in with your test credentials
```

### 2. Run Locally
```bash
npm run dev
# Open http://localhost:3000
# Changes auto-reload
```

### 3. Credentials for Local Development

**Get Firebase Test Credentials:**
1. Go to https://console.firebase.google.com
2. Create a new project (or use existing)
3. Go to Project Settings → General
4. Copy Web API Key and other values
5. Paste into `.env.local`

**Get MongoDB Test Credentials:**
1. Go to https://cloud.mongodb.com
2. Create a new cluster (Free tier available)
3. Click "Connect" → "Connect your application"
4. Copy connection string (replace `<password>` and database name)
5. Paste into `.env.local` as `MONGODB_URL`

**Get Stripe Test Credentials:**
1. Go to https://dashboard.stripe.com
2. Make sure you're in "Test" mode
3. Click "Developers" → "API keys"
4. Copy "Publishable key" and "Secret key"
5. Paste into `.env.local`

---

## 🌍 Production Deployment

### Option 1: Deploy to Vercel (Easiest - Recommended)

```bash
# Step 1: Push code to GitHub
git add .
git commit -m "Setup env variables"
git push origin main

# Step 2: Import to Vercel
# 1. Go to https://vercel.com
# 2. Click "New Project"
# 3. Import your GitHub repo
# 4. Click "Deploy"

# Step 3: Add Production Env Variables
# In Vercel Dashboard → Settings → Environment Variables
# Add all 16 variables with PRODUCTION credentials:

NEXT_PUBLIC_FIREBASE_API_KEY=prod_key_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=prod_bucket_here
MONGODB_URL=mongodb+srv://prod_user:prod_pass@prod_cluster.mongodb.net/db
JWT_SECRET_KEY=super_secret_random_string
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
STRIPE_SECRET_KEY=sk_live_your_live_key
NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com
STRIPE_SUCCESS_URL=https://yourdomain.com/checkout?status=success
STRIPE_CANCEL_URL=https://yourdomain.com/checkout?status=cancel
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=12345678
NEXT_PUBLIC_FIREBASE_APP_ID=1:12345678:web:abc123

# Step 4: Redeploy
# In Vercel Dashboard, click "Redeploy" or push new commit
```

### Option 2: Deploy to Self-Hosted Server

```bash
# Step 1: SSH into your server
ssh user@your-server.com
cd /var/www/ecommerce-final

# Step 2: Pull latest code
git pull origin main

# Step 3: Create production env file
nano .env.production
# Paste your production credentials (same as Vercel above)
# Ctrl+O, Enter, Ctrl+X to save

# Step 4: Set permissions (security)
chmod 600 .env.production

# Step 5: Install & build
npm install --production
npm run build

# Step 6: Start with PM2
npm install -g pm2
pm2 start "npm start" --name "ecommerce"
pm2 startup
pm2 save

# Step 7: Setup Nginx reverse proxy
sudo nano /etc/nginx/sites-available/default
# Add this:
# server {
#   listen 80;
#   server_name yourdomain.com;
#   location / {
#     proxy_pass http://localhost:3000;
#   }
# }
sudo systemctl restart nginx

# Step 8: Setup SSL (HTTPS)
sudo apt install certbot
sudo certbot --nginx -d yourdomain.com
```

---

## 📝 Environment Variables Explained

### For `.env.local` (Local Development)

```properties
# Firebase - Get from Firebase Console (Test/Dev Project)
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyD..."
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="my-dev-project.appspot.com"

# MongoDB - Get from MongoDB Atlas (Dev Cluster)
MONGODB_URL="mongodb+srv://dev_user:dev_pass@dev-cluster.mongodb.net/ecommerce"

# JWT - Use any string for development
JWT_SECRET_KEY="dev-secret-key-not-secure-just-for-testing"

# Stripe - Use TEST keys from Stripe Dashboard
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# URLs - Keep as localhost for development
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"
STRIPE_SUCCESS_URL="http://localhost:3000/checkout?status=success"
STRIPE_CANCEL_URL="http://localhost:3000/checkout?status=cancel"
```

### For Production (`.env.production` or Vercel)

```properties
# Firebase - Get from Firebase Console (Production Project)
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyP..."
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="my-prod-project.appspot.com"

# MongoDB - Get from MongoDB Atlas (Production Cluster)
MONGODB_URL="mongodb+srv://prod_user:prod_pass@prod-cluster.mongodb.net/ecommerce"

# JWT - Use a strong, random secret (generate: openssl rand -base64 32)
JWT_SECRET_KEY="abc123xyz789def456ghi789jkl012mno345pqr"

# Stripe - Use LIVE keys from Stripe Dashboard
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."

# URLs - Use your actual domain
NEXT_PUBLIC_API_BASE_URL="https://yourdomain.com"
STRIPE_SUCCESS_URL="https://yourdomain.com/checkout?status=success"
STRIPE_CANCEL_URL="https://yourdomain.com/checkout?status=cancel"
```

---

## 🔑 Getting Each Credential

### Firebase Credentials
```
1. Go to: https://console.firebase.google.com
2. Select or create a project
3. Click ⚙️ (Settings) → Project Settings
4. Under "Your apps", click on your Web app
5. Copy config values
```

### MongoDB URL
```
1. Go to: https://cloud.mongodb.com
2. Select your cluster
3. Click "Connect" → "Connect your application"
4. Copy and modify:
   mongodb+srv://username:password@cluster.mongodb.net/database_name
5. Replace:
   - username: your db user
   - password: your db password
   - database_name: your database name (e.g., "ecommerce")
```

### Stripe Keys
```
1. Go to: https://dashboard.stripe.com/apikeys
2. Make sure "Test mode" is ON (for local dev)
3. Copy "Publishable key" (starts with pk_test_)
4. Copy "Secret key" (starts with sk_test_)

For production:
1. Switch "Test mode" OFF
2. Copy "Publishable key" (starts with pk_live_)
3. Copy "Secret key" (starts with sk_live_)
```

### JWT Secret
```
Generate a random string (min 32 characters):

Option 1 - Terminal command:
openssl rand -base64 32

Option 2 - Online generator:
https://generate-random.org/

Option 3 - Any random string:
abc123xyz789def456ghi789jkl012mno345pqr

Make it different for each environment (local vs prod)
```

---

## 🧪 Testing Your Setup

### Check Local Setup
```bash
# Verify .env.local exists
ls -la .env.local
# Output: -rw-r--r-- 1 user user XXX .env.local

# Verify it's in .gitignore
grep "env.local" .gitignore
# Output: .env*.local

# Build successfully
npm run build
# Should complete with no errors

# Start dev server
npm run dev
# Should show: ▲ Next.js X.X.X
# Ready in X.Xs
```

### Check Production Secrets Are Loaded
```bash
# On Vercel:
# 1. Go to Settings → Environment Variables
# 2. You should see all 16 variables listed

# On Server:
# 1. SSH in
# 2. cat .env.production | wc -l
#    Should show 16+ lines
# 3. cat .env.production | head -5
#    Should show encrypted/hidden values or your values
```

### Test Each Feature
```bash
Local Development:
✓ npm run dev works
✓ http://localhost:3000 loads
✓ Can create account
✓ Can login
✓ Can add products to cart
✓ Stripe checkout appears (blue Stripe frame)

Production (after deploy):
✓ Site loads at yourdomain.com
✓ Can create account (goes to production MongoDB)
✓ Can login
✓ Can checkout (uses production Stripe Live keys)
✓ Order appears in dashboard
```

---

## 🐛 Common Issues & Solutions

### "Environment variable not found"
**Problem:** Code can't access `process.env.VARIABLE_NAME`

**Solution:**
1. Check variable is in `.env.local` (local) or Vercel Dashboard (production)
2. Restart dev server: `Ctrl+C` then `npm run dev`
3. For browser variables, name must start with `NEXT_PUBLIC_`

### Database Connection Failed
**Problem:** MongoDB won't connect

**Solution:**
1. Verify connection string: `echo $MONGODB_URL`
2. Check credentials in MongoDB Atlas are correct
3. Verify IP whitelist includes your server IP
4. Try connecting manually: `mongosh "mongodb+srv://..."`

### Stripe Not Working
**Problem:** Checkout page blank or error

**Solution:**
1. Verify you're using correct environment keys:
   - Local: `pk_test_...` and `sk_test_...`
   - Production: `pk_live_...` and `sk_live_...`
2. Check Stripe Dashboard is in correct mode (Test vs Live)
3. Verify webhook endpoints are configured (if using)

### Firebase Images Not Uploading
**Problem:** Image upload fails or image won't display

**Solution:**
1. Check storage bucket name is correct
2. Verify Firebase permissions allow uploads
3. Check browser console for CORS errors
4. Verify bucket is in same project as API key

---

## 📚 Where to Find Your Credentials

| Service | Where to Find | What You Need |
|---------|---|---|
| **Firebase** | console.firebase.google.com | 6 variables (API Key, Project ID, etc.) |
| **MongoDB** | cloud.mongodb.com | Connection string with credentials |
| **Stripe** | dashboard.stripe.com/apikeys | 2 keys (Publishable + Secret) |
| **JWT** | Generate yourself | Random 32+ char string |
| **Your Domain** | Domain registrar | yourdomain.com for production URLs |

---

## 🚀 Deploy with 1 Command

### Vercel (Easiest)
```bash
git push origin main
# Done! Vercel automatically deploys
```

### Self-Hosted
```bash
ssh user@server
cd /var/www/app
git pull origin main
npm run build
pm2 restart ecommerce
```

---

**Need Help?** Check:
1. `ENV_GUIDE.md` - Detailed guide
2. `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist
3. `.env.example` - Template of all variables

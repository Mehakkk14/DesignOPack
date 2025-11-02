# EmailJS Setup Guide for DesignOPack

## ✅ What's Done:
- EmailJS library installed
- Quote Modal updated to send emails
- Contact form updated to send emails
- Environment file created (.env)

## 🚀 How to Complete Setup (5 minutes):

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up" (it's FREE)
3. Sign up with your Google account or email

### Step 2: Add Email Service
1. After login, go to "Email Services"
2. Click "Add New Service"
3. Choose **Gmail** (or your preferred email provider)
4. Click "Connect Account"
5. Follow the prompts to connect your email (designopackindia@gmail.com)
6. Copy the **Service ID** (looks like: service_xxxxxx)

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Template Name:** Quote Request

**Subject:** New Quote Request from {{from_name}}

**Content:**
```
Hello DesignOPack Team,

You have received a new quote request:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Product Interest: {{product}}

Message:
{{message}}

---
This email was sent from your website contact form.
```

4. Save the template
5. Copy the **Template ID** (looks like: template_xxxxxx)

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (looks like: xxxxxxxxxxx)
3. Copy it

### Step 5: Update .env File
Open the `.env` file in your project and replace with your actual values:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Step 6: Restart Dev Server
```bash
npm run dev
```

## 🎉 That's It!

Now when customers fill out:
- Quote Request form → You get email
- Contact form → You get email

## 📧 You'll receive emails at: designopackindia@gmail.com

## 🔒 Free Plan Limits:
- 200 emails/month (Perfect for starting out!)
- Upgrade later if needed

## 🆘 Troubleshooting:
- Make sure to restart dev server after updating .env
- Check browser console for any errors
- Verify all 3 keys are copied correctly (no extra spaces)

## 📱 Next Steps (Optional):
- Add WhatsApp integration
- Add Google Sheets tracking
- Set up auto-reply emails

# 📧 Email Handover Guide - Switching to Official Company Email

When handing over the project to DesignOPack, you'll need to update email addresses from `rastogimehak3845@gmail.com` to their official company email addresses.

## 🔄 **STEP-BY-STEP HANDOVER PROCESS**

### **Step 1: Get Company Email Details**
Ask DesignOPack for:
- **Primary contact email** (e.g., `info@designopack.com`, `sales@designopack.com`)
- **Admin/Management email** (e.g., `admin@designopack.com`)
- **Support email** (optional: `support@designopack.com`)

### **Step 2: Update Environment Variables**
Update the `.env` file:

```env
# OLD (Development/Testing)
VITE_DESIGNOPACK_EMAIL=rastogimehak3845@gmail.com

# NEW (Production - Company Official)
VITE_DESIGNOPACK_EMAIL=sales@designopack.com
# OR
VITE_DESIGNOPACK_EMAIL=info@designopack.com
```

### **Step 3: Update Code Files**

#### **3.1 QuoteModal.tsx**
Replace hardcoded email in the EmailJS template params:

```tsx
// FIND THIS (Line ~35):
const templateParams = {
  to_email: 'rastogimehak3845@gmail.com',  // ← CHANGE THIS
  to_name: 'DesignOPack Team',
  // ... rest of params
};

// REPLACE WITH:
const templateParams = {
  to_email: import.meta.env.VITE_DESIGNOPACK_EMAIL || 'sales@designopack.com',
  to_name: 'DesignOPack Team',
  // ... rest of params
};
```

#### **3.2 QuoteModal.tsx - Fallback Methods**
Update FormSubmit fallback email:

```tsx
// FIND THIS (Line ~67):
const formSubmitResponse = await fetch('https://formsubmit.co/rastogimehak3845@gmail.com', {

// REPLACE WITH:
const formSubmitResponse = await fetch(`https://formsubmit.co/${import.meta.env.VITE_DESIGNOPACK_EMAIL || 'sales@designopack.com'}`, {
```

Update mailto fallback:

```tsx
// FIND THIS (Line ~90):
const mailtoLink = `mailto:rastogimehak3845@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

// REPLACE WITH:
const companyEmail = import.meta.env.VITE_DESIGNOPACK_EMAIL || 'sales@designopack.com';
const mailtoLink = `mailto:${companyEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
```

#### **3.3 Contact.tsx**
Update the contact form fallback methods:

```tsx
// FIND FormSubmit URL (Line ~45):
const response = await fetch('https://formsubmit.co/rastogimehak3845@gmail.com', {

// REPLACE WITH:
const companyEmail = import.meta.env.VITE_DESIGNOPACK_EMAIL || 'sales@designopack.com';
const response = await fetch(`https://formsubmit.co/${companyEmail}`, {
```

Update mailto link:

```tsx
// FIND mailto link (Line ~65):
const mailtoLink = `mailto:rastogimehak3845@gmail.com?subject=...

// REPLACE WITH:
const companyEmail = import.meta.env.VITE_DESIGNOPACK_EMAIL || 'sales@designopack.com';
const mailtoLink = `mailto:${companyEmail}?subject=...
```

#### **3.4 Contact.tsx - Display Email**
Update the displayed contact email in the Contact page:

```tsx
// FIND THIS in the Contact info cards (Line ~180):
<p className="font-body text-muted-foreground text-sm">
  designopackindia@gmail.com
</p>

// REPLACE WITH:
<p className="font-body text-muted-foreground text-sm">
  sales@designopack.com
</p>
```

### **Step 4: Update EmailJS Configuration**

#### **4.1 Create New EmailJS Service**
The company will need to:
1. Create their own EmailJS account using their company email
2. Set up a new Gmail/Outlook service with their official email
3. Get new service credentials

#### **4.2 Update Environment Variables**
```env
# NEW EmailJS Configuration for Company
VITE_EMAILJS_SERVICE_ID=service_designopack_official
VITE_EMAILJS_TEMPLATE_ID=template_designopack_quotes
VITE_EMAILJS_PUBLIC_KEY=their_new_public_key
```

### **Step 5: Update Documentation**

Update all documentation files to reflect the new email:

- `EMAILJS_QUOTE_SETUP.md`
- `QUOTE_SYSTEM_SUMMARY.md`
- `README.md`
- Any other guides

---

## 🤖 **AUTOMATED HANDOVER SCRIPT**

Create a simple script to make the transition easier:

```bash
# handover-script.sh
#!/bin/bash

echo "🔄 DesignOPack Email Handover Script"
echo "Enter the company's official email address:"
read COMPANY_EMAIL

echo "Updating environment variables..."
sed -i "s/rastogimehak3845@gmail.com/$COMPANY_EMAIL/g" .env

echo "Updating source files..."
sed -i "s/rastogimehak3845@gmail.com/$COMPANY_EMAIL/g" src/components/QuoteModal.tsx
sed -i "s/rastogimehak3845@gmail.com/$COMPANY_EMAIL/g" src/pages/Contact.tsx
sed -i "s/designopackindia@gmail.com/$COMPANY_EMAIL/g" src/pages/Contact.tsx

echo "✅ Email handover complete!"
echo "⚠️  Remember to:"
echo "   1. Update EmailJS account with company credentials"
echo "   2. Test email delivery"
echo "   3. Update documentation"
```

---

## 📋 **HANDOVER CHECKLIST**

### **Before Handover**
- [ ] Get official company email addresses
- [ ] Get company's EmailJS account details (or help them set it up)
- [ ] Prepare transition timeline

### **During Handover**
- [ ] Update all email references in code
- [ ] Update environment variables
- [ ] Transfer EmailJS account or set up new one
- [ ] Update documentation
- [ ] Test email delivery thoroughly

### **After Handover**
- [ ] Verify all emails are being received by company
- [ ] Ensure admin team can access dashboard
- [ ] Provide training on admin panel usage
- [ ] Document any remaining passwords/credentials

---

## 🔐 **SECURITY CONSIDERATIONS**

### **Email Security**
- Ensure company email has proper SPF/DKIM records
- Set up email forwarding if needed for multiple recipients
- Configure email filters to prioritize quote requests

### **Access Management**
- Transfer admin login credentials
- Set up new admin accounts for company staff
- Remove your test accounts after handover

---

## 📞 **COMPANY SUPPORT**

### **What to Provide the Company**
1. **Complete codebase** with updated email addresses
2. **EmailJS setup guide** specific to their domain
3. **Admin panel training** documentation
4. **Emergency contact** for technical issues
5. **Source code documentation** for future developers

### **Recommended Company Setup**
- **Primary Email**: `sales@designopack.com` (for quotes)
- **Admin Email**: `admin@designopack.com` (for internal notifications)
- **Support Email**: `support@designopack.com` (for customer service)

---

## ⚡ **QUICK HANDOVER (5 Minutes)**

If you need to do this quickly:

1. **Replace all instances** of `rastogimehak3845@gmail.com` with company email
2. **Update `.env`** with new email variable
3. **Set up company EmailJS** account
4. **Test quote submission** to verify delivery
5. **Hand over admin credentials**

**That's it! The system will seamlessly work with their official email addresses.** 🎯
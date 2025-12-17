# Cloudflare Web Analytics Setup Guide

This guide walks you through setting up Cloudflare Web Analytics for bouncingleaf.com.

## Why Cloudflare Web Analytics?

- ✅ **Free forever** - No credit card required
- ✅ **Privacy-first** - No cookies, no personal data
- ✅ **GDPR/CCPA compliant** - No consent banner needed
- ✅ **Lightweight** - <1KB script, doesn't slow down your site
- ✅ **Easy setup** - Just add one script tag

## What You'll Get

**Metrics available:**
- Page views and unique visitors
- Top pages
- Referrers (where visitors come from)
- Countries
- Browsers and devices
- Operating systems
- Page load time (Core Web Vitals)

**Privacy guarantees:**
- No individual user tracking
- No personal data collected
- No IP address stored
- No cross-site tracking
- No cookies

---

## Setup Steps

### Step 1: Create Cloudflare Account (if you don't have one)

1. Go to https://cloudflare.com/
2. Click "Sign Up"
3. Enter email and create password
4. Verify email

**Note:** You don't need to transfer your domain to Cloudflare or change DNS. You can use Analytics standalone!

### Step 2: Add Website to Analytics

1. Log in to Cloudflare Dashboard
2. Click "Analytics & Logs" in left sidebar
3. Click "Web Analytics"
4. Click "Add a site"
5. Enter your domain: `bouncingleaf.com`
6. Choose "Automatic Setup" (recommended)
7. Click "Get Started"

### Step 3: Get Your Beacon Token

Cloudflare will show you a script tag that looks like this:

```html
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "YOUR_TOKEN_HERE"}'></script>
<!-- End Cloudflare Web Analytics -->
```

**Copy the entire script tag** - you'll need it for the next step.

### Step 4: Add Script to Your Site

1. Open `index.html` in your code editor
2. Find the `</head>` closing tag (around line 35)
3. Paste the Cloudflare script **just before** `</head>`
4. Save the file

**Example:**
```html
    <!-- Cloudflare Web Analytics -->
    <script defer src='https://static.cloudflareinsights.com/beacon.min.js'
            data-cf-beacon='{"token": "YOUR_ACTUAL_TOKEN_HERE"}'></script>
    <!-- End Cloudflare Web Analytics -->

    <title>Leaf's site</title>
  </head>
```

### Step 5: Commit and Deploy

```bash
git add index.html
git commit -m "Add Cloudflare Web Analytics"
git push
```

The site will automatically deploy to bouncingleaf.com.

### Step 6: Verify It's Working

1. Wait 2-3 minutes for deployment to complete
2. Visit https://bouncingleaf.com in your browser
3. Open browser dev tools (F12)
4. Go to Network tab
5. Look for request to `beacon.min.js` - should load successfully
6. Go back to Cloudflare Dashboard → Web Analytics
7. You should see your visit within 5-10 minutes

**Note:** Analytics can take up to 30 minutes to show first data.

---

## Viewing Your Analytics

**Accessing the dashboard:**
1. Log in to Cloudflare
2. Go to "Analytics & Logs" → "Web Analytics"
3. Select "bouncingleaf.com"

**Dashboard sections:**
- **Visitors** - Unique visitors over time
- **Page Views** - Total page views
- **Top Pages** - Most visited pages
- **Referrers** - Where traffic comes from
- **Countries** - Geographic distribution
- **Devices** - Desktop vs mobile vs tablet
- **Browsers** - Browser breakdown
- **Operating Systems** - OS distribution
- **Page Load Time** - Core Web Vitals

**Time ranges available:**
- Last 24 hours
- Last 7 days
- Last 30 days
- Custom date range

---

## Privacy & Compliance

### No Cookie Banner Required

Cloudflare Web Analytics:
- Uses the browser's [Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API)
- Does NOT set cookies
- Does NOT collect personal data
- Does NOT track individual users
- Strips IP addresses before processing

**GDPR Compliance:** ✅ No consent required (Recital 47, Article 6(1)(f))
**CCPA Compliance:** ✅ No personal information collected
**ePrivacy Directive:** ✅ No cookies = no consent needed

### What Gets Collected

**Collected (anonymized):**
- Page URLs (what pages people visit)
- Referrer (where they came from)
- User agent string (browser/device type)
- Country (based on IP, then IP is discarded)
- Page load timing

**NOT collected:**
- IP addresses (stripped immediately)
- Personal information
- Cross-site tracking data
- User identifiers
- Cookie data

---

## Troubleshooting

### Analytics Not Showing Data

**If no data appears after 30 minutes:**

1. **Check script is loading:**
   - Open https://bouncingleaf.com
   - Open browser dev tools (F12)
   - Go to Network tab
   - Look for `beacon.min.js` - should show status 200

2. **Check for script errors:**
   - Open Console tab in dev tools
   - Look for any JavaScript errors
   - Cloudflare script should load silently with no errors

3. **Verify token is correct:**
   - Check that you copied the full script tag
   - Token should be in `data-cf-beacon='{"token": "..."}'`

4. **Check browser extensions:**
   - Some ad blockers block analytics (including Cloudflare)
   - Try in incognito mode or different browser
   - Your real visitors won't have this issue (most don't use ad blockers)

5. **Verify deployment:**
   - Check GitHub Actions to ensure deployment succeeded
   - Visit the live site and view source (Ctrl+U)
   - Confirm the Cloudflare script appears in the HTML

### Common Issues

**Q: Script is blocked by Content Security Policy**
A: Update CSP in `.htaccess` to allow Cloudflare:
```apache
script-src 'self' https://static.cloudflareinsights.com;
```

**Q: Data shows but seems inaccurate**
A: Analytics can lag by 5-10 minutes. Wait and refresh.

**Q: I'm not seeing my own visits**
A: Some browsers/extensions block analytics. Try without extensions or in different browser.

---

## Alternative Analytics (If Needed)

If you later decide you want more detailed analytics, consider:

**Privacy-focused (paid):**
- [Plausible Analytics](https://plausible.io/) - $9/mo, beautiful UI
- [Fathom Analytics](https://usefathom.com/) - $14/mo, simple
- [Simple Analytics](https://simpleanalytics.com/) - $9/mo

**Self-hosted (free):**
- [Umami](https://umami.is/) - Open source, host on your own server
- [Matomo](https://matomo.org/) - More complex but feature-rich

**Traditional:**
- Google Analytics 4 - Free but requires cookie banner and privacy policy

---

## Next Steps

After analytics is working:
1. Check dashboard weekly to see traffic trends
2. Identify your most popular pages
3. See where visitors are coming from
4. Use data to inform content decisions

**Note:** Since this is a new site, expect low traffic initially. Analytics becomes more useful as you build an audience!

---

## Support

**Cloudflare Support:**
- Community: https://community.cloudflare.com/
- Docs: https://developers.cloudflare.com/analytics/web-analytics/

**This Project:**
- Issues: Check GitHub repository issues
- Ask Claude Code for help with implementation

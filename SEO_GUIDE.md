# Corbo Digital - SEO Implementation Guide

## ? What Has Been Added

### 1. Meta Tags (in `<head>`)
- **Title**: Optimized with keywords and location
- **Description**: 160 characters max, compelling and keyword-rich
- **Keywords**: Relevant terms for digital marketing in Quebec
- **Robots**: Allow indexing with rich snippets
- **Canonical URL**: Prevents duplicate content issues
- **Language alternates**: French/English support with hreflang

### 2. Open Graph Tags (Facebook, LinkedIn)
- og:title, og:description, og:image
- og:locale for French Canadian
- og:site_name for brand recognition

### 3. Twitter Card Tags
- Large image summary card
- Optimized for sharing on Twitter/X

### 4. Structured Data (JSON-LD Schema)
- **Organization**: Company info, logo, social profiles
- **LocalBusiness**: Location, hours, ratings
- **Service**: List of all services offered
- **WebSite**: Site information
- **BreadcrumbList**: Navigation structure

### 5. Technical SEO Files
- **robots.txt**: Controls crawler access
- **sitemap.xml**: Helps search engines discover pages

### 6. Performance Optimizations
- Preconnect to external resources
- DNS prefetch for analytics

---

## ?? REQUIRED ACTIONS (Do These!)

### 1. Create an OG Image (IMPORTANT!)
Create an image called `og-image.jpg` (1200x630 pixels) with:
- Corbo Digital logo
- Tagline or key message
- Brand colors (blue #103877, gold #D2A517)

### 2. Update Social Media Links
In `index.html`, replace `#` with actual social media URLs:
```html
<a href="https://www.instagram.com/corbodigital" aria-label="Instagram">
<a href="https://www.linkedin.com/company/corbodigital" aria-label="LinkedIn">
<a href="https://www.youtube.com/@corbodigital" aria-label="YouTube">
```

### 3. Add Google Analytics
Add before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 4. Add Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: corbodigital.com
3. Verify ownership (HTML file or DNS)
4. Submit sitemap: https://corbodigital.com/sitemap.xml

### 5. Add Phone Number
In the structured data, add your phone number:
```json
"telephone": "+1-514-XXX-XXXX"
```

### 6. Update Domain References
Replace `corbodigital.com` with your actual domain throughout:
- index.html (canonical, og:url, etc.)
- sitemap.xml
- robots.txt

---

## ?? Additional SEO Recommendations

### Google Business Profile
1. Create/claim your Google Business Profile
2. Add photos, services, hours
3. Encourage client reviews
4. Post updates regularly

### Content Strategy
- Add a blog section for fresh content
- Write articles about:
  - Marketing tips for Quebec businesses
  - Social media best practices
  - Case studies of client successes

### Backlinks
- Get listed in Quebec business directories
- Partner with complementary businesses
- Guest post on marketing blogs

### Local SEO
- Ensure NAP (Name, Address, Phone) is consistent everywhere
- Add location-specific landing pages if serving multiple cities
- Get reviews on Google, Facebook, Yelp

### Page Speed
- Compress images (use WebP format)
- Minify CSS/JS for production
- Use a CDN for static assets
- Enable GZIP compression on server

---

## ?? Testing Tools

Use these to verify SEO implementation:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
4. **Schema Validator**: https://validator.schema.org/
5. **PageSpeed Insights**: https://pagespeed.web.dev/
6. **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly

---

## ?? SEO Checklist

- [ ] Create og-image.jpg (1200x630)
- [ ] Update social media URLs
- [ ] Add Google Analytics
- [ ] Set up Google Search Console
- [ ] Submit sitemap
- [ ] Add phone number to structured data
- [ ] Create Google Business Profile
- [ ] Verify all structured data with testing tools
- [ ] Test Open Graph with Facebook debugger
- [ ] Run PageSpeed test and optimize
- [ ] Set up monthly ranking monitoring

---

## ?? Keywords to Target

**Primary Keywords:**
- Agence marketing numérique Montréal
- Marketing digital Québec
- Création de contenu entreprise
- Gestion médias sociaux Montréal

**Secondary Keywords:**
- Publicité Facebook Québec
- Publicité Instagram entreprise
- Site web PME Montréal
- Marketing PME Québec
- Agence TikTok Montréal
- Stratégie marketing digital

**Long-tail Keywords:**
- Agence de marketing numérique pour PME Montréal
- Création de contenu vidéo pour entreprises Québec
- Gestion complète des réseaux sociaux entreprise
- Publicité en ligne pour entrepreneurs Québec

# Technical Requirements Document: Freelance Portfolio
**Domain:** `alisalloum.tech`
**Role:** AI-Accelerated Full-Stack Architect

## 1. Client Background & Project Context
*(As provided in the initial project brief)*

The client is a programmer with 9 years of experience, beginning in 2017 with competitive programming (algorithmic foundation), learning Flutter in 2020, and earning a Computer Science degree. Past experience includes early front-end app work, Web3/crypto startup experience, and freelance machine learning/front-end projects (backed by Coursera AI/ML certificates). 

Currently, the client operates as a generalized "Backend Engineer" in Russia but effectively handles the entire tech stack. The goal of this project is to build a freelance portfolio to attract broader clientele. The primary marketing differentiator is the transparent, expert use of Generative AI and LLMs to execute *any* IT-related task (Frontend, Backend, AI) at high speeds, without compromising architectural integrity. The target audience spans Russian, English, and Arabic speakers.

## 2. Core Value Proposition & Positioning
The site must not present the client as a junior "prompt engineer" or a disorganized generalist. The positioning relies on this mathematical concept of developer productivity:

$$ \text{Total Value Delivered} = (\text{Deep System Knowledge}) \times \text{Generative AI Multiplier} $$

The narrative is: *AI writes the boilerplate faster, but the client's 9 years of competitive programming and CS background ensure the architecture is scalable, secure, and production-ready.*

## 3. Tech Stack & Infrastructure
Since the website is a portfolio piece, it should be built using modern, high-performance tools.

```text
Framework:    Next.js 14+ (App Router)
Styling:      Tailwind CSS
i18n:         next-intl (Static routing for En, Ru, Ar)
Content:      MDX files (For case studies/blog, no DB needed)
Hosting:      Vercel (Free, fast, seamless Next.js integration)
Analytics:    Plausible (or Vercel Web Analytics)
Forms:        Resend (Email API for the contact form)
```

## 4. Site Architecture
```text
/             (Home — Hero + Value Proposition + CTA)
/services     (Detailed service buckets)
/portfolio    (Anonymized case studies)
/about        (Narrative background)
/blog         (Optional, MDX-based, high SEO value)
/contact      (Form + communication preferences)
```

## 5. Page-by-Page Content Requirements

To keep this document easily readable, the specific requirements for each individual page have been grouped below. Expand each section for details.

<details open>
<summary><strong>🏠 Home Page (`/`)</strong></summary>

*   **Hero Section:** Client name, professional but approachable photo, tagline ("Building scalable software at the speed of AI"), and a primary CTA ("Start a Project").
*   **Service Highlights:** 3–4 brief cards linking to `/services`.
*   **Portfolio Teasers:** 2–3 highlights of the best work.
*   **Social Proof:** Mention the CS degree, 9 years of experience, ML/AI certificates, and core technologies.
*   **Footer CTA:** "Let's Talk" button at the bottom.
</details>

<details>
<summary><strong>⚙️ Services Page (`/services`)</strong></summary>

Group skills into 4 distinct business solution packages (Focus on what the client *gets*, not just the tech):
1.  **Backend & API Development:** REST/GraphQL, database design, microservices, server infrastructure.
2.  **Full-Stack Web Applications:** Complete apps, admin dashboards, SaaS products.
3.  **Mobile App Development:** Cross-platform apps (Flutter), backend integration.
4.  **AI/ML Integration & Automation:** Implementing LLMs into existing products, data pipelines, chatbots.

*Each service must include a typical timeline and a "Discuss this project" CTA.*
</details>

<details>
<summary><strong>📁 Portfolio Page (`/portfolio`)</strong></summary>

Due to NDAs and outdated code, rely heavily on **Anonymized Case Studies**. Focus on:
*   Architecture decisions made for current/past employers.
*   Scale/performance metrics (e.g., "Handled $X$ concurrent users").
*   How specific problems were solved structurally.
</details>

<details>
<summary><strong>👤 About Page (`/about`)</strong></summary>

Rewrite the background as a cohesive narrative, emphasizing the journey from competitive programming -> CS degree -> Web3/Flutter -> Full-Stack Systems Engineer.
*   Explicitly mention the use of modern AI-assisted workflows to deliver production-quality solutions across the entire stack much faster than traditional development.
*   Display Coursera ML/AI certificates.
</details>

## 6. Internationalization (i18n) & localization Considerations

The website must natively support English, Russian, and Arabic without relying on client-side translation widgets (which harm SEO).

<details open>
<summary><strong>🌍 Multi-language & RTL Technical Specs</strong></summary>

*   **Routing:** Set up `next-intl` to generate static routes (e.g., `/en/about`, `/ru/about`, `/ar/about`).
*   **Arabic RTL Layout:** 
    *   The HTML tag must dynamically switch attributes: `<html lang="ar" dir="rtl">`.
    *   Tailwind CSS has native RTL support. The AI code generator must use logical properties (e.g., `ms-4` for margin-start instead of `ml-4` for margin-left) so the layout flips automatically for Arabic.
    *   Thorough testing required for grids and flexboxes in RTL mode.
*   **Font Stacks:** Define optimized Web Fonts for Cyrillic (Russian) and Arabic scripts to ensure readable typography across all translations.
</details>

## 7. SEO & Architecture Checklist

Search Engine Optimization is critical for inbound leads. Search engines must be able to parse the site perfectly.

<details>
<summary><strong>🔍 Technical & Content SEO Requirements</strong></summary>

*   [ ] **Server-Side Rendering (SSR) / Static Site Generation (SSG):** Ensured by the Next.js tech stack.
*   [ ] **Responsive Design:** Mobile-first Tailwind implementation.
*   [ ] **Meta Data:** Dynamic `<title>` and `<meta name="description">` for every page.
*   [ ] **Open Graph (OG) Tags:** Ensure links look professional with preview images when shared on Telegram, WhatsApp, or LinkedIn.
*   [ ] **`hreflang` Tags:** Crucial for i18n routing so Google knows which language version to serve.
*   [ ] **Semantic HTML:** Proper hierarchy (`<h1>` to `<h6>`), semantic tags (`<header>`, `<main>`, `<article>`), and `alt` attributes on images.
*   [ ] **Auto-generated Files:** dynamically generated `sitemap.xml` and `robots.txt`.
*   [ ] **Schema.org Markup:** Implement JSON-LD for `Person` and `ProfessionalService` so Google understands exactly what services are offered.
*   [ ] **Keyword Strategy:** Optimize copy targeting localized terms (e.g., "freelance backend developer", "разработчик на заказ").
</details>

## 8. Trust Factors & Conversion Optimization

Small details separate amateur sites from highly converting professional portfolios. Ensure the AI incorporates these elements into the UI:

<details>
<summary><strong>💬 Trust & UX Checklist</strong></summary>

*   **Ubiquitous CTAs:** A call-to-action button should never be more than a scroll away.
*   **Response Time & Timezone:** Clear indication of availability (e.g., "Timezone: Moscow UTC+3 | Typical response time: < 12 hours").
*   **Preferred Communication:** Direct links to Telegram and professional Email. Link to GitHub and LinkedIn.
*   **Pricing Guidance:** Filter time-wasters by including a "Starting at \$X" or "Typical project size: \$X - \$Y" note on the services page.
*   **"How I Work" Section:** An infographic or step-by-step list (Discovery $\rightarrow$ Proposal $\rightarrow$ Architecture $\rightarrow$ Development $\rightarrow$ Delivery).
</details>

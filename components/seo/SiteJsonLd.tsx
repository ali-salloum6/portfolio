import { getSiteUrl, siteConfig } from "@/lib/site-config";

export function SiteJsonLd() {
  const url = getSiteUrl();
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    url,
    email: siteConfig.email,
    sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.telegram],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Innopolis University" },
    knowsLanguage: ["ar", "en", "ru"],
    knowsAbout: [
      "Backend engineering (Go, Python)",
      "LLM applications",
      "Platform and infrastructure",
      "Applied machine learning",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
    />
  );
}

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
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} — freelance engineering`,
    url,
    areaServed: ["Worldwide"],
    serviceType: [
      "Backend & API development",
      "Full-stack web applications",
      "Mobile app development (Flutter)",
      "AI/ML integration",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
    </>
  );
}

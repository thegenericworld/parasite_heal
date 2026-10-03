import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Men's Health Medications | ED Treatment & Sexual Wellness | ParasiteHeal",
  description: "Buy affordable FDA-approved medications for erectile dysfunction (ED), premature ejaculation, and men's sexual health. Discreet shipping, 95% success rate, trusted by 10,000+ men worldwide.",
  keywords: "erectile dysfunction treatment, ED medications, sildenafil, tadalafil, men's health, sexual wellness, premature ejaculation, generic viagra, generic cialis, affordable ED meds",
  openGraph: {
    title: "Men's Health Medications - Reclaim Your Confidence",
    description: "Discreet, affordable, and FDA-approved medications for ED and men's wellness. Save up to 90% on generic treatments.",
    type: 'website',
    images: [
      {
        url: '/mens-health-og.jpg',
        width: 1200,
        height: 630,
        alt: "Men's Health Medications",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Men's Health Medications | ParasiteHeal",
    description: "FDA-approved ED treatments at affordable prices. Discreet shipping worldwide.",
  },
  alternates: {
    canonical: 'https://ParasiteHeal.com/mens-health',
  },
};

export default function MensHealthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

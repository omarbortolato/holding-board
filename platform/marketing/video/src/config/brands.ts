// Config di branding per progetto. Un Marketing Manager di progetto passa
// "brandKey" nelle props della composizione per applicare colori/logo/font
// senza toccare il codice delle composizioni.

export type BrandConfig = {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  logoPath: string | null; // path relativo a assets/, es. "logos/herbalife.png"
  fontFamily: string;
};

export const brands: Record<string, BrandConfig> = {
  herbalife: {
    name: "Herbalife",
    primaryColor: "#00A651",
    secondaryColor: "#003399",
    textColor: "#FFFFFF",
    logoPath: "logos/herbalife.png",
    fontFamily: "Arial, sans-serif",
  },
  "ai-friday": {
    name: "AI Friday",
    primaryColor: "#111111",
    secondaryColor: "#F5A623",
    textColor: "#FFFFFF",
    logoPath: "logos/ai-friday.png",
    fontFamily: "Arial, sans-serif",
  },
  "omar-website": {
    name: "Omar Bortolato",
    primaryColor: "#1A1A2E",
    secondaryColor: "#E94560",
    textColor: "#FFFFFF",
    logoPath: "logos/omar-website.png",
    fontFamily: "Arial, sans-serif",
  },
};

export const getBrand = (brandKey: string): BrandConfig => {
  const brand = brands[brandKey];
  if (!brand) {
    throw new Error(
      `Brand "${brandKey}" non trovato in src/config/brands.ts. Brand disponibili: ${Object.keys(
        brands
      ).join(", ")}`
    );
  }
  return brand;
};

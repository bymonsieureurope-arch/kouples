export const homeCities: Record<string, { lat: number; lng: number }> = {
  Paris: { lat: 48.8566, lng: 2.3522 },
  Lyon: { lat: 45.764, lng: 4.8357 },
  Nice: { lat: 43.7102, lng: 7.262 },
  Bordeaux: { lat: 44.8378, lng: -0.5792 },
  Provence: { lat: 43.5297, lng: 5.4474 },
  Nantes: { lat: 47.2184, lng: -1.5536 },
};
export const coupleDetails = [
  {
    lat: 48.887,
    lng: 2.315,
    bio: "Léa est team déco chinée. Thomas est team playlist jusqu’au bout de la nuit.",
    interests: ["Nature", "Petits comités", "Cuisine"],
    preparation: 58,
  },
  {
    lat: 43.7102,
    lng: 7.262,
    bio: "Manon rêve d’un dîner sous les étoiles. Romain cherche déjà les meilleurs spots pour les photos.",
    interests: ["Voyage", "Photos", "Cuisine"],
    preparation: 64,
  },
  {
    lat: 43.5297,
    lng: 5.4474,
    bio: "Julie adore le fait maison. Maxime ne dit jamais non à une grande tablée entre amis.",
    interests: ["Nature", "Cuisine", "Petits comités"],
    preparation: 46,
  },
  {
    lat: 44.8378,
    lng: -0.5792,
    bio: "Chloé collectionne les idées originales. Hugo a déjà prévu de faire danser tout le monde.",
    interests: ["Danse", "Voyage", "Photos"],
    preparation: 37,
  },
];
export const interestChoices = [
  "Nature",
  "Cuisine",
  "Danse",
  "Photos",
  "Petits comités",
  "Voyage",
];
export function distanceKm(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
) {
  const rad = (n: number) => (n * Math.PI) / 180;
  const a =
    Math.sin(rad(to.lat - from.lat) / 2) ** 2 +
    Math.cos(rad(from.lat)) *
      Math.cos(rad(to.lat)) *
      Math.sin(rad(to.lng - from.lng) / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
}
export function distanceText(km: number) {
  return km < 1
    ? "À moins d’1 km de vous"
    : `À ~${Math.round(km).toLocaleString("fr-FR")} km de vous`;
}
export function creditAmount(months: number) {
  return Math.max(0, Math.floor(Number(months) || 0)) * 100;
}
export const providerPeople: Record<
  string,
  { name: string; role: string; portrait: number }
> = {
  monsieur: { name: "Hugo", role: "Co-fondateur", portrait: 0 },
  coach: { name: "Anaïs", role: "Coach & fondatrice", portrait: 1 },
  lucie: { name: "Lucie", role: "Photographe & fondatrice", portrait: 2 },
  fleurs: { name: "Camille", role: "Artisane fleuriste", portrait: 3 },
  lieu: { name: "Simon", role: "Gérant de la maison", portrait: 4 },
  photo: { name: "Émilie", role: "Photographe", portrait: 5 },
  robe: { name: "Claire", role: "Fondatrice", portrait: 6 },
  table: { name: "Mehdi", role: "Chef & fondateur", portrait: 7 },
  resto: { name: "Adrien", role: "Restaurateur", portrait: 8 },
  spa: { name: "Inès", role: "Fondatrice", portrait: 9 },
};
export const homeProviderIds = [
  "monsieur",
  "fleurs",
  "lieu",
  "table",
  "lucie",
  "coach",
];
export function interestPhrase(interest: string) {
  return (
    (
      {
        Nature: "la nature",
        Cuisine: "la cuisine",
        Danse: "la danse",
        Photos: "la photo",
        "Petits comités": "les petits comités",
        Voyage: "les voyages",
      } as Record<string, string>
    )[interest] || interest.toLowerCase()
  );
}

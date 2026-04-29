export type MockShippingOption = {
  id: string;
  label: string;
  description: string;
  detail: string;
  price: number;
};

export const mockShippingOptions: MockShippingOption[] = [
  {
    id: "fr-standard",
    label: "France standard",
    description: "Option douce pour un achat simple en France métropolitaine.",
    detail: "2 à 4 jours ouvrés estimés",
    price: 490
  },
  {
    id: "fr-tracked",
    label: "France suivie",
    description: "Suivi prioritaire pour garder un oeil sur la livraison.",
    detail: "1 à 3 jours ouvrés estimés",
    price: 690
  }
];

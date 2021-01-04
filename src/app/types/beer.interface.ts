export interface Beer {
  id: string;
  brewery: string;
  name: string;
  alcohol: number;
  description: string;
  ingredients: string;
  hints: string;
  beerType: string;
  originalWort: number;
  slogan?: string;
  website?: string;
  breweryIcon?: string;
  beerIcon?: string;
}

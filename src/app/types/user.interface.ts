import {BeerSelection} from './beer-selection.interface';

export interface User {
  id: string;
  beers: BeerSelection[];
}

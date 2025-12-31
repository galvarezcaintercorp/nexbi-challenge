export interface Pokemon {
  id: number;
  pokemonId: number;
  name: string;
  types: string[];
  image: string;
  hp: number;
  attack: number;
  defense: number;
  captureDate: Date;
  captureLocation: string;
  pokeballType: string;
  level: number;
  nickname?: string;
  description?: string;
}

import { Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list.component';
import { AddPokemonComponent } from './add-pokemon.component';

export const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'add', component: AddPokemonComponent }
];

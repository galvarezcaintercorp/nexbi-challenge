import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatBadgeModule],
  template: `
    <div class="container">
      <div class="header">
        <h1>Pokémon Trainer</h1>
        <div class="trainer-info">
          <div *ngIf="trainerName">
            <h2>{{ trainerName }}</h2>
          </div>
          <div *ngIf="!trainerName">
            <h2>No trainer</h2>
          </div>
          <div *ngIf="capturedPokemons">
            <div *ngIf="capturedPokemons.length > 0">
              <p class="count">Pokémon capturados: {{ capturedPokemons.length }}</p>
            </div>
            <div *ngIf="capturedPokemons.length === 0">
              <p class="count">No has capturado ningún Pokémon</p>
            </div>
          </div>
        </div>
      </div>

      <div class="actions">
        <button mat-raised-button color="primary" (click)="navigateToAdd()">
          <mat-icon>add</mat-icon>
          Capturar Pokémon
        </button>
      </div>

      <div class="pokemon-grid">
        <mat-card *ngFor="let pokemon of capturedPokemons" class="pokemon-card" (click)="viewPokemonDetails(pokemon)">
          <div class="card-content">
            <div class="card-left">
              <div class="card-header">
                <div class="type-badges">
                  <span *ngFor="let type of pokemon.types" 
                        [class]="'type-badge type-' + type.toLowerCase()">
                    {{ type }}
                  </span>
                </div>
                <div class="pokemon-number">#{{ pokemon.pokemonId.toString().padStart(3, '0') }}</div>
              </div>
              <h2 class="pokemon-name">{{ pokemon.name }}</h2>
              <div class="capture-info">
                <p><strong>Capturado:</strong> {{ formatDate(pokemon.captureDate) }}</p>
                <p *ngIf="pokemon.captureLocation"><strong>Lugar:</strong> {{ pokemon.captureLocation }}</p>
                <p *ngIf="pokemon.pokeballType"><strong>Pokéball:</strong> {{ pokemon.pokeballType }}</p>
                <p *ngIf="pokemon.level"><strong>Nivel:</strong> {{ pokemon.level }}</p>
                <p *ngIf="pokemon.nickname" class="nickname"><strong>Apodo:</strong> {{ pokemon.nickname }}</p>
              </div>
            </div>
            <div class="card-right">
              <img [src]="pokemon.image" [alt]="pokemon.name">
            </div>
          </div>
        </mat-card>
      </div>

      <div *ngIf="capturedPokemons.length === 0" class="empty-state">
        <mat-icon>catching_pokemon</mat-icon>
        <h3>No tienes Pokémon capturados</h3>
        <p>¡Comienza tu aventura capturando tu primer Pokémon!</p>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    .header {
      margin-bottom: 30px;
      text-align: center;
    }

    .trainer-info {
      margin-top: 10px;
    }

    .count {
      font-size: 18px;
      color: #666;
    }

    .actions {
      margin-bottom: 20px;
      text-align: center;
    }

    .pokemon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .pokemon-card {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      border-radius: 12px;
      overflow: hidden;
    }

    .pokemon-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    }

    .card-content {
      display: flex;
      padding: 20px;
      gap: 20px;
      min-height: 180px;
    }

    .card-left {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    .type-badges {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .type-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: capitalize;
      color: white;
    }

    .type-grass { background: #9BCC50; }
    .type-poison { background: #B97FC9; }
    .type-fire { background: #FD7D24; }
    .type-water { background: #4592C4; }
    .type-electric { background: #EED535; color: #333; }
    .type-normal { background: #A4ACAF; }
    .type-fighting { background: #D56723; }
    .type-flying { background: #3DC7EF; }
    .type-ground { background: #AB9842; }
    .type-rock { background: #A38C21; }
    .type-bug { background: #729F3F; }
    .type-ghost { background: #7B62A3; }
    .type-steel { background: #9EB7B8; }
    .type-psychic { background: #F366B9; }
    .type-ice { background: #51C4E7; }
    .type-dragon { background: #53A4CF; }
    .type-dark { background: #707070; }
    .type-fairy { background: #FDB9E9; color: #333; }

    .pokemon-number {
      font-size: 16px;
      font-weight: 700;
      color: #666;
    }

    .pokemon-name {
      font-size: 28px;
      font-weight: 700;
      color: #333;
      margin: 0 0 12px 0;
      text-transform: capitalize;
    }

    .capture-info {
      flex: 1;
    }

    .capture-info p {
      margin: 6px 0;
      font-size: 13px;
      color: #666;
      line-height: 1.5;
    }

    .capture-info .nickname {
      color: #2196F3;
      font-style: italic;
    }

    .card-right {
      width: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-right img {
      width: 100%;
      height: auto;
      object-fit: contain;
      image-rendering: pixelated;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #666;
    }

    .empty-state mat-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: #ccc;
    }
  `]
})
export class PokemonListComponent {
  trainerName: any = 'Ash Ketchum';
  capturedPokemons: any = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // Lógica mezclada en el componente
    this.loadTrainerData();
    this.loadCapturedPokemons();
  }

  loadTrainerData() {
    // Simulación de carga de datos
    // En el código real, aquí habría llamadas HTTP directas
  }

  loadCapturedPokemons() {
    // Acceso directo a localStorage en componente - mala práctica
    const stored = localStorage.getItem('capturedPokemons');
    if (stored) {
      this.capturedPokemons = JSON.parse(stored);
    } else {
      this.capturedPokemons = [];
    }
  }

  navigateToAdd() {
    this.router.navigate(['/add']);
  }

  viewPokemonDetails(pokemon: any) {
    // Mala práctica: Sin implementación real
    console.log('Ver detalles de', pokemon.name);
    // Aquí debería navegar a una vista de detalles
  }

  formatDate(date: any) {
    // Lógica de formateo en componente - mala práctica
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  }

  capturePokemon(pokemon: any) {
    // Lógica de negocio en el componente
    const newPokemon = {
      id: Date.now(),
      name: pokemon.name,
      types: pokemon.types,
      image: pokemon.image,
      hp: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      level: Math.floor(Math.random() * 100) + 1,
      captureDate: new Date().toLocaleDateString(),
      captureLocation: 'Unknown'
    };
    this.capturedPokemons.push(newPokemon);
  }

  editPokemon(id: any) {
    // Más lógica en el componente
    const pokemon = this.capturedPokemons.find((p: any) => p.id === id);
    if (pokemon) {
      // Editar...
    }
  }

  deletePokemon(id: any) {
    // Más lógica en el componente
    this.capturedPokemons = this.capturedPokemons.filter((p: any) => p.id !== id);
  }

  getPokemonCount() {
    if (this.capturedPokemons) {
      return this.capturedPokemons.length;
    }
    return 0;
  }
}

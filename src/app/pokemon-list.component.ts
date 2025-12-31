import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          Capturar Pokémon
        </button>
      </div>

      <div class="pokemon-grid">
        <div *ngFor="let pokemon of capturedPokemons">
          <mat-card class="pokemon-card">
            <mat-card-header>
              <mat-card-title>{{ pokemon.name }}</mat-card-title>
              <mat-card-subtitle>
                <span *ngFor="let type of pokemon.types">
                  {{ type }}
                </span>
              </mat-card-subtitle>
            </mat-card-header>
            <img mat-card-image [src]="pokemon.image" [alt]="pokemon.name">
            <mat-card-content>
              <div class="stats">
                <div *ngIf="pokemon.hp">
                  <p>HP: {{ pokemon.hp }}</p>
                </div>
                <div *ngIf="pokemon.attack">
                  <p>Attack: {{ pokemon.attack }}</p>
                </div>
                <div *ngIf="pokemon.defense">
                  <p>Defense: {{ pokemon.defense }}</p>
                </div>
              </div>
              <div class="capture-info">
                <p>Level: {{ pokemon.level }}</p>
                <p>Captured: {{ pokemon.captureDate }}</p>
                <p>Location: {{ pokemon.captureLocation }}</p>
              </div>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button color="primary">Ver Detalles</button>
              <button mat-button color="accent">Editar</button>
              <button mat-button color="warn">Liberar</button>
            </mat-card-actions>
          </mat-card>
        </div>
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
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .pokemon-card {
      height: 100%;
    }

    .pokemon-card img {
      height: 200px;
      object-fit: contain;
    }

    .stats {
      display: flex;
      gap: 15px;
      margin-bottom: 10px;
    }

    .stats div {
      flex: 1;
    }

    .capture-info p {
      margin: 5px 0;
      font-size: 14px;
      color: #666;
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

    mat-card-subtitle span {
      display: inline-block;
      margin-right: 8px;
      padding: 2px 8px;
      background: #e0e0e0;
      border-radius: 12px;
      font-size: 12px;
    }
  `]
})
export class PokemonListComponent {
  trainerName: any = 'Ash Ketchum';
  capturedPokemons: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Lógica mezclada en el componente
    this.loadTrainerData();
  }

  loadTrainerData() {
    // Simulación de carga de datos
    // En el código real, aquí habría llamadas HTTP directas
    this.capturedPokemons = [];
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

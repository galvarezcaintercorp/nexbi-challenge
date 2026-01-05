import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-pokemon',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <p class="subtitle">Busca y captura un Pokémon</p>
      </div>

      <div class="search-bar">
        <input 
          type="text" 
          placeholder="search eg. ditto or pikachu"
          [(ngModel)]="searchTerm"
          (ngModelChange)="onSearchChange()">
        <div *ngIf="suggestions.length > 0" class="suggestions">
          <div *ngFor="let suggestion of suggestions" 
               class="suggestion-item"
               (click)="selectPokemon(suggestion)">
            <span class="suggestion-number">#{{ suggestion.id }}</span>
            <span class="suggestion-name">{{ suggestion.name }}</span>
          </div>
        </div>
      </div>

      <div *ngIf="loading" class="loading">
        <p>Buscando...</p>
      </div>

      <div *ngIf="error" class="error-message">
        <mat-icon>error</mat-icon>
        <p>{{ error }}</p>
      </div>

      <div *ngIf="pokemonFound && !showCaptureForm" class="pokemon-preview">
        <mat-card>
          <div class="preview-content">
            <div class="preview-info">
              <div class="pokemon-number">#{{ pokemonFound.id.toString().padStart(3, '0') }}</div>
              <h2>{{ pokemonFound.name }}</h2>
              <div class="type-badges">
                <span *ngFor="let type of pokemonFound.types" 
                      [class]="'type-badge type-' + type.toLowerCase()">
                  {{ type }}
                </span>
              </div>
              <div class="stats-preview">
                <div class="stat">
                  <span class="stat-label">HP</span>
                  <span class="stat-value">{{ pokemonFound.hp }}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Attack</span>
                  <span class="stat-value">{{ pokemonFound.attack }}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Defense</span>
                  <span class="stat-value">{{ pokemonFound.defense }}</span>
                </div>
              </div>
              <button mat-raised-button color="primary" (click)="showCaptureForm = true">
                <mat-icon>catching_pokemon</mat-icon>
                Capturar este Pokémon
              </button>
            </div>
            <img [src]="pokemonFound.image" [alt]="pokemonFound.name" class="preview-image">
          </div>
        </mat-card>
      </div>

      <div *ngIf="showCaptureForm" class="capture-form">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Datos de Captura</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <form [formGroup]="captureForm">
              <mat-form-field appearance="outline">
                <mat-label>Lugar de captura</mat-label>
                <input matInput formControlName="captureLocation" placeholder="Ej: Bosque Verde">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Tipo de Pokéball</mat-label>
                <mat-select formControlName="pokeballType">
                  <mat-option value="Pokéball">Pokéball</mat-option>
                  <mat-option value="Superball">Superball</mat-option>
                  <mat-option value="Ultraball">Ultraball</mat-option>
                  <mat-option value="Masterball">Masterball</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Nivel</mat-label>
                <input matInput type="number" formControlName="level" min="1" max="100">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Apodo (opcional)</mat-label>
                <input matInput formControlName="nickname">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Notas (opcional)</mat-label>
                <textarea matInput formControlName="description" rows="3"></textarea>
              </mat-form-field>
            </form>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button (click)="cancelCapture()">Cancelar</button>
            <button mat-raised-button color="primary" (click)="capturePokemon()">
              Guardar Captura
            </button>
          </mat-card-actions>
        </mat-card>
      </div>

      <div class="back-button">
        <button mat-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          Volver a la lista
        </button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 900px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    .header {
      margin-bottom: 20px;
      text-align: center;
    }

    .subtitle {
      color: #666;
      font-size: 18px;
      margin: 0;
    }

    .search-bar {
      max-width: 700px;
      margin: 0 auto 40px;
      position: relative;
    }

    .search-bar input {
      width: 100%;
      padding: 16px 24px;
      border: none;
      border-radius: 50px;
      font-size: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      outline: none;
      background: white;
    }

    .search-bar input::placeholder {
      color: #999;
    }

    .suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      margin-top: 8px;
      max-height: 300px;
      overflow-y: auto;
      z-index: 100;
    }

    .suggestion-item {
      padding: 12px 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: background 0.2s;
    }

    .suggestion-item:hover {
      background: #f5f5f5;
    }

    .suggestion-number {
      color: #999;
      font-size: 14px;
      font-weight: 600;
    }

    .suggestion-name {
      color: #333;
      font-size: 16px;
      text-transform: capitalize;
    }

    .loading {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .error-message {
      background: #ffebee;
      color: #c62828;
      padding: 20px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }

    .pokemon-preview {
      margin-bottom: 30px;
    }

    .pokemon-preview mat-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .preview-content {
      display: flex;
      padding: 30px;
      gap: 30px;
      align-items: center;
    }

    .preview-info {
      flex: 1;
    }

    .pokemon-number {
      font-size: 14px;
      color: #999;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .preview-info h2 {
      font-size: 32px;
      font-weight: 700;
      color: #333;
      margin: 0 0 12px 0;
      text-transform: capitalize;
    }

    .type-badges {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .type-badge {
      padding: 6px 16px;
      border-radius: 16px;
      font-size: 13px;
      font-weight: 600;
      text-transform: capitalize;
    }

    .type-grass { background: #9BCC50; color: white; }
    .type-poison { background: #B97FC9; color: white; }
    .type-fire { background: #FD7D24; color: white; }
    .type-water { background: #4592C4; color: white; }
    .type-electric { background: #EED535; color: #333; }
    .type-normal { background: #A4ACAF; color: white; }
    .type-fighting { background: #D56723; color: white; }
    .type-flying { background: #3DC7EF; color: white; }
    .type-ground { background: #AB9842; color: white; }
    .type-rock { background: #A38C21; color: white; }
    .type-bug { background: #729F3F; color: white; }
    .type-ghost { background: #7B62A3; color: white; }
    .type-steel { background: #9EB7B8; color: white; }
    .type-psychic { background: #F366B9; color: white; }
    .type-ice { background: #51C4E7; color: white; }
    .type-dragon { background: #53A4CF; color: white; }
    .type-dark { background: #707070; color: white; }
    .type-fairy { background: #FDB9E9; color: #333; }

    .stats-preview {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-label {
      font-size: 12px;
      color: #999;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: #333;
    }

    .preview-image {
      width: 200px;
      height: 200px;
      object-fit: contain;
      image-rendering: pixelated;
    }

    .capture-form {
      margin-bottom: 30px;
    }

    .capture-form mat-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .capture-form mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }

    mat-card-actions {
      padding: 16px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    .back-button {
      text-align: center;
      margin-top: 30px;
    }
  `]
})
export class AddPokemonComponent implements OnInit {
  searchTerm: any = '';
  pokemonFound: any = null;
  loading = false;
  error: any = null;
  showCaptureForm = false;
  captureForm: FormGroup;
  pokemonList: any[] = [];
  suggestions: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Mala práctica: Sin tipado fuerte
    this.captureForm = this.fb.group({
      captureLocation: [''],
      pokeballType: ['Pokéball'],
      level: [1],
      nickname: [''],
      description: ['']
    });
  }

  ngOnInit() {
    this.http.get('https://pokeapi.co/api/v2/pokemon?limit=500')
      .subscribe({
        next: (data: any) => {
          this.pokemonList = data.results.map((p: any, index: number) => ({
            id: index + 1,
            name: p.name
          }));
        },
        error: () => {
        }
      });
  }

  onSearchChange() {
    if (!this.searchTerm) {
      this.suggestions = [];
      this.pokemonFound = null;
      this.error = null;
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.suggestions = this.pokemonList
      .filter(p => p.name.startsWith(searchLower) || p.id.toString() === searchLower)
      .slice(0, 8);
  }

  selectPokemon(pokemon: any) {
    this.searchTerm = pokemon.name;
    this.suggestions = [];
    this.searchPokemon();
  }

  searchPokemon() {
    if (!this.searchTerm) {
      this.error = 'Por favor ingresa un nombre o número de Pokémon';
      return;
    }

    this.loading = true;
    this.error = null;
    this.pokemonFound = null;

    this.http.get(`https://pokeapi.co/api/v2/pokemon/${this.searchTerm.toLowerCase()}`)
      .subscribe({
        next: (data: any) => {
          this.pokemonFound = {
            id: data.id,
            pokemonId: data.id,
            name: data.name,
            types: data.types.map((t: any) => t.type.name),
            image: data.sprites.other['official-artwork'].front_default,
            hp: data.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0,
            attack: data.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0,
            defense: data.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0
          };
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.error = 'No se encontró el Pokémon. Intenta con otro nombre o número.';
        }
      });
  }

  capturePokemon() {
    const capturedPokemon = {
      id: Date.now(),
      ...this.pokemonFound,
      captureDate: new Date(),
      captureLocation: this.captureForm.value.captureLocation,
      pokeballType: this.captureForm.value.pokeballType,
      level: this.captureForm.value.level,
      nickname: this.captureForm.value.nickname,
      description: this.captureForm.value.description
    };

    const stored = localStorage.getItem('capturedPokemons');
    const pokemons = stored ? JSON.parse(stored) : [];
    pokemons.push(capturedPokemon);
    localStorage.setItem('capturedPokemons', JSON.stringify(pokemons));

    this.router.navigate(['/']);
  }

  cancelCapture() {
    this.showCaptureForm = false;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}

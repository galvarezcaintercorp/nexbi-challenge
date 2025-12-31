import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokedex(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon?limit=100000&offset=0`);
  }

  getPokemonDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${id}`);
  }

  searchPokemon(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${name.toLowerCase()}`);
  }
}

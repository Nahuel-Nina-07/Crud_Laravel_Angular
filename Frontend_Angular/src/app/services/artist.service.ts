import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  crearArtista(nuevoArtista: any): Observable<any> {
    const createUrl = `${this.apiUrl}/api/crear`;
    return this.http.post(createUrl, nuevoArtista);
  }

  obtenerArtistas(): Observable<any[]> {
    const listUrl = `${this.apiUrl}/artistas`;
    return this.http.get<any[]>(listUrl);
  }

  obtenerArtistaPorId(artistId: string): Observable<any> {
    const getUrl = `${this.apiUrl}/artistas/${artistId}`;
    return this.http.get<any>(getUrl);
  }

  eliminarArtista(id: string): Observable<any> {
    const url = `${this.apiUrl}/artistas/${id}`;
    return this.http.delete(url);
  }

  actualizarArtista(id: string, datosActualizados: any): Observable<any> {
    const url = `${this.apiUrl}/artistas/${id}`;
    return this.http.put(url, datosActualizados);
  }
}

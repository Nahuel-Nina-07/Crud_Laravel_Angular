import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = 'http://localhost:8000/api/api';

  constructor(private http: HttpClient) {}

  crearAlbum(nuevoAlbum: any): Observable<any> {
    const createUrl = `${this.apiUrl}/crearalbum`;
    return this.http.post(createUrl, nuevoAlbum);
  }

  obtenerAlbumes(): Observable<any[]> {
    const listUrl = `${this.apiUrl}/albumes`;
    return this.http.get<any[]>(listUrl);
  }

  obtenerAlbumPorId(albumId: string): Observable<any> {
    const getUrl = `${this.apiUrl}/albumes/${albumId}`;
    return this.http.get<any>(getUrl);
  }

  eliminarAlbum(id: string): Observable<any> {
    const url = `${this.apiUrl}/albumes/${id}`;
    return this.http.delete(url);
  }

  actualizarAlbum(id: string, datosActualizados: any): Observable<any> {
    const url = `${this.apiUrl}/albumes/${id}`;
    return this.http.put(url, datosActualizados);
  }
}

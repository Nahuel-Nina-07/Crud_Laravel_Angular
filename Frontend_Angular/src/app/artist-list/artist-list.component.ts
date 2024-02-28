import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistService } from '../services/artist.service';

@Component({
  selector: 'app-artist-list',
  template: `
<div class="container mt-4">
  <h2 class="text-center mb-4">Listado de Artistas</h2>

  <div class="d-flex justify-content-between align-items-center mb-3">
    <div>
      <input type="text" class="form-control" [(ngModel)]="idABuscar" (ngModelChange)="buscarPorId()" placeholder="Buscar por ID">
    </div>
    <div>
      <button class="btn btn-primary btn-sm" (click)="navegarACrear()">Crear Nuevo Artista</button>
      <button class="btn btn-success btn-sm ms-2" (click)="navegarAAlbumes()">Álbumes</button>
    </div>
  </div>

  <ng-container *ngIf="artists.length > 0; else noUsuarios">
    <ul class="list-group mt-3 rounded">
      <li *ngFor="let artist of artists" class="list-group-item mb-3 rounded">
        <div class="row">
          <div class="col-md-6">
            <h5>{{ artist.nombre }} {{ artist.apellido }}</h5>
            <p><strong>Nacionalidad:</strong> {{ artist.nacionalidad }}</p>
            <p><strong>Fecha de Nacimiento:</strong> {{ artist.fecha_nacimiento | date: 'dd/MM/yyyy' }}</p>
            <p><strong>Género:</strong> {{ artist.genero }}</p>
          </div>
          <div class="col-md-6 d-flex align-items-center justify-content-center mt-md-0 mt-3">
            <button class="btn btn-info me-2" (click)="navegarAEditar(artist.id)">
              <i class="bi bi-pencil"></i> Editar
            </button>
            <button class="btn btn-danger" (click)="eliminarArtista(artist.id)">
              <i class="bi bi-trash"></i> Eliminar
            </button>
          </div>
        </div>
      </li>
    </ul>
  </ng-container>

  <ng-template #noUsuarios>
    <p>No existe ese usuario.</p>
  </ng-template>

  <ng-template #noUsuarioConId>
    <p>No hay usuarios registrados aún.</p>
  </ng-template>
</div>
`,
})
export class ArtistListComponent implements OnInit {
  artists: any[] = [];
  idABuscar: string = '';

  constructor(private artistService: ArtistService, private router: Router) {}

  navegarACrear() {
    this.router.navigate(['/artist-create']);
  }

  navegarAEditar(id: string) {
    const artistaEncontrado = this.artists.find(artist => artist.id === id);
    if (artistaEncontrado) {
      this.router.navigate(['/artist-edit', id]);
    } else {
      alert('No se encontró al artista con el ID proporcionado.');
    }
  }
  

  ngOnInit() {
    this.listarArtistas();
  }

  listarArtistas() {
    this.artistService.obtenerArtistas().subscribe(
      (response: any[]) => {
        this.artists = response;
      },
      (error: any) => {
        console.error('Error al obtener la lista de artistas', error);
      }
    );
  }

  buscarPorId() {
    if (this.idABuscar.trim() !== '') {
      this.artistService.obtenerArtistaPorId(this.idABuscar).subscribe(
        (artista: any) => {
          this.artists = [artista];
        },
        (error: any) => {
          if (error.status === 404) {
            this.mostrarMensajeNoUsuarioConId();
          } else {
            console.error('Error al buscar el artista por ID', error);
          }
        }
      );
    } else {
      this.limpiarBusqueda();
    }
  }

  limpiarBusqueda() {
    this.listarArtistas();
  }

  mostrarMensajeNoUsuarioConId() {
    this.artists = [];
  }

  eliminarArtista(id: string) {
    const artistaSeleccionado = this.artists.find(artist => artist.id === id);
  
    if (!artistaSeleccionado) {
      alert('Artista no encontrado.');
      return;
    }
  

    if (artistaSeleccionado.albumes && artistaSeleccionado.albumes.length > 0) {
      const confirmacionEliminar = confirm('Este artista tiene álbumes asociados. ¿Estás seguro de eliminarlo? Se eliminarán también los álbumes.');
  
      if (!confirmacionEliminar) {
        return;
      }
    }
  
    this.artistService.eliminarArtista(id).subscribe(
      () => {
        this.listarArtistas();
      },
      (error: any) => {
        console.error('Error al eliminar el artista', error);
      }
    );
  }

  navegarAAlbumes() {
    this.router.navigate(['/album-list']);
  }
}

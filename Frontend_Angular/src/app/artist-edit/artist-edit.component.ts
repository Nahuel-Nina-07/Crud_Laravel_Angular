import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistService } from '../services/artist.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css'],
})
export class ArtistEditComponent implements OnInit {
  id: string = ''; 
  artista: any = {}; 
  idArtista: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private router: Router,
    private toastr: ToastrService,
    private titleService: Title 
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('ID del Artista:', this.id);
      this.obtenerDatosArtista();
    });
  }

  obtenerDatosArtista() {
    this.artistService.obtenerArtistaPorId(this.id).subscribe(
      (artista: any) => {
        this.artista = artista;
      },
      (error: any) => {
        console.error('Error al obtener datos del artista', error);
      }
    );
  }

  guardarCambios(): void {
    this.artistService.actualizarArtista(this.artista.id, this.artista).subscribe(
      (response) => {
        console.log('Artista actualizado exitosamente', response);
        this.toastr.success('Artista actualizado exitosamente', 'Éxito', {
          timeOut: 1000  
        });
        this.titleService.setTitle('¡Artista actualizado!');
        this.router.navigate(['/artist-list']);
      },
      (error) => {
        console.error('Error al actualizar el artista', error);
        this.toastr.error('Error al actualizar el artista', 'Error');
      }
    );
  }
  
  formularioValido(): boolean {
    return this.artista.nombre && this.artista.apellido && this.artista.genero &&
          this.artista.fecha_nacimiento && this.artista.nacionalidad;
  }
}

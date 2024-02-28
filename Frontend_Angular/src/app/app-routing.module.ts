import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistCreateComponent } from './artist-create/artist-create.component';
import { ArtistEditComponent } from './artist-edit/artist-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { AlbumEditComponent } from './album-edit/album-edit.component';

const routes: Routes = [
  { path: 'artistas', component: ArtistListComponent },
  { path: 'crear-artista', component: ArtistCreateComponent },
  { path: 'artist-edit/:id', component: ArtistEditComponent },
  { path: 'album-list', component: AlbumListComponent },
  { path: 'album-create', component: AlbumCreateComponent },
  {path: 'album-edit/:id', component: AlbumEditComponent},
  { path: '**', redirectTo: '/artistas', pathMatch: 'full' },
  { path: '', redirectTo: '/artistas', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],

})
export class AppRoutingModule { }
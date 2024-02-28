import { RouterModule, Routes } from '@angular/router';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistCreateComponent } from './artist-create/artist-create.component';
import { ArtistEditComponent } from './artist-edit/artist-edit.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { AlbumEditComponent } from './album-edit/album-edit.component';

const routes: Routes = [
    { path: 'artist-list', component: ArtistListComponent },
    { path: 'artist-create', component: ArtistCreateComponent },
    { path: 'artist-edit/:id', component: ArtistEditComponent },
    { path: 'album-list', component: AlbumListComponent },
    { path: 'album-create', component: AlbumCreateComponent},
    { path: 'album-edit/:id', component: AlbumEditComponent},
    { path: '', redirectTo: '/artist-list', pathMatch: 'full' },
    { path: '**', redirectTo: '/artist-list', pathMatch: 'full' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);

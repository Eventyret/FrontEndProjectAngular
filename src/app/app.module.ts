import { HttpModule } from '@angular/http';
import { SeriesService } from './services/series.service';
import { MovieService } from './services/movies.service';
import { OmdbService } from './services/omdb.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TruncateModule } from 'ng2-truncate';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingleDisplayComponent } from './single-display/single-display.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFound404Component } from './page-not-found-404/page-not-found-404.component';
import { CapitalizePipe } from './trim.pipe';

const appRoutes: Routes = [
  {path: '', component: MovieListComponent},
  {path: 'info', component:SingleDisplayComponent},
  {path: '404', component: PageNotFound404Component}
]

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    SingleDisplayComponent,
    PageNotFound404Component,
    CapitalizePipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    TruncateModule,
    RouterModule.forRoot(appRoutes),

  ],
  providers: [
    OmdbService,
    MovieService,
    SeriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

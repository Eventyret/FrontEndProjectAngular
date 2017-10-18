import { HttpModule } from '@angular/http';
import { SeriesService } from './services/series.service';
import { MoviesService } from './services/movies.service';
import { OmdbService } from './services/omdb.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    OmdbService,
    MoviesService,
    SeriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpModule } from '@angular/http';
import { SeriesService } from './services/series.service';
import { MovieService } from './services/movies.service';
import { OmdbService } from './services/omdb.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    
  ],
  providers: [
    OmdbService,
    MovieService,
    SeriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

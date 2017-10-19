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

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    SingleDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    TruncateModule
    
  ],
  providers: [
    OmdbService,
    MovieService,
    SeriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

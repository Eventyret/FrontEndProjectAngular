import { SearchService } from './services/search.service';
import { MoviesComponent } from './components/movies/movies.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TruncateModule } from 'ng2-truncate';
import { AppComponent } from './app.component';
import { MovieService } from './services/movie.service';
import { SearchComponent } from './components/search/search.component';
@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TruncateModule
  ],
  providers: [MovieService,
  SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }

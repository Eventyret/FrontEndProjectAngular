import { MoviesComponent } from './components/movies/movies.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TruncateModule } from 'ng2-truncate';
import { AppComponent } from './app.component';
import { MovieService } from './services/movie.service';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TruncateModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

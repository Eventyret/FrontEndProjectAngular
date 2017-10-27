import { FanartService } from './services/fanart.service';
import { HttpModule } from '@angular/http';
import { SearchService } from './services/search.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TruncateModule } from 'ng2-truncate';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingleDisplayComponent } from './components/single-display/single-display.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFound404Component } from './components/page-not-found-404/page-not-found-404.component';
import { CapitalizePipe } from './capitalize.pipe';
import { ScrollToModule } from 'ng2-scroll-to-el';
import { CardStyleComponent } from './components/card-style/card-style.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  { path: '', component: CardStyleComponent},
  {path: 'list-view', component: MovieListComponent},
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
    CardStyleComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    TruncateModule,
    RouterModule.forRoot(appRoutes),
    ScrollToModule.forRoot(),
    NgbModule.forRoot()

  ],
  providers: [
    SearchService,
    FanartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

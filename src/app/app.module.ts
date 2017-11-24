import { FanartService } from './services/fanart.service';
import { HttpModule } from '@angular/http';
import { SearchService } from './services/search.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TruncateModule } from 'ng2-truncate';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingleDisplayComponent } from './pages/info-page/info-page';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFound404Component } from './pages/page-not-found-404/page-not-found-404.component';
import { CapitalizePipe } from './capitalize.pipe';
import { CardStyleComponent } from './pages/search-page/search-page';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PostersComponent } from './info-components/posters/posters.component';
import { PlotComponent } from './info-components/plot/plot.component';
import { IntroHeaderComponent } from './info-components/intro-header/intro-header.component';
import { MoviefactsComponent } from './info-components/moviefacts/moviefacts.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
const appRoutes: Routes = [
  { path: '', component: CardStyleComponent},
  {path: 'info', component:SingleDisplayComponent},
  {path: '404', component: PageNotFound404Component}
]

@NgModule({
  declarations: [
    AppComponent,
    SingleDisplayComponent,
    PageNotFound404Component,
    CapitalizePipe,
    CardStyleComponent,
    LoadingSpinnerComponent,
    PostersComponent,
    PlotComponent,
    IntroHeaderComponent,
    MoviefactsComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
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
    SearchService,
    FanartService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

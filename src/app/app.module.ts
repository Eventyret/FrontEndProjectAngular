import { TmdbService } from "./shared/services/tmdb.service";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { TruncateModule } from "ng2-truncate";
import { BsModalService, ModalModule, RatingModule } from "ngx-bootstrap";

import { AppComponent } from "./app.component";
import { CapitalizePipe } from "./capitalize.pipe";
import { DetailsViewComponent } from "./DetailsPage/components/details-view/details-view.component";
import { MovieDetailsComponent } from "./HomePage/components/movieDetails/movieDetails.component";
import { CardStyleComponent } from "./HomePage/components/search-page/search-page";
import { SearchService } from "./HomePage/services/search.service";
import { IntroHeaderComponent } from "./info-components/intro-header/intro-header.component";
import { PageNotFoundComponent } from "./PageNotFound/components/page-not-found/page-not-found";
import { QuotesService } from "./PageNotFound/services/quotes.service";
import { SingleDisplayComponent } from "./pages/info-page/info-page";
import { FanartService } from "./services/fanart.service";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { LoadingSpinnerComponent } from "./shared/components/loading-spinner/loading-spinner.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

const appRoutes: Routes = [
	{ path: "", component: CardStyleComponent },
	{ path: "details/:id/:slug", component: DetailsViewComponent},
	{ path: "info", component: SingleDisplayComponent },
	{ path: "**", component: PageNotFoundComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		SingleDisplayComponent,
		PageNotFoundComponent,
		CapitalizePipe,
		CardStyleComponent,
		LoadingSpinnerComponent,
		IntroHeaderComponent,
		FooterComponent,
		HeaderComponent,
		NavbarComponent,
		MovieDetailsComponent,
		DetailsViewComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		BrowserAnimationsModule,
		TruncateModule,
		RouterModule.forRoot(appRoutes),
		ModalModule.forRoot(),
		RatingModule.forRoot()
	],
	providers: [SearchService, FanartService, QuotesService, BsModalService, TmdbService],
	entryComponents: [MovieDetailsComponent],
	bootstrap: [AppComponent]
})
export class AppModule {}

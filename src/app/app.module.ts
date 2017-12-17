import { FanartService } from "./services/fanart.service";
import { HttpClientModule } from "@angular/common/http";
import { SearchService } from "./services/search.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { TruncateModule } from "ng2-truncate";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SingleDisplayComponent } from "./pages/info-page/info-page";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found";
import { CapitalizePipe } from "./capitalize.pipe";
import { CardStyleComponent } from "./pages/search-page/search-page";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { PostersComponent } from "./info-components/posters/posters.component";
import { PlotComponent } from "./info-components/plot/plot.component";
import { IntroHeaderComponent } from "./info-components/intro-header/intro-header.component";
import { MoviefactsComponent } from "./info-components/moviefacts/moviefacts.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ErrorHandler } from "@angular/core";
import { QuotesService } from "./services/quotes.service";
import { ModalModule, BsModalService } from "ngx-bootstrap";
import { ModalComponent } from "./components/modal/modal.component";


const appRoutes: Routes = [
	{ path: "", component: CardStyleComponent },
	{ path: "info", component: SingleDisplayComponent },
	{ path: "not-found", component: PageNotFoundComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		SingleDisplayComponent,
		PageNotFoundComponent,
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
		ModalComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		BrowserAnimationsModule,
		TruncateModule,
		RouterModule.forRoot(appRoutes),
		ModalModule.forRoot()
	],
	providers: [SearchService, FanartService, QuotesService, BsModalService],
	entryComponents: [ModalComponent],
	bootstrap: [AppComponent]
})
export class AppModule {}

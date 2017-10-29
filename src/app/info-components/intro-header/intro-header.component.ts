import { Component, OnInit } from '@angular/core';
import { FanartService } from './../../services/fanart.service';

@Component({
  selector: 'intro-header',
  templateUrl: './intro-header.component.html',
	styleUrls: ['../../pages/info-page/info-page.css','./intro-header.component.css']
})
export class IntroHeaderComponent implements OnInit {
	// Single outputs from arrays
	backgroundimage: string;
	artwork: any[];
	posters: any[];
	errorMsg: string;
	showSpinner: boolean = true;
	Title: string;
	imdbID: string = sessionStorage.getItem('imdbID');
	type: string = sessionStorage.getItem('type');

  constructor(private fanartService: FanartService) {
	this.fanartService.getArt(this.imdbID).subscribe(artwork => {
	  this.artwork = artwork;
	  this.posters = artwork.movieposter;
	  this.backgroundimage = artwork.moviebackground[0].url;
		document.getElementById("page-top").style.backgroundImage = "url('" + this.backgroundimage + "')";
		this.showSpinner = true;
	},
	  (error) => {
		console.log(error)
		this.errorMsg = error["error message"];
		if (this.errorMsg == "Not found") {
		  this.errorMsg = this.Title;
			document.getElementById("page-top").style.backgroundColor = "#2C3E50";
			this.showSpinner = true;
		  /* document.getElementById("hdlogo").setAttribute ('src', "../../../assets/1pxtrans.png"); */
		}
	  },
	  () => {
		console.log("Fanart Loading Complete")
		  this.showSpinner = false;
	  })
   }

  ngOnInit() {
		let inCollection = JSON.parse(localStorage.getItem("inCollection"));
		if (sessionStorage.getItem("inCollection") === null) {
			inCollection = false;
		} else {
			inCollection = true;
		}
		console.log(inCollection)
  }

}
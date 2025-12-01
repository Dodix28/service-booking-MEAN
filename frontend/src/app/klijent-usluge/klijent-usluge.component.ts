import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UslugaService } from '../services/usluga.service';
import { Usluga } from '../models/usluga';
import { NgForOf } from "@angular/common";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-klijent-usluge',
  standalone: true,
  imports: [RouterModule, NgForOf,FormsModule,  CommonModule],
  templateUrl: './klijent-usluge.component.html',
  styleUrl: './klijent-usluge.component.css'
})
export class KlijentUslugeComponent {

    constructor(private router: Router, private uslugaService:UslugaService){}

    ngOnInit(): void {
      this.uslugaService.dohvatiSveUsluge().subscribe((u: Usluga[]) => {
        if( u != null) {
          this.sveUsluge = u;
          this.prikazaneUsluge = u;
        }
      })
  }

  sveUsluge : Usluga[] = [];
  prikazaneUsluge: Usluga[] = [];

   //sort
  sortOption: string = "";
  porukaGreske: string = "";
  pretraga:string ="";

  /*----------------------------poseti uslugu------------------------- */

  selectedUsluga: number = 0;

  posetiUslugu(id: number){
    this.selectedUsluga = id;
    localStorage.setItem('selectedUslugaId',JSON.stringify(this.selectedUsluga));
  }

/*---------------------------pretraga------------------------------ */
  pretrazi(){
    this.filtriraj();
   }

   filtriraj(){
    this.prikazaneUsluge = this.sveUsluge.filter
    (firma =>
      firma.naziv.toLowerCase().includes(this.pretraga.toLocaleLowerCase()));
   }

   prikaziSve(){
    this.prikazaneUsluge = this.sveUsluge;
   }


  /*----------------------------sortiranje---------------------------- */
  sortiraj(){
    if(this.sortOption == ""){
      this.porukaGreske = "Niste odabrali parametar za sortiranje!"
      return
    }
    this.porukaGreske ="";
    switch(this.sortOption){
      case 'nazivRastuce':
        this.sortirajNazivRastuce();
        break;
      case 'nazivOpadajuce':
        this.sortirajNazivOpadajuce();
        break;
      case 'cenaRastuce':
        this.sortirajCenaRastuce();
        break;
      case 'cenaOpadajuce':
        this.sortirajCenaOpadajuce();
        break;
      default:
        break;
    }
  }
  sortirajNazivRastuce(){
    this.sveUsluge.sort((a,b) => {
      if(a.naziv < b.naziv){
        return -1;
      } else if(a.naziv > b.naziv) {
        return 1;
      } else return 0;
    })
  }
  sortirajNazivOpadajuce(){
    this.sveUsluge.sort((a,b) => {
      if(a.naziv < b.naziv){
        return 1;
      } else if(a.naziv > b.naziv) {
        return -1;
      } else return 0;
    })
  }

  sortirajCenaRastuce(){
    this.sveUsluge.sort((a,b) => {
      if(a.cena < b.cena){
        return -1;
      } else if(a.cena > b.cena) {
        return 1;
      } else return 0;
    })
  }
  sortirajCenaOpadajuce(){
    this.sveUsluge.sort((a,b) => {
      if(a.cena < b.cena){
        return 1;
      } else if(a.cena > b.cena) {
        return -1;
      } else return 0;
    })
  }


}

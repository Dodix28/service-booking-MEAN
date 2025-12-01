import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {  FormsModule} from '@angular/forms';
import { RezervacijaService } from '../services/rezervacija.service';
import { Korisnik } from '../models/user';
import { UserService } from '../services/user.service';
import { Rezervacija } from '../models/rezervacija';


@Component({
  selector: 'app-klijent-rezervacije',
  standalone: true,
  imports: [CommonModule,
    FormsModule,RouterModule
  ],
  templateUrl: './klijent-rezervacije.component.html',
  styleUrl: './klijent-rezervacije.component.css'
})
export class KlijentRezervacijeComponent {

  constructor(private rezervacijaService:RezervacijaService,private userService: UserService){}

   ngOnInit(): void {
    let u = localStorage.getItem('ulogovan');
    if(u != null){
         this.ulogovan = JSON.parse(u);

     }
    this.rezervacijaService.dohvatiRezervacijuZaKlijenta(this.ulogovan.kor_ime).subscribe((rez: Rezervacija[]) => {
      if(rez!= null){
        rez.forEach((r:Rezervacija) =>{
          this.mojeRezervacije.push(r);
          if(r.status == "na cekanju" || r.status =="prihvaceno"){
            this.aktuelneRezervacije.push(r);
          } else if(r.status == "zavrseno"){
            this.arhivaRezervacije.push(r);
          }
        })

      }
    })
   }

   ulogovan: Korisnik = new Korisnik();
   mojeRezervacije: Rezervacija[] = [];
   aktuelneRezervacije: Rezervacija[] = [];
   arhivaRezervacije: Rezervacija[] = [];

}

import { Component } from '@angular/core';
import { Korisnik } from '../models/user';
import { Rezervacija } from '../models/rezervacija';
import { RezervacijaService } from '../services/rezervacija.service';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabelaComponent } from '../tabela/tabela.component';

@Component({
  selector: 'app-korisnik-rezervacije-aktuelno',
  standalone: true,
  imports: [CommonModule,
      FormsModule,TabelaComponent ],
  templateUrl: './korisnik-rezervacije-aktuelno.component.html',
  styleUrl: './korisnik-rezervacije-aktuelno.component.css'
})
export class KorisnikRezervacijeAktuelnoComponent {

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
          this.prikazaneRezervacije = this.aktuelneRezervacije.slice(0, 5);

        }
      })
     }

     aktuelneRezervacije: Rezervacija[] = [];
     prikazaneRezervacije: Rezervacija[] = [];

     ulogovan: Korisnik = new Korisnik();
     mojeRezervacije: Rezervacija[] = [];
     arhivaRezervacije: Rezervacija[] = [];


}

import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ZahtevService } from '../services/zahtev.service';
import { Korisnik } from '../models/user';
import { Rezervacija } from '../models/rezervacija';
import { RezervacijaService } from '../services/rezervacija.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabelaComponent } from '../tabela/tabela.component';
import { KalendarComponent } from '../kalendar/kalendar.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RezervacijaDijalogComponent } from '../rezervacija-dijalog/rezervacija-dijalog.component';
import { MatButtonModule } from '@angular/material/button';
;



@Component({
  selector: 'app-kozmeticar-rezervacije',
  standalone: true,
  imports: [CommonModule,
        FormsModule,TabelaComponent, KalendarComponent,FullCalendarModule, MatDialogModule,
    MatButtonModule],
  templateUrl: './kozmeticar-rezervacije.component.html',
  styleUrl: './kozmeticar-rezervacije.component.css'
})
export class KozmeticarRezervacijeComponent {

  constructor(private userService: UserService, private zahtevService: ZahtevService, private rezervacijaService: RezervacijaService,
    private dialog: MatDialog
  ){}

        ngOnInit(): void {
        let k = localStorage.getItem('ulogovan');
        if(k != null){
          this.ulogovan = JSON.parse(k);
        }

         this.mojeRezervacije_na_cekanju = [];
        this.mojeRezervacije_sve = [];

        this.rezervacijaService.dohvatiSveRezervacije_za_kozmeticara(this.ulogovan.kor_ime).subscribe((r: Rezervacija[]) => {
          if(r != null){
            this.mojeRezervacije_sve = r;
            this.mojeRezervacije_sve.forEach((rez: Rezervacija) => {
              if(rez.status == "na cekanju"){
                this.mojeRezervacije_na_cekanju.push(rez);
              }
            })
             this.prikazaneRezervacije = this.mojeRezervacije_na_cekanju.slice(0, 5);
              this.sortiraj();
              this.osveziKalendar();
          }
        })

      }

      calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin],
        events: [],

        height: 'auto',
        aspectRatio: 1.5,
        contentHeight: 'auto',
        expandRows: false,
        weekends: true,
        eventDisplay: 'block',
        eventClick: this.onEventClick.bind(this),

      };

      onEventClick(info: any) {
        console.log('Kliknuti event:', info.event);
          const rezervacija = this.mojeRezervacije_na_cekanju.find(r => r.idR === Number(info.event.id));
          console.log('rezervacija event:', rezervacija);
          if (rezervacija) {
            console.log('usli smo u if');
          const dialogRef = this.dialog.open(RezervacijaDijalogComponent, {
            width: '400px',
             height: '300px',
            data: rezervacija
          });

          dialogRef.afterClosed().subscribe(result => {
            if(result === 'potvrdi') {
              this.prihvati(rezervacija);
            } else if(result === 'odbij') {
              this.odbij(rezervacija);
            }
          });
        }
      }

ulogovan: Korisnik = new Korisnik();
mojeRezervacije_sve: Rezervacija[] =[];
mojeRezervacije_na_cekanju: Rezervacija[] =[];
prikazaneRezervacije: Rezervacija[] =[];


komentar: string = "";
poruka: string = "";



 sortiraj(){
    this.prikazaneRezervacije.sort((a,b) => {
      if(a.datumZakazivanja<b.datumZakazivanja){
        return -1;
      } else if(a.datumZakazivanja>b.datumZakazivanja){
        return 1
      } else return 0;
    })
  }

/* ------------------------------------- KALENDAR --------------------------------------- */

  osveziKalendar() {
    // mapiranje podataka iz baze u FullCalendar event format
    this.calendarOptions.events = this.mojeRezervacije_na_cekanju.map(r => ({
      id: r.idR.toString(),
      title: `${r.nazivPodusluge} - ${r.klijent}`,
      date: this.convertDate(r.datumZakazivanja),
      color: r.status === 'na cekanju' ? '#ff00c85d' : '#4d1d4ece'
    }));
  }

    convertDate(dateStr: string): string {
  // očekuje "DD-MM-YYYY" → vraća "YYYY-MM-DD"
  const [day, month, year] = dateStr.split('-');
  return `${year}-${month}-${day}`;
}

/* ================================== prihvati/odbij ================================= */

prihvati(r: Rezervacija){
  this.rezervacijaService.prihvatiRezervaciju(r.idR).subscribe((rez: Rezervacija) => {
    if(rez){
      alert("Uspesno prihvaceno");
      this.ngOnInit();

    } else{
      alert("Greska pri prihvatanju rezervacije");
    }
  })
}

odbij(r: Rezervacija){
  if(this.komentar == ""){
    this.poruka = "Unesite komentar odbijenice!"
    return;
  }
  this.poruka = "";
  this.rezervacijaService.odbijRezervaciju(r.idR,this.komentar).subscribe((rez: Rezervacija) => {
    if(rez){
       alert("Uspesno odbijeno");
       this.komentar = "";
      this.ngOnInit();
    } else{
      alert("Greska pri prihvatanju rezervacije");
      this.komentar = "";
    }
  })

}


}

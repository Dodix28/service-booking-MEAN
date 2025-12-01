import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import { RezervacijaService } from '../services/rezervacija.service';
import { Rezervacija } from '../models/rezervacija';
import { Korisnik } from '../models/user';


@Component({
  selector: 'app-kalendar',
  standalone: true,
  imports: [ FullCalendarModule],
  templateUrl: './kalendar.component.html',
  styleUrl: './kalendar.component.css'
})
export class KalendarComponent {

  constructor(private rezervacijeService:RezervacijaService){}

      ngOnInit(): void {
        let u = localStorage.getItem('ulogovan');
        if(u != null){
          this.ulogovan = JSON.parse(u);
        }

        this.rezervacijeService.dohvatiSveRezervacije_za_kozmeticara(this.ulogovan.kor_ime).subscribe((r: Rezervacija[]) => {
          if(r){
            this.rezervacije = r;
          }
        })

         console.log('Rezervacije:', this.rezervacije);
      console.log('Eventi:', this.rezervacije.map(r => ({
        id: r.idR.toString(),
        title: `${r.nazivPodusluge} - ${r.klijent}`,
        date: this.convertDate(r.datumZakazivanja),
        color: r.status === 'na čekanju' ? '#FFD700' : '#32CD32'
      })));
      // sad ažuriraš kalendar
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.rezervacije.map(r => ({
        id: r.idR.toString(),
        title: `${r.nazivPodusluge} - ${r.klijent}`,
        date: this.convertDate(r.datumZakazivanja),
        color: r.status === 'na čekanju' ? '#FFD700' : '#32CD32'
      }))
    };



    }



rezervacije: Rezervacija[] = [] ;
ulogovan: Korisnik = new Korisnik();

  /*rezervacije = [
    { id: '1', title: 'Masaža - Ana', date: '2025-10-18', status: 'pending' },
    { id: '2', title: 'Manikir - Marija', date: '2025-10-19', status: 'accepted' },
  ];*/

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: this.rezervacije.map(r => ({
      id: r.idR.toString(),
      title: r.nazivPodusluge,
      date: this.convertDate(r.datumZakazivanja),
      color: r.status === 'na cekanju' ? '#FFD700' : '#32CD32'
    })),
    eventClick: this.onEventClick.bind(this),
  };

  onEventClick(info: any) {
    const rezervacija = this.rezervacije.find(r => r.idR === info.event.id);
    if (rezervacija) {
      alert(
        `Rezervacija: ${rezervacija.nazivPodusluge}\nDatum: ${rezervacija.datumZakazivanja}\nStatus: ${rezervacija.status}`
      );
    }
  }

  convertDate(dateStr: string): string {
  // očekuje "DD-MM-YYYY" → vraća "YYYY-MM-DD"
  const [day, month, year] = dateStr.split('-');
  return `${year}-${month}-${day}`;
}




}

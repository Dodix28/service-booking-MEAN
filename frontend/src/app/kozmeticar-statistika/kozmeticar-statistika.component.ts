import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RezervacijaService } from '../services/rezervacija.service';
import { Rezervacija } from '../models/rezervacija';
import { Korisnik } from '../models/user';
import { Chart , ChartConfiguration} from 'chart.js/auto';
import { Kozmeticar } from '../models/kozmeticar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-kozmeticar-statistika',
  standalone: true,
  imports: [],
  templateUrl: './kozmeticar-statistika.component.html',
  styleUrl: './kozmeticar-statistika.component.css'
})
export class KozmeticarStatistikaComponent {
@ViewChild('barChart', { static: false }) barChart!: ElementRef<HTMLCanvasElement>;
  chart: Chart | undefined;


  constructor(private userService: UserService, private rezervacijaService: RezervacijaService){}

  ngAfterViewInit(): void {
    let k = localStorage.getItem('ulogovan');
    if(k != null){
      this.ulogovan = JSON.parse(k);
    }

    this.rezervacijaService.dohvatiSveRezervacije_za_kozmeticara(this.ulogovan.kor_ime)
      .subscribe((rez: Rezervacija[]) => {
        this.sve = rez;
        this.sveRezervacije = rez.filter(r => r.status === 'prihvaceno');
        this.initChart(); // sad je barChart sigurno dostupan
      });
  }

  ulogovan: Korisnik = new Korisnik();

  //chart1
  sveRezervacije: Rezervacija[] = [];
  sve: Rezervacija[] = [];

  initChart() {
    const brojPoMesecima = this.combineAndCountByMonth(this.sveRezervacije);
    console.log('broj po mesecima. initChart', brojPoMesecima)

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Broj poslova',
            data: brojPoMesecima,
            backgroundColor: '#f7c6c7' // puder roze
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: ''
          }
        }
      }
    };

    this.chart = new Chart(this.barChart.nativeElement, config);
  }

  /*combineAndCountByMonth(rezervacije: Rezervacija[]) {
    const countByMonth = Array(12).fill(0);
    rezervacije.forEach(r => {
      const datum = new Date(r.datumZakazivanja);
      console.log('datum', datum);
      const mesec = datum.getMonth(); // 0-11
      countByMonth[mesec]++;
    });
    return countByMonth;
  }*/
 combineAndCountByMonth(rezervacije: Rezervacija[]) {
  const countByMonth = Array(12).fill(0);

  rezervacije.forEach(r => {
    const [dan, mesec, godina] = r.datumZakazivanja.split('-').map(Number);
    const datum = new Date(godina, mesec - 1, dan); // mesec 0–11

    const m = datum.getMonth();
    countByMonth[m]++;
  });

  return countByMonth;
}


  createBarChart(brojPoslova: number[]) {
    this.chart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'],
        datasets: [{
          label: 'Broj rezervacija po mesecima za kozmeticara',
          data: brojPoslova, // podaci
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


}

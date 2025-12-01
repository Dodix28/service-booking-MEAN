import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Korisnik } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-klijent',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './klijent.component.html',
  styleUrl: './klijent.component.css'
})
export class KlijentComponent {

  constructor(private router: Router){}

ngOnInit(): void {
  let k = localStorage.getItem('ulogovan');
  if(k != null){
    this.ulogovan = JSON.parse(k);
  }
}

ulogovan: Korisnik = new Korisnik();

  odjava(){
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
   
  }

}

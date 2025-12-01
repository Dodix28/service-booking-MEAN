import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Korisnik } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kozmeticar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './kozmeticar.component.html',
  styleUrl: './kozmeticar.component.css'
})
export class KozmeticarComponent {

    constructor(private router: Router){}

     odjava(){
    localStorage.removeItem('ulogovan');
    this.router.navigate(['']);
  }

}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ZahtevService } from '../services/zahtev.service';
import { UserService } from '../services/user.service';
import { Korisnik } from '../models/user';
import { UslugaService } from '../services/usluga.service';
import { Usluga } from '../models/usluga';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-usluge',
  standalone: true,
  imports: [FormsModule,  CommonModule,RouterModule],
  templateUrl: './admin-usluge.component.html',
  styleUrl: './admin-usluge.component.css'
})
export class AdminUslugeComponent {

  constructor(private zahtevService:ZahtevService, private userService:UserService,
    private uslugaService:UslugaService
  ){}


  ngOnInit(): void {

     this.uslugaService.dohvatiSveUsluge().subscribe((u: Usluga[]) => {
          if( u != null) {
            this.sveUsluge = u;

          }
        })

  }

  sveUsluge : Usluga[] = [];
;

  selectedUsluga: number = 0;

  posetiUslugu(id: number){
    this.selectedUsluga = id;
    localStorage.setItem('selectedUslugaId',JSON.stringify(this.selectedUsluga));
  }


}

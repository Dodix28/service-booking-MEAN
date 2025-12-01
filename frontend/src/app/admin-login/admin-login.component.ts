import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Korisnik } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  constructor(private router:Router, private userService: UserService){}
    //login podaci
    kor_ime: string="";
    lozinka: string="";
    porukaLogin: string="";

    login(){
      if(this.kor_ime == "" || this.lozinka == ""){
          this.porukaLogin = "Niste uneli sve podatke,pokusajte ponovo.";
          return;
      } else {
        this.porukaLogin ="";
      }

      this.userService.login(this.kor_ime,this.lozinka).subscribe((korisnik: Korisnik) =>{

       if(!korisnik){
        this.porukaLogin = "Losi podaci, ovakav korisnik ne postoji u sistemu.";
        return;
      } else {
        this.porukaLogin = "";
        localStorage.setItem('ulogovan',JSON.stringify(korisnik));
        if(korisnik.tip == 'kozmeticar' || korisnik.tip == 'klijent'){
           this.porukaLogin = "Klijent i radnik se loguju preko zasebne forme."
        } else {
          this.router.navigate(['admin'])
        }
      }
      })
    }

}

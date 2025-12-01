import { Component , ElementRef, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Korisnik } from '../models/user';
import { Router } from '@angular/router';
import { ZahtevService } from '../services/zahtev.service';
import { Zahtev } from '../models/zahtev';
import { CommonModule } from '@angular/common';
import { Kozmeticar } from '../models/kozmeticar';
import { Usluga } from '../models/usluga';
import { UslugaService } from '../services/usluga.service';
import { NgForOf } from "@angular/common";
import { RouterModule } from '@angular/router';

import { SliderComponent } from '../slider/slider.component';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,  CommonModule,RouterModule, NgForOf,SliderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    @ViewChild('ciljniDiv', { static: false }) ciljniDiv!: ElementRef;


  constructor(private router:Router, private userService: UserService, private zahtevService: ZahtevService,
    private uslugaService:UslugaService
  ){}

    ngOnInit(): void {
      this.userService.dohvatiKozmeticare().subscribe((kozmeticari:Korisnik[]) => {
        if(kozmeticari != null){
          kozmeticari.forEach((k: Korisnik) => {
             this.sviKozmeticari.push(k);
          })
        }
      })

       this.userService.dohvatiKlijente().subscribe((klijenti:Korisnik[]) => {
        if(klijenti != null){
          klijenti.forEach((k: Korisnik) => {
             this.sviKlijenti.push(k);
          })
        }
      })

      this.uslugaService.dohvatiSveUsluge().subscribe((u: Usluga[]) => {
        if( u != null) {
          this.sveUsluge = u;
          this.prikazaneUsluge = u;
        }
      })

    }


  //login podaci
  kor_ime: string="";
  lozinka: string="";
  porukaLogin: string="";

  //registracija podaci
  kor_ime_reg: string="";
  lozinka_reg: string="";
  ime_reg: string="";
  prezime_reg: string="";
  pol_reg: string="";
  adresa_reg: string="";
  kontakt_reg: string="";
  mejl_reg: string="";
  //kartica_reg: string="";
  cardType: string = "";
  selectedFile: File | null = null;

  porukaReg: string="";
  porukaLozinka: string="";
  porukaMejl: string="";
  porukaKontakt: string="";
  //porukaKartica: string="";


//neregistrovani korisnici - podaci
sviKlijenti: Korisnik[] = [];
sviKozmeticari: Korisnik[] = [];
sveUsluge: Usluga[] = [];
prikazaneUsluge: Usluga[] = [];

//sort
sortOption: string = "";
porukaGreske: string = "";
pretraga:string ="";

//prikaz "registruj se" prozora
registracijaFlag: boolean = false;
poslatZahtevFlag: boolean = false;
naCekanju:boolean = false;

postaviFlag(flag: boolean){
  this.registracijaFlag =flag;
  this.porukaLogin = "";
  this.porukaReg = "";
  this.porukaMejl = "";
  this.porukaLozinka = "";
  this.porukaKontakt = "";
  if(flag == true ){
    this.naCekanju = false;
  }

  this.kor_ime = "";
  this.lozinka = "";

  this.kor_ime_reg = "";
  this.lozinka_reg = "";
  this.prezime_reg = "";
  this.ime_reg = "";
  this.pol_reg = "";
  this.adresa_reg = "";
  this.kontakt_reg = "";
  this.mejl_reg = "";
}

resetZahtevFlag(){
  this.poslatZahtevFlag = false;
}

resetNaCekanju(){
  this.naCekanju = false;
}

 /*----------------------------poseti uslugu------------------------- */

  selectedUsluga: number = 0;

  posetiUslugu(id: number){
    this.selectedUsluga = id;
    localStorage.setItem('selectedUslugaId',JSON.stringify(this.selectedUsluga));
  }


  /* ---------------------------login-------------------------------- */


  login(){
    if(this.kor_ime == "" || this.lozinka == ""){
        this.porukaLogin = "Niste uneli sve podatke, pokušajte ponovo.";
        return;
    } else {
      this.porukaLogin ="";
    }

    this.userService.login(this.kor_ime,this.lozinka).subscribe((korisnik: Korisnik) =>{
      this.zahtevService.dohvatiKorIme(this.kor_ime).subscribe((zahtev:Zahtev) => {
        if(!zahtev && !korisnik){
          this.porukaLogin = "Loši podaci, ovakav korisnik ne postoji u sistemu.";
          return;
        } else if(zahtev){
          this.porukaLogin = "Vaš zahtev je na čekanju i uskoro će biti obrađen. Hvala na strpljenju! ✨";
          return;
        }
      })

      if(korisnik) {
      this.porukaLogin = "";
      localStorage.setItem('ulogovan',JSON.stringify(korisnik));
      if(korisnik.tip == 'kozmeticar'){
        this.router.navigate(['kozmeticar'])
      } else if(korisnik.tip == 'klijent'){
        this.router.navigate(['klijent'])
      } else {
        this.porukaLogin = "Admin se mora ulogovati preko zasebne forme."
      }
    }
    })
  }


  //kontakt moze imati 9 ili 10 cifata
  formatKontakt(): boolean {
    let f =  /^[0-9]{9,10}$/;
    if(f.test(this.kontakt_reg) == true){
      this.porukaKontakt ='';
      return true;
    }
    this.porukaKontakt = "Unesite ispravan broj telefona!"
    return false;
  }

  //ime_korisnika@primer.com
  formatMejl(): boolean{
    let f = /^\w{3,}\@[a-zA-Z_]+\.[a-zA-Z]+$/;
    if(f.test(this.mejl_reg) == true){
      this.porukaMejl= '';
      return true;
    }
    this.porukaMejl = "Email mora biti u formatu kor_ime@primer.com, pokušajte ponovo!"
    return false;
  }

   /*formatKartica(): boolean {
    let f = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/; //Diners
    let g = /^(51|52|53|54|55)\d{14}$/; //MasterCard
    let h = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/; // Visa
    if(f.test(this.kartica_reg) == true){
      this.porukaKartica ="Kartica Diners";
      return true;
    }
    if(g.test(this.kartica_reg) == true){
      this.porukaKartica ="Kartica MasterCard";
      return true;
    }
    if(h.test(this.kartica_reg) == true){
      this.porukaKartica ="Kartica Visa";
      return true;
    }
    this.porukaKartica = "Niste ispravo uneli podatke za karticu!"
    this.cardType = '';
    return false;
  }

  cardImage(){
    this.porukaKartica = ""
    this.cardType = '';

    let f = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/; //Diners
    let g = /^(51|52|53|54|55)\d{14}$/; //MasterCard
    let h = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/; // Visa

    if(f.test(this.kartica_reg) == true){
      this.porukaKartica ="Kartica Diners";
      this.cardType = 'Diners';
    }
    if(g.test(this.kartica_reg) == true){
      this.porukaKartica ="Kartica MasterCard";
      this.cardType = 'MasterCard';
    }
    if(h.test(this.kartica_reg) == true){
      this.porukaKartica ="Kartica Visa";
      this.cardType = 'Visa';
    }
  }*/

  formatLozinka(): boolean {
    let f = /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z][A-Za-z\d!@#$%^&*]{5,9}$/;
    if(f.test(this.lozinka_reg) == true ){
      this.porukaLozinka = "";
      return true;
    }
    this.porukaLozinka = "Lozinka mora imati 1 veliko slovo,3 mala i specijalan karakter. Minimum 6 i max 10 karaktera. Mora početi slovom. Unesite ponovo!"
    return false;

  }



  selectFile(event: any){
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);

    if(this.selectedFile){
        const fileExtension = this.selectedFile.name.split('.').pop()?.toLowerCase();
        const validExtensions = ['jpg', 'png'];
        if (!validExtensions.includes(fileExtension ?? '')) {
          this.porukaReg = "Nepravilan format slike! Dozvoljeni formati su JPG i PNG.";
          return;
        }
    }

    //provera dimenzija slike
    const reader = new FileReader();
    reader.onload = (e : any) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
       //console.log('Image loaded:', img); // Provera da li je slika ucitana
        console.log('Image dimensions:', img.width, img.height);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if(ctx){
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          if (canvas.width < 100 || canvas.height < 100 || canvas.width > 300 || canvas.height > 300) {
            this.porukaReg = "Slika mora biti između 100x100 i 300x300 piksela.";
          } else {
            this.porukaReg = "";
          }
        } else {
          this.porukaReg = "Neuspešno dobijanje 2D konteksta za canvas.";
        }

      }
      img.onerror = () => {
        console.error('Error loading image.'); // Prikazivanje greske ako slika ne moze da se ucita
      };
    }
    reader.onerror = (error) => {
      console.error('Error reading file:', error); // Prikazivanje greske ako fileReader ne moze da procita fajl
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }


  }



  registracija(){
    if(this.kor_ime_reg == "" || this.lozinka_reg == "" || this.ime_reg == "" || this.prezime_reg =="" || this.pol_reg ==""
      || this.adresa_reg == "" || this.kontakt_reg == "" || this.mejl_reg ==""){
      this.porukaReg = "Niste uneli sve podatke!";
      return;
    }

    this.userService.dohvatiKorIme(this.kor_ime_reg).subscribe((k:Korisnik) => {
      this.zahtevService.dohvatiKorIme(this.kor_ime_reg).subscribe((z:Zahtev) => {
        if(k!=null || z!=null){
        this.porukaReg = "Korisničko ime je zauzeto!";
        return;
      } else {
        this.userService.dohvatiMejl(this.mejl_reg).subscribe((kor:Korisnik) => {
          this.zahtevService.dohvatiMejl(this.mejl_reg).subscribe((zah: Zahtev) => {
            if(kor != null || zah != null){
            this.porukaReg = "Već postoji nalog sa ovom email adresom!";
            return;
          } else {
            this.porukaReg = "";
            if(/*this.formatKartica() &&*/ this.formatKontakt() && this.formatLozinka() && this.formatMejl()){
                this.zahtevService.dodajZahtev(this.ime_reg,this.prezime_reg,this.kor_ime_reg,this.lozinka_reg,this.mejl_reg,this.pol_reg,this.adresa_reg,this.kontakt_reg/*,this.kartica_reg*/)
                  .subscribe((z1:Zahtev) => {
                    if(z1 != null){

                        if(this.selectedFile != null) {
                        this.zahtevService.dodajProfilnu(this.kor_ime_reg,this.selectedFile).subscribe((zahtev: Zahtev) => {
                          if(zahtev != null) {
                            //alert("Uspešno se uploadovali fotografiju.")
                          } else {
                            alert("GREŠKA pri uploadu fotografije!")
                          }
                        })
                      }

                      this.poslatZahtevFlag = true;
                      this.naCekanju = true;
                      //alert("Uspešno ste poslali zahtev.")
                      this.postaviFlag(false);
                      this.naCekanju = true;
                    } else {
                      alert("greška pri salnju zahteva.")
                    }
                  })
            }

          }

          })

        })
      }


      })


    })

  }


  /*---------------------------pretraga------------------------------ */
  pretrazi(){
    this.filtriraj();
   }

   filtriraj() {
  this.prikazaneUsluge = this.sveUsluge.filter(usluga =>
    usluga.naziv.toLowerCase().includes(this.pretraga.toLowerCase()) ||
    usluga.cena.toString().includes(this.pretraga)
  );
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



  scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}





}

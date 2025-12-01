import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ZahtevService } from '../services/zahtev.service';
import { UserService } from '../services/user.service';
import { Korisnik } from '../models/user';
import { Zahtev } from '../models/zahtev';
import { TabelaComponent } from '../tabela/tabela.component';

@Component({
  selector: 'app-admin-klijenti',
  standalone: true,
  imports: [FormsModule,  CommonModule,TabelaComponent],
  templateUrl: './admin-klijenti.component.html',
  styleUrl: './admin-klijenti.component.css'
})
export class AdminKlijentiComponent {

  constructor(private zahtevService:ZahtevService, private userService:UserService){}


  ngOnInit(): void {
     this.userService.dohvatiKlijente().subscribe((k: Korisnik[]) => {
      if(k != null) {
        this.sviKlijenti = k;
        this.prikazaniKlijenti = this.sviKlijenti.slice(0, 5);
      }
    })

  }

  sviKlijenti: Korisnik[] = [];
  prikazaniKlijenti: Korisnik[] = [];

  //azuriranje korisnika
kor_ime: string = '';
ime: string = '';
prezime: string = "" ;
tip: string = "";
mejl: string = "";
pol: string = "";
adresa: string = "";
kontakt: string = "";
selectedFile: File | null = null;

poruka: string = "";    //azurirajKorisnika()
poruka1: string = "";   //findUserMessage()
porukaMejl: string = "";
porukaKontakt:string = "";

prikaziFormuZaAzuriranje: boolean = false;
korisnikAzuriranje: Korisnik = new Korisnik();
prikaziTabelu: boolean = false

//dodaj zaposlenog
kor_ime_reg: string = "";
lozinka_reg: string = "";
ime_reg: string = "";
prezime_reg: string = "";
pol_reg: string = "";
adresa_reg: string = "";
kontakt_reg: string = "";
mejl_reg: string = "";
kartica_reg: string = "";
cardType: string = "";
selectedFileZaposleni: File | null = null;
errorMessage: string= '';

porukaReg: string = "";
porukaLozinkaZ: string = "";
porukaMejlZ: string = "";
porukaKontaktZ: string = "";

//dodavanje firme
nazivFirme: string = '';
adresaFirme: string = '';
kontaktFirme: string = "";

porukaKontaktF: string = '';
porukaF: string = "";

/* ----------------------------Azuriranje info o korisnicima ------------------------------ */

  findUser(){
    if(this.kor_ime == ""){
      this.poruka1 = "Niste uneli nijedan podatak.";
      return;
    }
    this.userService.dohvatiKorIme(this.kor_ime).subscribe((k: Korisnik) => {
      if(k != null){
        this.korisnikAzuriranje = k;
        this.prikaziTabelu = true;
        this.poruka1 = "";
      } else {
        this.poruka1 = "Korisnik sa ovim korisnickim imenom ne postoji."
        this.prikaziTabelu = false;
        this.prikaziFormuZaAzuriranje = false;
      }
    })
  }

  toggleAzuriranjePodataka(){
    this.prikaziFormuZaAzuriranje = !this.prikaziFormuZaAzuriranje;
    this.ime ="";
    this.prezime ="";
    this.mejl ="";
    this.adresa ="";
    this.kontakt ="";
    this.pol ="";
  }

  //kontakt moze imati 9 ili 10 cifata
    formatKontaktCheck(kontakt: string): boolean {
      let f =  /^[0-9]{9,10}$/;
      if(f.test(kontakt) == true){
        if(kontakt == this.kontakt){
          this.porukaKontakt = "";
        } else if(kontakt == this.kontaktFirme){
          this.porukaKontaktF = ""
        } else  if(kontakt == this.kontakt_reg){
          this.porukaKontaktZ = "";
        }
        return true;

      } else {
        if(kontakt == this.kontakt){
          this.porukaKontakt = "Unesite ispravan broj telefona!";
        } else if(kontakt == this.kontaktFirme){
          this.porukaKontaktF = "Unesite ispravan broj telefona!"
        } else  if(kontakt == this.kontakt_reg){
          this.porukaKontaktZ = "Unesite ispravan broj telefona!";
        }
        return false;
      }
    }

    //ime_korisnika@primer.com
   formatMejlCheck(mejl: string): boolean{
    let f = /^\w{3,}\@[a-zA-Z_]+\.[a-zA-Z]+$/;
    if(f.test(mejl) == true){
      if(mejl == this.mejl){
        this.porukaMejl = "";
      }  else  if(mejl == this.mejl_reg){
        this.porukaMejlZ = "";
      }
      return true;

    } else {
      if(mejl == this.mejl){
        this.porukaMejl = "Email mora biti u formatu kor_ime@primer.com, pokusajte ponovo!";
      }  else  if(mejl == this.mejl_reg){
        this.porukaMejlZ = "Email mora biti u formatu kor_ime@primer.com, pokusajte ponovo!";
      }
      return false;
    }
  }

  formatLozinkaCheck(lozinka : string): boolean {
    let f = /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z][A-Za-z\d!@#$%^&*]{5,9}$/;
    if(f.test(lozinka) == true ){
      if(lozinka == this.lozinka_reg){
        this.porukaLozinkaZ = "";
      }
      return true;
    } else {
      if(lozinka == this.lozinka_reg){
        this.porukaLozinkaZ = "Lozinka mora imati 1 veliko slovo,3 mala i specijalan karakter. Minimum 6 i max 10 karaktera. Mora poceti slovom. Unesite ponovo!";
      }
      return false;
    }
  }




  selectFile(event: any){
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);

    if(this.selectedFile){
      //provera formata (ovom proverom prihvata i jpg i jpeg, ako stavimo prihvatanje samo jpg ni oni nece biti prihvaceni zbog mime formata)
     /*const validFormats = ['image/jpeg' , 'image.png'];
      if(!validFormats.includes(this.selectedFile.type)){
        this.porukaReg = "Nepravilan format slike! Dozvoljeni formati su JPG i PNG."
        return;
      } else {
        this.porukaReg = "";
      }*/
        const fileExtension = this.selectedFile.name.split('.').pop()?.toLowerCase();
        const validExtensions = ['jpg', 'png'];
        if (!validExtensions.includes(fileExtension ?? '')) {
          this.poruka = "Nepravilan format slike! Dozvoljeni formati su JPG i PNG.";
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
            this.poruka = "Slika mora biti izmedju 100x100 i 300x300 piksela.";
          } else {
            this.poruka = "";
          }
        } else {
          this.poruka = "Neuspesno dobijanje 2D konteksta za canvas.";
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

   azuriraj(){
    if(this.ime == "" && this.prezime == ""  && this.tip == ""  && this.mejl ==""  &&
      this.pol == ""  && this.adresa == ""  && this.kontakt == ""  && this.selectedFile == null
    ) {
      this.poruka = "Niste uneli nijedan podatak"
      return;
    } else {
      this.poruka = "";
      if((this.mejl != "" && this.formatMejlCheck(this.mejl) ==false)  || (this.kontakt != "" && this.formatKontaktCheck(this.kontakt)==false)){
        if(this.mejl == ""){this.porukaMejl = ""}
        if(this.kontakt == ""){ this.porukaKontakt = ""}
        return;
      }
      this.poruka = "";
      this.userService.dohvatiMejl(this.mejl).subscribe((k: Korisnik) =>{
        this.zahtevService.dohvatiMejl(this.mejl).subscribe((z:Zahtev) => {
          if( k!= null || z!= null){
            this.poruka = "Nalog sa ovom majl adresom vec postoji!";
            return;
          }
        })
      })
      this.poruka = "";


      this.userService.azurirajPodatke(this.korisnikAzuriranje.kor_ime,this.ime,this.prezime,this.mejl,this.kontakt,this.adresa)
      .subscribe((u: Korisnik) => {
        if(u != null){

          this.korisnikAzuriranje = u;
          this.ngOnInit();
          alert('Podaci su izmenjeni!');

          if(this.selectedFile != null){
            this.userService.azurirajProfilnu(this.korisnikAzuriranje.kor_ime,this.selectedFile).subscribe((user: Korisnik) => {
              if(user != null){
                this.korisnikAzuriranje = user;
                this.ngOnInit();
                this.toggleAzuriranjePodataka();
                this.selectedFile = null;
                alert('Podaci su izmenjeni i izmenjena fotografija');
              } else {
                alert('GRESKA pri izmeni fotografije.')
              }
            })
          } else {
            this.toggleAzuriranjePodataka();
          }


        } else {
          alert("Podaci nisu izmenjeni, greska");
        }
      })



    }

  }


}

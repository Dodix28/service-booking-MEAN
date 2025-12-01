import { Component, ElementRef, ViewChild } from '@angular/core';
import { UslugaService } from '../services/usluga.service';
import { UserService } from '../services/user.service';
import { Usluga } from '../models/usluga';
import { Kozmeticar } from '../models/kozmeticar';
import { Korisnik } from '../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Podusluga } from '../models/podusluga';

@Component({
  selector: 'app-kozmeticar-usluge',
  standalone: true,
  imports: [FormsModule,  CommonModule],
  templateUrl: './kozmeticar-usluge.component.html',
  styleUrl: './kozmeticar-usluge.component.css'
})
export class KozmeticarUslugeComponent {

  @ViewChild('ciljniDiv', { static: false }) ciljniDiv!: ElementRef;



  constructor(private uslugeService: UslugaService, private userService:UserService){}

   ngOnInit(): void {
    let u = localStorage.getItem('ulogovan');
    if(u){
      this.ulogovan = JSON.parse(u);
    }

    this.uslugeService.dohvatiSveUsluge().subscribe((u: Usluga[]) => {
      if(u){
        this.sveUsluge = u;
        this.mojeUsluge = []; // očisti pre ponovnog dodavanja
        this.sveUsluge.forEach((usluga: Usluga) => {
          for(const k of usluga.kozmeticari){
              if(k.kor_ime = this.ulogovan.kor_ime){
              this.mojeUsluge.push(usluga);
              break;
            }
          }
        })
      }
    })

    this.usluga_za_azuriranje = null;

    this.izmeniTretman = null;
    this.obrisiTretman = null;
    this.obrisiTretman_slika = '';

    this.obrisiFlag = false;
    this.izmeniFlag = false;
    this.dodajFlag = false;

    this.noviTretman_naziv = '';
    this.noviTretman_cena = 0;
    this.noviTretman_opis= '';
    this.porukaDodaj = "";


   }

   sveUsluge: Usluga[] = [];
   mojeUsluge: Usluga[] = [];

   ulogovan: Korisnik = new Korisnik();

   //azuriranje usluge
   prikaziFormuZaAzuriranje: boolean = false;
   usluga_za_azuriranje: Usluga | null = null;
   poruka: string= "";



   //prikaz odgovarajuce tabele
   obrisiFlag: boolean  = false;
   izmeniFlag: boolean  = false;
   dodajFlag: boolean  = false;
   //odabrana usluga za edit
   odabranaUsluga: Usluga = new Usluga;

   //dodaj-tabela
    noviTretman_naziv: string = '';
    noviTretman_cena: number = 0;
    noviTretman_opis: string = '';
    selectedFile: File | null = null;
    porukaDodaj: string = "";

    //izmeni - tabela
    izmeniTretman_naziv: string = '';
    izmeniTretman_cena: number = 0;
    izmeniTretman: Podusluga | null = null;
    porukaIzmeni:string = "";

    //obrisi - tabela
    obrisiTretman_slika: string = '';
    obrisiTretman: Podusluga | null = null;
    porukaObrisi:string = "";


   /* ==========================azuriranje usluge ============================= */
     toggleAzuriranjeUsluge(){
    this.prikaziFormuZaAzuriranje = !this.prikaziFormuZaAzuriranje;
  }

  findUsluga(){
     this.uslugeService.dohvatiUSluguPoId(this.noviTretman_cena).subscribe((u: Usluga) => {
      if(u){
        this.odabranaUsluga = u;
      }
    })


  }


  selectFile(event: any){
      this.selectedFile = event.target.files[0];
      console.log('Selected file:', this.selectedFile);

      if(this.selectedFile){
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


  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  odaberiOpciju(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    // resetuj sve flagove
    this.dodajFlag = false;
    this.obrisiFlag = false;
    this.izmeniFlag = false;

    if (value === 'dodaj') this.dodajFlag = true;
    if (value === 'obrisi') this.obrisiFlag = true;
    if (value === 'azuriraj') this.izmeniFlag = true;
  }

  idiNaAzuriraj(usluga:Usluga){
    if(!this.usluga_za_azuriranje){
      this.toggleAzuriranjeUsluge();
      this.odabranaUsluga = usluga;
      this.usluga_za_azuriranje = usluga;
    } else if(this.usluga_za_azuriranje == usluga){
      this.toggleAzuriranjeUsluge();
    } else if(this.usluga_za_azuriranje != usluga){
      this.usluga_za_azuriranje = usluga;
      this.odabranaUsluga = usluga;
    }



  }

  dodajTretman(){
    const prazno = this.noviTretman_naziv === "" &&
               this.noviTretman_cena === 0 &&
               this.noviTretman_opis === ""


    const popunjeno = this.noviTretman_naziv !== "" &&
                  this.noviTretman_cena > 0 &&
                  this.noviTretman_opis !== ""

    if(prazno && this.selectedFile == null){
      this.porukaDodaj = "Niste uneli nijedno polje!";
      return;
    }

    if((this.noviTretman_naziv == "" || this.noviTretman_cena == 0 || this.noviTretman_opis == "") && this.selectedFile == null){
      this.porukaDodaj = "Niste uneli sva polja!";
      return;
    }
    this.porukaDodaj = "";
    if(popunjeno){
        this.uslugeService.dodajPoduslugu(this.odabranaUsluga.idU,this.noviTretman_naziv,this.noviTretman_opis,this.noviTretman_cena).subscribe((u: Usluga) => {
        if(u){
          alert("Uspesno dodata usluga!")
        } else {
          alert("Greska! USluga nije dodata!");
        }
      })

    }

     if(this.selectedFile != null){
            this.uslugeService.dodajUgaleriju(this.odabranaUsluga.idU,this.selectedFile).subscribe((usluga: Usluga) => {
              if(usluga != null){
                this.selectedFile = null;
                this.ngOnInit();
                this.toggleAzuriranjeUsluge();

                alert(' izmenjena fotografija');
              } else {
                alert('GRESKA pri izmeni fotografije.')
              }
            })
          }

          this.ngOnInit();
          this.toggleAzuriranjeUsluge();


  }

  azuriraj(){

    if(this.izmeniFlag){
      if(!this.izmeniTretman){
        this.porukaIzmeni="Niste odabrali tretman za izmenu.";
        return;
      }
      if(this.izmeniTretman_cena==0 && this.izmeniTretman_naziv==""){
        this.porukaIzmeni = "Niste uneli nijedan podatak za izmenu."
        return;
      }
      this.porukaIzmeni = ""
      if(this.izmeniTretman_cena == 0){this.izmeniTretman_cena = this.izmeniTretman.cena}
      if(this.izmeniTretman_naziv == ""){this.izmeniTretman_naziv = this.izmeniTretman.naziv}

      this.uslugeService.izmeniPoduslugu(this.odabranaUsluga.idU,this.izmeniTretman.idPU,this.izmeniTretman_naziv,this.izmeniTretman_cena).subscribe((usluga:Usluga) => {
        if(usluga){
          alert("Usluga uspesno izmenjena.")
          this.izmeniTretman = null;
          this.ngOnInit();
        } else {
             alert("GRESKA pri izmeni.")
        }
      })

    } else if(this.obrisiFlag){
      if(!this.obrisiTretman && this.obrisiTretman_slika ==""){
        this.porukaObrisi = "Označite polje za brisanje."
        return;
      }
      if(this.obrisiTretman){
        this.uslugeService.obrisiPoduslugu(this.odabranaUsluga.idU,this.obrisiTretman.idPU).subscribe((u:Usluga) => {
          if(u){
            alert("Uspesno obrisan tretman!")
            this.ngOnInit();
            this.toggleAzuriranjeUsluge();
          } else {
            alert("Greska pri brisanju tretmana!")
          }
        })
      }

      if(this.obrisiTretman_slika){
        this.uslugeService.obrisiSliku(this.odabranaUsluga.idU,this.obrisiTretman_slika).subscribe((u: Usluga) => {
          if(u){
            alert("Uspesno obrisana slika!")
            this.ngOnInit();
            this.toggleAzuriranjeUsluge();
          } else {
            alert("Greska pri brisanju slike!")
          }
        })
      }

    }

  }



}

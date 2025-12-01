import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder, FormsModule,Validators } from '@angular/forms';
import { UslugaService } from '../services/usluga.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/user';
import { Usluga } from '../models/usluga';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Podusluga } from '../models/podusluga';
import { MatIconModule } from '@angular/material/icon';
import { RezervacijaService } from '../services/rezervacija.service';
import { Rezervacija } from '../models/rezervacija';
import { formatDate } from '@angular/common';
import { Kozmeticar } from '../models/kozmeticar';
import { SliderComponent } from '../slider/slider.component';


@Component({
  selector: 'app-usluga',
  standalone: true,
  imports: [FormsModule,
            CommonModule,
            MatIconModule,
            MatCheckboxModule,
            MatSelectModule,
            MatFormFieldModule,
            MatStepperModule,
            MatButtonModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatRadioModule,
            SliderComponent
  ],
  templateUrl: './usluga.component.html',
  styleUrl: './usluga.component.css'
})
export class UslugaComponent {

  constructor(private router: Router, private uslugaService:UslugaService, private formBuilder: FormBuilder,
    private rezervacijaService: RezervacijaService
  ){
    // Inicijalizacija prvog FormGroup
    this.firstFormGroup = this.formBuilder.group({
      datum: ['', Validators.required],
      vreme: ['', Validators.required],
      tipUsluge: [null as Podusluga | null, Validators.required]
    });
    // Inicijalizacija drugog FormGroup
    this.secondFormGroup = this.formBuilder.group({
      odabirKozmeticara: [null as Kozmeticar | null, Validators.required],
      dodatniZahtevi: [''],
      vreme: ['']
    });
  }

  ngOnInit(): void {
    let u = localStorage.getItem('ulogovan');
    if(u != null ){
      this.ulogovan = JSON.parse(u);
      this.registrovan = true;
    }

    let usluga = localStorage.getItem('selectedUslugaId');
    if( usluga != null){
      console.log("selektovan id usluge", usluga)
      let Id = JSON.parse(usluga);
      this.uslugaService.dohvatiUSluguPoId(Id).subscribe((usl:Usluga) => {
        if(usl != null){
          this.selectedUsluga = usl;
         this.selectedUsluga.galerija.forEach((slika: String) => {
          this.sliderImages.push('http://localhost:4000/uploads/podusluge/' + slika);
         })
        }
      })
    }

      for (let h = 8; h <= 20; h++) {
        for (let m = 0; m < 60; m += 30) {
          const hh = h.toString().padStart(2, '0');
          const mm = m.toString().padStart(2, '0');
          this.vremena.push(`${hh}:${mm}`);
        }
      }

     let ul = localStorage.getItem('ulogovan');
     this.registrovan = !!ul && ul !== "null";
     console.log("Registrovan:" , this.registrovan);

     this.prikaziFormu_zaZakazivanje = false;
     this.terminZauzetFlag = false;


  }

  ulogovan: Korisnik = new Korisnik();
  selectedUsluga: Usluga = new Usluga();
  registrovan:boolean = false;

  //forma steps- zakazivanje
  prikaziFormu_zaZakazivanje:boolean = false;
  firstFormGroup;
  secondFormGroup;
  datum: string = "";
  vreme: string = "";
  usluge: Array<Usluga> = [];
  selectedFile: File | null = null;

  //izgled stranice-slidder
  sliderImages: string[] = [];

  //vremena zakazivalja (prihvaceno i na cekanju)
  rezervacije_naCekanju_i_prihvaceno: Rezervacija[] = [];
  sveRezervacije:Rezervacija[] = [];

  izabraniKozmeticar:Kozmeticar = new Kozmeticar();
  dostupniTermini: string[] = [];
  zauzetiTermini: string[] = [];

  terminZauzetFlag: boolean = false;


  /*------------------------------steps forma -------------------------- */
  onSubmit() {

  }

  toggleUslugaSelection(podusluga: Podusluga) {
    podusluga.selected = !podusluga.selected;
  }
  resetStepper() {
    //this.stepper.reset();
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    // Dobijamo godinu, mesec i dan
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meseci su 0-indexed, dodajemo 1
    const day = date.getDate().toString().padStart(2, '0');
    // Vraćamo format YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }

  jeDatumUOpsegu(datumProverava: string, datumPocetni: string, datumKrajnji: string): boolean {
    // Konvertuj stringove u Date objekte
    const datumProveravaObj = new Date(datumProverava);
    const datumPocetniObj = new Date(datumPocetni);
    const datumKrajnjiObj = new Date(datumKrajnji);

    // Postavi vreme na početak dana za upoređivanje
    datumProveravaObj.setUTCMilliseconds(0);
    datumProveravaObj.setUTCSeconds(0);
    datumProveravaObj.setUTCMinutes(0);
    datumProveravaObj.setUTCHours(0);

    datumPocetniObj.setUTCMilliseconds(0);
    datumPocetniObj.setUTCSeconds(0);
    datumPocetniObj.setUTCMinutes(0);
    datumPocetniObj.setUTCHours(0);

    datumKrajnjiObj.setUTCMilliseconds(0);
    datumKrajnjiObj.setUTCSeconds(0);
    datumKrajnjiObj.setUTCMinutes(0);
    datumKrajnjiObj.setUTCHours(0);

    // Proveri da li je datumProverava između datumPocetni i datumKrajnji
    return datumProveravaObj >= datumPocetniObj && datumProveravaObj <= datumKrajnjiObj;
  }

   potvrdiTermin() {
    const izabranaUsluga=  this.firstFormGroup.get('tipUsluge')?.value;
    const izabraniKozmeticar=  this.secondFormGroup.get('odabirKozmeticara')?.value?.kor_ime;
    let cena: number = 0;
    this.selectedUsluga.podusluge.forEach((p: Podusluga) => {
      if(p.idPU == Number(izabranaUsluga)){
        cena = p.cena;
      }
    })

    let napomena = this.firstFormGroup.get('dodatniZahtevi')?.value ?? "";
    let datumObj = this.firstFormGroup.get('datum')!.value!;
    const datum = formatDate(datumObj, 'dd-MM-yyyy', 'en-US');
    let vreme = this.firstFormGroup.get('vreme')!.value!;

    if(izabranaUsluga  && izabraniKozmeticar ){
      this.rezervacijaService.dodajRezervaciju(this.selectedUsluga.idU,izabranaUsluga.idPU,this.ulogovan.kor_ime,
      izabraniKozmeticar,napomena,cena,datum,vreme,izabranaUsluga.naziv
    ).subscribe((rezervacija: Rezervacija) => {
      if(rezervacija != null){
        alert("uspesno ste rezervisali termin!")
        this.ngOnInit();
      } else {
        alert("greska pri rezervaciji termina!")
      }
    })
    }

  }


  openNativeTimePicker(event: Event) {
  const input = (event.currentTarget as HTMLElement).closest('mat-form-field')?.querySelector('input[type="time"]') as HTMLInputElement;
  input.showPicker();
}

vremena: string[] = [];


toggle_prikaziFormu(){
  this.prikaziFormu_zaZakazivanje = !this.prikaziFormu_zaZakazivanje

  // Ako se forma prikazuje, sačekaj da se renderuje pa skroluj
  if (this.prikaziFormu_zaZakazivanje) {
    setTimeout(() => {
      const el = document.getElementById('formaDiv');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300); // 300ms je taman da Angular završi render
  }
}

  /*scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}*/

/* =============================== prikaz dostupni termina nakon odabira kozmeticara ============================== */
onKozmeticarChange(event: any) {
    this.izabraniKozmeticar = event.value;
    this.dostupniTermini = []; // reset
    this.zauzetiTermini = [];
    let datumObj = this.firstFormGroup.get('datum')!.value!;
    let odabraniDatum = formatDate(datumObj, 'dd-MM-yyyy', 'en-US');
    let vreme = this.firstFormGroup.get('vreme')!.value!;

    if(this.izabraniKozmeticar){
      this.rezervacijaService.dohvatiSveRezervacije_za_kozmeticara(this.izabraniKozmeticar.kor_ime).subscribe((rez: Rezervacija[]) => {
        if(rez){
          this.sveRezervacije = rez;
          this.sveRezervacije.forEach((r: Rezervacija ) => {
            if(r.status == "na cekanju" || r.status == "prihvaceno"){
              this.rezervacije_naCekanju_i_prihvaceno.push(r);
              if(odabraniDatum.toString() == r.datumZakazivanja){
                 this.zauzetiTermini.push(r.vreme);
                 if(vreme == r.vreme){
                  this.terminZauzetFlag = true;
                 }
              }
            }
            console.log('odabrani datumi', odabraniDatum)

            if (this.terminZauzetFlag) {
              this.secondFormGroup.get('vreme')?.setValidators(Validators.required);
            } else {
              this.secondFormGroup.get('vreme')?.clearValidators();
            }
            this.secondFormGroup.get('vreme')?.updateValueAndValidity();

          })

          this.dostupniTermini = this.vremena;

           // filtriraj — zadrži samo slobodna vremena -ZA TAJ DATUM
          this.dostupniTermini = this.vremena.filter(
            (vreme) => !this.zauzetiTermini.includes(vreme)
          );

          console.log('Zauzeti termini:', this.zauzetiTermini);
          console.log('Dostupna vremena:', this.dostupniTermini);


        }
      })
    }
  }


}

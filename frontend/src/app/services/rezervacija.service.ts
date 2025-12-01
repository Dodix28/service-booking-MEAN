import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rezervacija } from '../models/rezervacija';

@Injectable({
  providedIn: 'root'
})
export class RezervacijaService {

  uri = 'http://localhost:4000/rezervacije';

  constructor(private http: HttpClient) { }

  dodajRezervaciju(idU: number, idPU: number, klijent: string, kozmeticar: string,napomena: string,cena:number,
    datum: string, vreme:string,nazivPodusluge: string
  ){
    const data = {
      idU: idU,
      idPU: idPU,
      klijent:klijent,
      kozmeticar: kozmeticar,
      napomena: napomena,
      datumZakazivanja: datum,
      vreme: vreme,
      cena:cena,
      nazivPodusluge:nazivPodusluge,
    }
    console.log("data",data);
    return this.http.post<Rezervacija>(`${this.uri}/addRezervacija`,data);
  }

  dohvatiRezervacijuZaKlijenta(kor_ime:string){
    const data ={
      kor_ime:kor_ime
    }
    return this.http.post<Rezervacija[]>(`${this.uri}/getRezervacijaZaKlijenta`,data);
  }

  dohvatiSveRezervacije_za_kozmeticara(kozmeticar: string){
    const data = {
      kozmeticar: kozmeticar
    }

    return this.http.post<Rezervacija[]>(`${this.uri}/getAllRezervacijeZaKozmeticara`,data);
  }

  prihvatiRezervaciju(idR: number){
    const data = {
      idR: idR
    }
    return this.http.post<Rezervacija>(`${this.uri}/prihvatiRezervaciju`,data);
  }

   odbijRezervaciju(idR: number, komentar: string){
    const data = {
      idR: idR,
      komentar: komentar
    }
    return this.http.post<Rezervacija>(`${this.uri}/odbijRezervaciju`,data);
  }
}

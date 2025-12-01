import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Korisnik } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000/users';

  constructor(private http: HttpClient) { }


  login(kor_ime:string, lozinka:string){
    const data = {
      kor_ime : kor_ime,
      lozinka : lozinka
    }

    return this.http.post<Korisnik>(`${this.uri}/login`, data);
  }

  dohvatiKorIme(kor_ime:string){
    const data = {
      kor_ime:kor_ime
    }

    return this.http.post<Korisnik>(`${this.uri}/getUsername`, data);
  }

  dohvatiMejl(mejl:string){
    const data = {
      mejl:mejl
    }

    return this.http.post<Korisnik>(`${this.uri}/getMail`, data);
  }

   dodajKorisnika(ime:string, prezime: string, kor_ime:string,lozinka:string, adresa:string, tip:string, mejl:string, pol:string, kontakt: string, /*brKartice:string,*/
   profilna: string
  ){
    const data = {
      ime:ime,
      prezime: prezime,
      kor_ime: kor_ime,
      lozinka: lozinka,
      tip: tip,
      mejl:mejl,
      pol:pol,
      adresa:adresa,
      kontakt: kontakt,
      profilna: profilna,
    };
    return this.http.post<Korisnik>(`${this.uri}/addUser`, data);
  }


  azurirajPodatke(kor_ime: string, ime:string, prezime: string, mejl: string, kontakt: string, adresa:string/*, kartica: string*/){
    const data = {
      kor_ime: kor_ime,
      ime: ime,
      prezime: prezime,
      mejl: mejl,
      adresa: adresa,
      kontakt: kontakt,
      /*kartica: kartica,*/

    }

    return this.http.post<Korisnik>(`${this.uri}/updateInfo`, data);
  }

  azurirajProfilnu(kor_ime:string, profilna: File){
    const formData = new FormData();
    formData.append('kor_ime', kor_ime);
    formData.append('image', profilna);
    return this.http.post<Korisnik>(`${this.uri}/uploadImage`, formData);
  }



   dohvatiKlijente(){
    return this.http.get<Korisnik[]>(`${this.uri}/dohvatiKlijente`);
   }

    dohvatiKozmeticare(){
    return this.http.get<Korisnik[]>(`${this.uri}/dohvatiKozmeticare`);
   }



}

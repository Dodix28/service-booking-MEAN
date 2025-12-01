import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Zahtev } from '../models/zahtev';

@Injectable({
  providedIn: 'root'
})
export class ZahtevService {

    uri = 'http://localhost:4000/requests';

  constructor(private http: HttpClient) { }

  dodajZahtev(ime: string, prezime: string, kor_ime:string, lozinka: string,
  mejl: string, pol: string, adresa: string, kontakt: string
) {
  const data = {
    ime: ime,
    prezime: prezime,
    kor_ime: kor_ime,
    lozinka: lozinka,
    mejl: mejl,
    pol: pol,
    adresa: adresa,
    kontakt: kontakt,
  };
  return this.http.post<Zahtev>(`${this.uri}/addRequest`,data);
}


dodajProfilnu(kor_ime:string, profilna: File ){

  const formData = new FormData();
  formData.append('kor_ime', kor_ime);
  formData.append('image', profilna);
  return this.http.post<Zahtev>(`${this.uri}/uploadImg`, formData);
}

dohvatiKorIme(kor_ime: string) {
  const data = {
    kor_ime:kor_ime
  }
  return this.http.post<Zahtev>(`${this.uri}/getUsername`, data);
}

dohvatiMejl(mejl: string){
  const data = {
    mejl:mejl
  }
  return this.http.post<Zahtev>(`${this.uri}/getMail`, data);
}

dohvatiNaCekanju() {
  return this.http.get<Zahtev[]>(`${this.uri}/dohvatiNaCekanju`);
}

prihvatiZahtev(idZ: number){
  const data = {
    idZ: idZ
  };
  return this.http.post<Zahtev>(`${this.uri}/accept`, data);
}

odbijZahtev(idZ: number){
  const data = {
    idZ: idZ
  };
  return this.http.post<Zahtev>(`${this.uri}/decline`, data);
}


}

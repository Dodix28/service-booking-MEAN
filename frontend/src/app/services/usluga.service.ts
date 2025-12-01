import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usluga } from '../models/usluga';

@Injectable({
  providedIn: 'root'
})
export class UslugaService {

  uri = 'http://localhost:4000/usluge';

  constructor(private http: HttpClient) { }

  dohvatiSveUsluge(){
    return this.http.get<Usluga[]>(`${this.uri}/getUsluge`);
  }

  dohvatiUSluguPoId(idU: number){
    const data={
      idU: idU
    }
    return this.http.post<Usluga>(`${this.uri}/dohvatiUslugu_id`,data);
  }

  dodajPoduslugu(idU: number, naziv: string, opis: string, cena: number){
    const data = {
      idU : idU,
      naziv: naziv,
      opis: opis,
      cena: cena,
    }
    return this.http.post<Usluga>(`${this.uri}/dodajPoduslugu`,data);
  }

    dodajUgaleriju(idU:number, slika: File){
      const formData = new FormData();
      formData.append('idU', idU.toString());
      formData.append('image', slika);
      return this.http.post<Usluga>(`${this.uri}/uploadImage`, formData);
    }

    izmeniPoduslugu(idU: number, idPU:number, naziv:string, cena: number){
      const data ={
        idU:idU,
        idPU: idPU,
        naziv:naziv,
        cena:cena
      }
      return this.http.post<Usluga>(`${this.uri}/izmeniPoduslugu`,data);
    }

        obrisiPoduslugu(idU: number, idPU:number){
      const data ={
        idU:idU,
        idPU: idPU,
      }
      return this.http.post<Usluga>(`${this.uri}/obrisiPoduslugu`,data);
    }

     obrisiSliku(idU: number, slika:string){
      const data ={
        idU:idU,
        slika: slika,
      }
      return this.http.post<Usluga>(`${this.uri}/obrisiSliku`,data);
    }

}

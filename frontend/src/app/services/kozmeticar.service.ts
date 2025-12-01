import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kozmeticar } from '../models/kozmeticar';

@Injectable({
  providedIn: 'root'
})
export class KozmeticarService {


  uri = 'http://localhost:4000/kozmeticari';

    constructor(private http: HttpClient) { }



      dohvatiKozmeticara(kor_ime:string){
        const data ={
          kor_ime:kor_ime
        }
        return this.http.post<Kozmeticar>(`${this.uri}/dohvatiKozmeticara`,data);
      }
}

import { Kozmeticar } from "./kozmeticar";
import { Podusluga } from "./podusluga";

export class Usluga{
  idU: number= 0;
  naziv: string = '';
  cena: number= 0;
  trajanje:  string = '';
  galerija: Array<string> = [];
  //kozmeticari: Array<Kozmeticar> = [];
  kozmeticari: Kozmeticar[] = [];
  opis: string = '';
  podusluge: Array<Podusluga> = [];
  slika: string = '';
}

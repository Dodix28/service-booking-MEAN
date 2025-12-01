import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [FormsModule,  CommonModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent implements OnChanges{

  @Input() sviPodaci: any[] = [];            // svi podaci za tabelu
  @Input() redovaPoStrani: number = 5;      // default broj redova po strani
  @Output() promenjeniPodaci = new EventEmitter<any[]>(); // emituje prikazane podatke


  prikazaniPodaci: any[] = [];
  trenutnaStrana: number = 1;
  ukupnoStrana: number = 1;

  // ovde je ključ: dodaj argument tipa SimpleChanges
  ngOnChanges(changes: SimpleChanges): void {
    this.ukupnoStrana = Math.ceil(this.sviPodaci.length / this.redovaPoStrani);
    this.trenutnaStrana = 1;
    this.izracunajPrikaz();
  }

  izracunajPrikaz(): void {
    const start = (this.trenutnaStrana - 1) * this.redovaPoStrani;
    const end = start + this.redovaPoStrani;
    this.prikazaniPodaci = this.sviPodaci.slice(start, end);
    this.promenjeniPodaci.emit(this.prikazaniPodaci);
  }

  idiNaStranu(strana: number): void {
    this.trenutnaStrana = strana;
    this.izracunajPrikaz();
  }

  /*promeniRedovaPoStrani(broj: number): void {
    this.redovaPoStrani = Number(broj);
    this.ukupnoStrana = Math.ceil(this.sviPodaci.length / this.redovaPoStrani);
    this.trenutnaStrana = 1;
    this.izracunajPrikaz();
  }*/

  promeniRedovaPoStrani(event: Event) {
    const select = event.target as HTMLSelectElement; // cast
    const broj = Number(select.value);               // sada TypeScript zna da value postoji
    this.redovaPoStrani = broj;
    this.ukupnoStrana = Math.ceil(this.sviPodaci.length / this.redovaPoStrani);
    this.trenutnaStrana = 1;
    this.izracunajPrikaz();
  }




  generisiStrane(): number[] {
    return Array.from({ length: this.ukupnoStrana }, (_, i) => i + 1);
  }
}




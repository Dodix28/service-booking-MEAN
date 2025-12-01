import { Component, Input } from '@angular/core';
import { NgForOf } from "@angular/common";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [FormsModule,  CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  @Input() images: string[] = [];

  ngOnInit(): void {
      setInterval(() => {
    this.nextSlide();
  }, 2500); // 1000ms = 1 sekunda
  }
// Putanje do slika (možeš staviti i apsolutne URL-ove)
  /*images: string[] = [
    '/slider/hair8.png',
    '/slider/massage8.png',
    '/slider/pedicure8.png',
    '/slider/manicure8.png',
    '/slider/facial8.png',
    '/slider/madero8.png',
  ];*/

  currentIndex = 0; // indeks trenutne slike
  transitionMs = 500;
  isAnimating = false;


  get transform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  get transitionStyle(): string {
    return this.isAnimating ? `transform ${this.transitionMs}ms ease` : 'none';
  }

  nextSlide(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    setTimeout(() => (this.isAnimating = false), this.transitionMs);
  }

  prevSlide(): void {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    setTimeout(() => (this.isAnimating = false), this.transitionMs);
  }
}

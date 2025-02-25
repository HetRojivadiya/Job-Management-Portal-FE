import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-herosection',
  standalone: false,
  templateUrl: './herosection.component.html',
  styleUrl: './herosection.component.scss',

})
export class HerosectionComponent {
  heroImages = {
    arrow1: 'images/hero/arrow-01.svg',
    arrow2: 'images/hero/arrow-02.svg',
    hero1: 'images/hero/hero-01.avif',
    hero2: 'images/hero/hero-02.avif',
    hero3: 'images/hero/hero-03.avif',
    decoration1: 'images/hero/decoration-01.svg',
    decoration2: 'images/hero/decoration-02.svg',
    decoration3: 'images/hero/decoration-03.svg'
  };
  ngOnInit(): void {}

}

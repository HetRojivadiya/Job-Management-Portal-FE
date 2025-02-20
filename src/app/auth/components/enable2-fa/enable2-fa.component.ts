import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enable2-fa',
  standalone: false,
  templateUrl: './enable2-fa.component.html',
  styleUrl: './enable2-fa.component.scss'
})
export class Enable2FAComponent implements OnInit {
  qrCode: string = '';
  message: string = '';

  ngOnInit() {
    this.qrCode = localStorage.getItem('qrCode') || '';
    this.message = localStorage.getItem('enable2FAMessage') || '';
    localStorage.removeItem('qrCode');
    localStorage.removeItem('enable2FAMessage');
    
  }
}

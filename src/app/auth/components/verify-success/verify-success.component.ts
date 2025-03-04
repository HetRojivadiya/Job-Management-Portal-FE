import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ROUTES } from '../../constants/routes';
import { take } from 'rxjs';

@Component({
  selector: 'app-verify-success',
  standalone: false,
  templateUrl: './verify-success.component.html',
  styleUrls: ['./verify-success.component.scss']
})
export class VerifySuccessComponent implements OnInit {
  countdown: number = 3;
  isVerified: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(params => {
      const token = params['token'];

      const tokenData = { token : token}; 
      if (token) {
        this.authService.verifyToken(tokenData).pipe(take(1)).subscribe({
          next: (response) => {
            if (response) {
              this.isVerified = true;
              this.startCountdown();
            }
          },
          error: (err) => {
            this.router.navigate([ROUTES.SIGNIN]);
            throw err;
          }
        });
      }
    });
  }

  startCountdown() {
    const interval = setInterval(() => {
      this.countdown -= 1;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.router.navigate([ROUTES.SIGNIN]);
      }
    }, 1000);
  }
}

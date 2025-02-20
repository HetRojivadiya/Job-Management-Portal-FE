import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }
  warn(message: string) {
    console.warn(`[WARNING]: ${message}`);
  }
  error(message: string) {
    console.error(`[ERROR]: ${message}`);
  }
}

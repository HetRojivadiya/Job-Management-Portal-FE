import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { UserResponse } from '../../models/user-response.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: UserResponse[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  private destroy = new Subject<void>();

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  ngOnDestroy(){
    this.destroy.next();
    this.destroy.complete();
  }

  fetchUsers(): void {
    this.adminService.getAllUsers().pipe(takeUntil(this.destroy)).subscribe({
      next: (response) => {
         this.users = response.data.map(user => ({
          ...user,
          totalApplications: this.getRandomApplicationCount()
        }));
        
      },
      error: (err) => {
        throw err;
      },
    });
  }

  get paginatedUsers(): UserResponse[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.users.slice(start, start + this.itemsPerPage);
  }

  changePage(direction: 'next' | 'prev'): void {
    if (direction === 'next' && this.currentPage * this.itemsPerPage < this.users.length) {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
    }
  }

  updateItemsPerPage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
    this.currentPage = 1;
  }
  

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }
  
  get endIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.users.length);
  }




  getRandomApplicationCount(): { value: number; color: string } {
    const randomValue = [8, 15, 21][Math.floor(Math.random() * 3)];
    const color = randomValue === 8 ? 'bg-red-500' : randomValue === 15 ? 'bg-yellow-500' : 'bg-green-500';
    return { value: randomValue, color };
  }
  
  
}

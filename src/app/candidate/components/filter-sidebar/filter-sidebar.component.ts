import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-sidebar',
  standalone: false,
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.scss'
})
export class FilterSidebarComponent {
  filters = {
    remote: false,
    onsite: false,
    hybrid: false,
    entry: false,
    mid: false,
    senior: false,
    salary: 100000,
    skill: '',
    location: ''
  };
  
  locationSuggestions: string[] = [];
  
  updateSalaryLabel(): void {
  }
  
  suggestLocation(): void {
  }
  
  selectLocation(location: string): void {
    this.filters.location = location;
    this.locationSuggestions = [];
    this.applyFilters();
  }
  
  resetFilters(): void {
    this.filters = {
      remote: false,
      onsite: false,
      hybrid: false,
      entry: false,
      mid: false,
      senior: false,
      salary: 100000,
      skill: '',
      location: ''
    };
    this.applyFilters();
  }
  
  hasAppliedFilters(): boolean {
    return this.filters.remote || this.filters.onsite || this.filters.hybrid || 
           this.filters.entry || this.filters.mid || this.filters.senior ||
           this.filters.salary !== 100000 || this.filters.skill !== '' || 
           this.filters.location !== '';
  }
  
  removeFilter(filterName: string): void {
    this.applyFilters();
  }
  
  applyFilters(): void {
   
  }

  getSliderBackground(): string {
    const min = 10000;
    const max = 500000;
    const percentage = ((this.filters.salary - min) / (max - min)) * 100;
    return `linear-gradient(to right, #2563eb ${percentage}%, #e5e7eb ${percentage}%)`;
  }
}
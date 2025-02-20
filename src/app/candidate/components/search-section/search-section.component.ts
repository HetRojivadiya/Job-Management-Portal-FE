import { Component } from '@angular/core';

@Component({
  selector: 'app-search-section',
  standalone: false,
  templateUrl: './search-section.component.html',
  styleUrl: './search-section.component.scss'
})
export class SearchSectionComponent {  isDropdownOpen = false;
  selectedCategory: string | null = null;

  jobCategories: string[] = [
    "UI/UX Design", "Human Research", "Digital Marketing", "Video & Animation",
    "Business Analysis", "AI Services","Programming & Tech",

  ];

  popularJobs = [
    { name: "UI/UX Design", link: "/job-category/ui-ux-design" },
    { name: "Human Research", link: "/job-category/human-research" },
    { name: "Digital Marketing", link: "/job-category/digital-marketing" },
    { name: "Video & Animation", link: "/job-category/video-animation" }
  ];

  recommendedJobs = [
    { name: "International", icon: "images/search-section/job-type-04.svg", link: "/job-type/international" },
    { name: "Remote", icon: "images/search-section/job-type-02.svg", link: "/job-type/remote" },
    { name: "Part-Time", icon: "images/search-section/job-type-03.svg", link: "/job-type/part-time" },
    { name: "Internship", icon: "images/search-section/job-type-01.svg", link: "/job-type/internship" }
  ];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.isDropdownOpen = false;
  }
}
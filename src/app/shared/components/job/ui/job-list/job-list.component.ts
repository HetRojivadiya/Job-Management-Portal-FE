import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Job } from '../../../../model/job.model';
import { DataGridComponent } from '../../../data-grid/data-grid.component';
import { ColDef, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-job-list',
  standalone: false,
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent {
  @Input() jobs: Job[] = [];
  @Input() isAdmin: boolean = false;
  @Output() editJob = new EventEmitter<Job>();
  @Output() deleteJob = new EventEmitter<string>();
  @Output() applyJob = new EventEmitter<string>();
  showColumnDropdown = false;
  @ViewChild('dataGrid') dataGrid!: DataGridComponent;

  private gridApi!: GridApi;

  allColumns = [
    { headerName: 'Title', field: 'title', isVisible: true, sortable: true, filter: true, width: 200 },
    { headerName: 'Location', field: 'location', isVisible: true, sortable: true, filter: true, width: 180 },
    { headerName: 'Salary', field: 'salary', isVisible: true, sortable: true, filter: true, width: 150 },
    { headerName: 'Descpription', field: 'description', isVisible: true, sortable: true, filter: true, width: 550 },
    { headerName: 'Actions', field: 'actions', isVisible: true, width: 350, cellRenderer: JobListComponent.actionCellRenderer  }
  ];

  columnDefs: ColDef[] = [];
  defaultColDef: ColDef = { resizable: true , floatingFilter:true};

  ngOnInit(): void {
    this.columnDefs = this.allColumns.map(col => ({
      headerName: col.headerName,
      field: col.field,
      width: col.width,
      sortable: col.sortable,
      filter: col.filter,
      cellRenderer: col.cellRenderer ? col.cellRenderer : this.getCellRenderer(col.field)
    }));
  }

  getCellRenderer(field: string) {
    switch (field) {
      case 'title': return JobListComponent.titleCellRenderer;
      case 'location': return JobListComponent.locationCellRenderer;
      case 'salary': return JobListComponent.salaryCellRenderer;
      case 'description': return JobListComponent.descriptionCellRenderer;
      case 'actions': return JobListComponent.actionCellRenderer;
      default: return null;
    }
  }

  static titleCellRenderer(params: any) {
    if (!params.data) return '';

    const colors = [
      "bg-red-500", "bg-blue-500", "bg-green-500", 
      "bg-yellow-500", "bg-purple-500", "bg-pink-500",
      "bg-indigo-500", "bg-teal-500", "bg-orange-500"
    ];
    
    const randomIndex = Math.floor(Math.random() * colors.length);
    const colorClass = colors[randomIndex];
  
    return `
      <div class="flex items-center gap-2 leading-tight">
        <div class="w-8 h-8 flex items-center justify-center rounded-full ${colorClass} text-white font-bold text-sm">
          ${params.data.title ? params.data.title.charAt(0).toUpperCase() : ''}
        </div>
        <span class="truncate">${params.data.title || ''}</span>
      </div>
    `;
  }
  

  static locationCellRenderer(params: any) {
    if (!params.data) return '';
    return `<div class="leading-tight"><span class="truncate">${params.data.location || ''}</span></div>`;
  }

  static salaryCellRenderer(params: any) {
    if (!params.data) return '';
    return `<div class="leading-tight"><span class="truncate">${params.data.salary_range || ''}</span></div>`;
  }

  static descriptionCellRenderer(params: any) {
    if (!params.data) return '';
    return `<div class="leading-tight"><span class="truncate">${params.data.description || ''}</span></div>`;
  }

  static actionCellRenderer(params: any) {
    if (!params.data) return '';
    return `
     <div class="flex gap-2 items-center">
      <button class="btn-edit btn-pulse py-3 px-4 rounded-lg text-white text-sm font-bold tracking-wide bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none transition-all duration-300" data-action="edit" data-id="${params.data.id}">
        ✏️ Edit
      </button>
      <button class="btn-delete py-3 px-4 rounded-lg text-white text-sm font-bold tracking-wide bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-800 transition-all duration-300" data-action="delete" data-id="${params.data.id}">
        🗑️ Delete
      </button>
     
        <a href="/job-details/${params.data.id}" class="py-3 px-4 rounded-lg text-blue-600 text-sm font-medium tracking-wide border border-blue-600 hover:bg-blue-50 focus:outline-none transition-all duration-300">
          🔍 View Job
        </a>
  
    </div>
    `;
  }

  onGridReady(gridApi: GridApi) {
    this.gridApi = gridApi;
  }

  exportToCsv() {
    const params = {
      fileName: 'jobs-list.csv',
      skipHeader: false,
      columnSeparator: ',',
      suppressQuotes: false
    };
    this.gridApi.exportDataAsCsv(params);
  }

  onCellClicked(event: any) {
    const action = event.event.target.getAttribute('data-action');
    const jobId = event.event.target.getAttribute('data-id');
    if (action === 'edit') {
      this.editJob.emit(event.data); 
    } else if (action === 'delete') {
      this.deleteJob.emit(jobId);
    }
  }
}

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { UserResponse } from '../../models/user-response.model';
import { Subject, takeUntil } from 'rxjs';
import { ColDef, GridApi } from 'ag-grid-community';
import { Router } from '@angular/router';
import { DataGridComponent } from '../../../shared/components/data-grid/data-grid.component';


@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  @ViewChild('dataGrid') dataGrid!: DataGridComponent;
  private gridApi!: GridApi;
  users: UserResponse[] = [];
  private destroy = new Subject<void>();
  showColumnDropdown = false;

  // Define columns without referencing `this`
  allColumns = [
    { headerName: 'Username', field: 'username', isVisible: true, sortable: true, filter: true, width: 320 },
    { headerName: 'Email', field: 'email', isVisible: true, sortable: true, filter: true, width: 250 },
    { headerName: 'Mobile', field: 'mobile', isVisible: true, sortable: true, filter: true, width: 150 },
    { headerName: 'Skills', field: 'skills', isVisible: true, sortable: false, filter: false, width: 280 },
    { headerName: 'Total Applications', field: 'totalApplications', isVisible: true, sortable: true, filter: false, width: 320 },
    { headerName: 'Action', field: 'userId', isVisible: true, sortable: false, filter: false, width: 150 }
  ];

  columnDefs: ColDef[] = [];
  defaultColDef: ColDef = { resizable: true ,floatingFilter:true };

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.columnDefs = this.allColumns.map(col => ({
      headerName: col.headerName,
      field: col.field,
      width: col.width,
      sortable: col.sortable,
      filter: col.filter,
      cellRenderer: this.getCellRenderer(col.field)
    }));
    this.fetchUsers();
  }

  getCellRenderer(field: string) {
    switch (field) {
      case 'username': return UserListComponent.userCellRenderer;
      case 'email': return UserListComponent.emailCellRenderer;
      case 'skills': return UserListComponent.skillsCellRenderer;
      case 'totalApplications': return UserListComponent.applicationsCellRenderer;
      case 'userId': return UserListComponent.actionCellRenderer;
      default: return null;
    }
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

  getRandomApplicationCount(): { value: number; color: string } {
    const randomValue = [8, 15, 21][Math.floor(Math.random() * 3)];
    const color = randomValue === 8 ? 'bg-red-500' : randomValue === 15 ? 'bg-yellow-500' : 'bg-green-500';
    return { value: randomValue, color };
  }


  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  onGridReady(gridApi: GridApi) {
    this.gridApi = gridApi;
  }


  onCellClicked(event: any) {
    if (event.colDef.field === 'userId' && event.event.target.classList.contains('view-details-btn')) {
      const userId = event.event.target.getAttribute('data-user-id');
      if (userId) {
        this.router.navigate(['/profile', userId]);
      }
    }
  }

  static userCellRenderer(params: any) {
    if (!params.data) return '';
    const avatar = params.data.userId ? 
      `images/avatar/avatar_${(params.data.userId.charCodeAt(0) % 24) + 1}.jpg` : 
      'images/avatar/avatar_1.jpg';
    return `
      <div class="flex items-center w-max">
        <img src="${avatar}" class="w-10 h-10 rounded-full shadow-md" />
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900 truncate">${params.data.username || ''}</p>
        </div>
      </div>
    `;
  }

  exportToCsv() {
    const params = {
      fileName: 'users-list.csv',
      skipHeader: false,
      columnSeparator: ',',
      suppressQuotes: false
    };
    this.gridApi.exportDataAsCsv(params);
  }

  static emailCellRenderer(params: any) {
    if (!params.data) return '';
    return `
      <div class="leading-tight">
        <span class="truncate">${params.data.email || ''}</span>
        <p class="text-xs text-green-600">${params.data.status || ''}</p>
      </div>
    `;
  }

  static skillsCellRenderer(params: any) {
    if (!params.data || !params.data.skills) return '';
    if (params.data.skills.length === 0) {
      return '<span class="text-gray-500 text-xs">No Skills</span>';
    }
    let html = '<div class="flex flex-wrap gap-1">';
    params.data.skills.slice(0, 3).forEach((skill: any) => {
      html += `<span class="bg-gray-200 px-2 py-1 rounded text-xs shadow-sm">${skill.skillName || ''}</span>`;
    });
    if (params.data.skills.length > 3) {
      html += '<span class="text-gray-500 text-xs ml-1">...</span>';
    }
    html += '</div>';
    return html;
  }

  static applicationsCellRenderer(params: any) {
    if (!params.data || !params.data.totalApplications) return '';
    const apps = params.data.totalApplications;
    const percent = (apps.value / 21) * 100;
    return `
      <div>
        <div class="bg-gray-300 rounded-full w-[200px] h-2">
          <div class="h-full rounded-full ${apps.color}" style="width: ${percent}%"></div>
        </div>
        <p class="text-xs text-gray-500 mt-1">Total: ${apps.value || 0}</p>
      </div>
    `;
  }

  static actionCellRenderer(params: any) {
    if (!params.data) return '';
    const userId = params.data.userId || '';
    return `
      <button class="px-2 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded shadow-md transition duration-200 view-details-btn" 
              data-user-id="${userId}">
        View Details
      </button>
    `;
  }
}

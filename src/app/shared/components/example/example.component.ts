import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Theme, themeQuartz, type ColDef, GridApi } from 'ag-grid-community'; 
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-example',
  standalone: false,
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  
  private gridApi!: GridApi;
  
  quickFilterText: string = '';
  
  defaultColDef: ColDef = {
    filter: true,
    floatingFilter: true,
    sortable: true,
    resizable: true
  }

  theme: Theme | "legacy" = myTheme;

  pagination = true;
  paginationPageSize = 10;

  rowData: any[] = [];
  columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Language', field: 'language' },
    { headerName: 'Country', field: 'country' },
    { headerName: 'Game Name', field: 'gameName' },
    { headerName: 'Bought', field: 'bought' },
    { headerName: 'Bank Balance', field: 'bankBalance' },
    { headerName: 'Rating', field: 'rating' },
    { headerName: 'Total Winnings', field: 'totalWinnings' }
  ];

  @HostListener('document:click')
  closeDropdowns() {
    if (this.gridComponent) {
      this.gridComponent.closeAllDropdowns();
    }
  }

  gridComponent: any;

  ngOnInit() {
    this.rowData = [
      { 
        name: 'Tony Smith', 
        language: 'English', 
        country: 'Ireland', 
        gameName: 'Chess', 
        bought: true, 
        bankBalance: 2397, 
        rating: 2, 
        totalWinnings: 569571 
      },
      { 
        name: 'Andrew Connell', 
        language: 'Swedish', 
        country: 'Sweden', 
        gameName: 'Bul', 
        bought: true, 
        bankBalance: 12749, 
        rating: 3, 
        totalWinnings: 481734 
      },
      { 
        name: 'Kevin Flanagan', 
        language: 'Spanish', 
        country: 'Uruguay', 
        gameName: 'Rithmomachy', 
        bought: false, 
        bankBalance: 95078, 
        rating: 0, 
        totalWinnings: 747956 
      },
      { 
        name: 'Bricker McGee', 
        language: 'French', 
        country: 'France', 
        gameName: 'Kalah', 
        bought: false, 
        bankBalance: 65506, 
        rating: 0, 
        totalWinnings: 605384 
      },
      { 
        name: 'Dimple Unalkat', 
        language: 'Portuguese', 
        country: 'Portugal', 
        gameName: 'Game of the Generals', 
        bought: true, 
        bankBalance: 85310, 
        rating: 2, 
        totalWinnings: 600036 
      },
    ];
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  onQuickFilterChanged(event: any) {
    this.gridApi.setGridOption('quickFilterText', event.target.value);
  }

  onRowSelect(selectedRows: any[]) {
    console.log('Selected rows:', selectedRows);
  }

  onSort(sortConfig: {key: string, direction: string}) {
    console.log('Sort applied:', sortConfig);
  }

  exportToCsv() {
    const params = {
      fileName: 'ag-grid-export.csv',
      skipHeader: false,
      columnSeparator: ',',
      suppressQuotes: false,
     
      onlySelected: false,
     
    };
    
    this.gridApi.exportDataAsCsv(params);
  }
}

const myTheme = themeQuartz.withParams({
  backgroundColor: "rgb(255, 254, 254)",
  foregroundColor: "rgb(0, 0, 0)",
  headerTextColor: "rgb(200, 220, 255)", 
  headerBackgroundColor: "rgb(29, 74, 211)", 
  oddRowBackgroundColor: "rgba(255, 255, 255, 0.05)", 
  headerColumnResizeHandleColor: "rgb(100, 150, 255)", 
});
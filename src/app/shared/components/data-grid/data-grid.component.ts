import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';


@Component({
  selector: 'app-data-grid',
  standalone: false,
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss'
})
export class DataGridComponent {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  @Input() rowData: any[] = [];
  @Input() columnDefs: ColDef[] = [];
  @Input() defaultColDef: ColDef = { resizable: true , floatingFilter: true};
  @Input() rowHeight: number = 60;
  @Input() paginationPageSize: number = 10;
  @Input() paginationPageSizeSelector: number[] = [10, 20, 50];
  @Input() title: string = 'Data Grid';
  @Input() height: string = '500px';
  @Input() allColumns: any[] = []; 
  @Input() showColumnDropdown: boolean = false;

  @Output() gridReady = new EventEmitter<GridApi>();
  @Output() cellClicked = new EventEmitter<any>();
  @Output() exportCsv = new EventEmitter<void>();
  @Output() columnToggled = new EventEmitter<any[]>();
  @Output() quickFilterChanged = new EventEmitter<string>();

  private gridApi!: GridApi;
  private originalColumnDefs: ColDef[] = [];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.originalColumnDefs = [...this.columnDefs];
    this.gridReady.emit(this.gridApi);
  }

  onCellClicked(event: any) {
    this.cellClicked.emit(event);
  }

  onExportCsv() {
    this.exportCsv.emit();
  }

  toggleColumnDropdown() {
    this.showColumnDropdown = !this.showColumnDropdown;
  }

  toggleColumn(col: any) {
    col.isVisible = !col.isVisible;
    
    const visibleColumns = this.allColumns
      .filter(c => c.isVisible)
      .map(c => c.field);
    
    const updatedColumnDefs = this.originalColumnDefs
      .filter(colDef => colDef.field && visibleColumns.includes(colDef.field));
  
    if (this.gridApi) {
      this.gridApi.setGridOption('columnDefs', updatedColumnDefs);
    }
    
    this.columnToggled.emit(this.allColumns);
  }

  onQuickFilterChanged(event: any) {
    const filterText = event.target.value;
    if (this.gridApi) {
      this.gridApi.setGridOption('quickFilterText', filterText);
    }
    this.quickFilterChanged.emit(filterText);
  }
}
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { AfterViewInit, Component, EventEmitter, inject, Input, OnChanges, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector:'app-table',
    templateUrl:'./table.component.html',
    styleUrls:['./table.component.css']
})
export class TableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() actions = false;
  @Input() columnLabels: { [key: string]: string } = {};
  @Input() title?:string;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  private _liveAnnouncer = inject(LiveAnnouncer);
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)sort!: MatSort;

  ngAfterViewInit(){
    this.dataSource.sort= this.sort;
  }
  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.data);
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onEdit(row: any) {
    this.edit.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }

  getDisplayValue(element: any, col: string): string {
    if (element == null) return '';


    switch (col) {
      case 'id_capo':
        return element.id_capo?.nome || element.id_capo?.id || '';
      case 'data_fine':
        if (!element[col]) return 'TBD';
      return this.formatDate(element[col]);
      case 'data_nascita':
      case 'data_inizio':
        return this.formatDate(element[col]);


      default:
        const value = element[col];
        if (this.isDate(value)) return this.formatDate(value);
        if (typeof value === 'object') return value?.nome || value?.id || '[obj]';
        return value;
    }
  }

  formatDate(value: Date): string {
    const date = new Date(value);
    return !isNaN(date.getTime()) ? date.toLocaleDateString('it-IT') : '';
  }

  isDate(value: any): boolean {
    return value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)));
  }
}

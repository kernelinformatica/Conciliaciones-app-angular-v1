import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExportService {
  exportToCsv(filename: string, rows: object[]) {
    const csvData = this.convertToCsv(rows);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  }

  private convertToCsv(rows: object[]): string {
    const header = Object.keys(rows[0]).join(',');
    const data = rows.map(row => Object.values(row).join(',')).join('\n');
    return `${header}\n${data}`;
  }

  exportToExcel(filename: string, rows: object[]) {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, filename);
  }
}

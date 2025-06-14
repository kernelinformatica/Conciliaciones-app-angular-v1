import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  styles: [`
    .mat-dialog-container {
      background-color: red;
      border-radius: 10px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
      padding: 5px;
      text-align: center;
    }
    .mat-dialog-title {
      font-size: 22px;
      font-weight: bold;
      color: #007bff;
    }
    .mat-dialog-actions {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
  `],
  template: `
    <h1 mat-dialog-title>Mensaje</h1>
    <div mat-dialog-content>
      <p>{{data.mensaje}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="closeDialog()">Cerrar</button>
    </div>
  `
})
export class DialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}

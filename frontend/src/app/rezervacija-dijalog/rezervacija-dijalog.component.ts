import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef , MatDialogModule} from '@angular/material/dialog';
import { Rezervacija } from '../models/rezervacija';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-rezervacija-dijalog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './rezervacija-dijalog.component.html',
  styleUrl: './rezervacija-dijalog.component.css'
})
export class RezervacijaDijalogComponent {
constructor(
    public dialogRef: MatDialogRef<RezervacijaDijalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rezervacija
  ) {}

  potvrdi() {
    this.dialogRef.close('potvrdi');
  }

  odbij() {
    this.dialogRef.close('odbij');
  }

  zatvori() {
    this.dialogRef.close();
  }
}

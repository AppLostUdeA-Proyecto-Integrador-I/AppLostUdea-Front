import { Component, Inject , OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-modal',
  templateUrl: './notificacion-modal.component.html',
  styleUrls: ['./notificacion-modal.component.css']
})
export class NotificacionModalComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<NotificacionModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any) { }

    ngOnInit() {
    }

    closeModal() {
      this.dialogRef.close();
    }
}

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
      console.log(this.data)
    }

    actionFunction() {
      alert("You have logged out.");
      this.closeModal();
    }

    // If the user clicks the cancel button a.k.a. the go back button, then\
    // just close the modal
    closeModal() {
      this.dialogRef.close();
    }
}

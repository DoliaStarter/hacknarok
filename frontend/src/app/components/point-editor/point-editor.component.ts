import {Component, Inject,OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  description:string;
  title:string;

}

@Component({
  selector: 'app-point-editor',
  templateUrl: './point-editor.component.html',
  styleUrls: ['./point-editor.component.scss']
})
export class PointEditorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PointEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close(this.data);
    
  }

  ngOnInit(): void {
  }

}

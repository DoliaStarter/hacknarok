import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-point-editor',
  templateUrl: './point-editor.component.html',
  styleUrls: ['./point-editor.component.scss']
})
export class PointEditorComponent implements OnInit {

  constructor() { }

  description:string;
  title:string;

  ngOnInit(): void {
  }

}

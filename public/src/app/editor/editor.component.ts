import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editorForm: FormGroup 

  constructor() { }

  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
  }
  
  
}

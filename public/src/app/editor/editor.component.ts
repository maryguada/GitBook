import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  var: any;
  editorForm: FormGroup
  editorStyle = {
    height: '300px'
  }
  editorContent: any
  newPost: any;

  config = {
    toolbar: [
      ['bold', 'italic', 'underline']    ]
  }

  constructor(
    private sanitizer: DomSanitizer,
    private _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })

    this.newPost = { "caption": "", "content": "" }
  }
  onSubmitCreate(userPk){
    this.editorContent =  this.editorForm.get('editor').value;
    this.newPost.content = this.editorContent
    this._httpService.createPost(userPk, this.newPost).subscribe(()=>{
      this._router.navigate(['/dashboard'])
    })
  }
}


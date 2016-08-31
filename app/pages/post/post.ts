import {Component} from '@angular/core';
import {Page, NavController, NavParams} from 'ionic-angular';
import {HtmlPipe} from '../../pipes/htmlPipe';
@Component({
  templateUrl: 'build/pages/post/post.html',
  pipes: [HtmlPipe]
})
export class PostPage {
  postData:any;
  constructor(public nav:NavController, public params: NavParams) {
    this.postData = this.params.get('postData');  
  }
}

import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {HtmlPipe} from '../../pipes/htmlPipe';
@Component({
    templateUrl: 'build/pages/wp-page/wp-page.html',
    pipes: [HtmlPipe]
})
export class WpPage {
    page:any;
    constructor(public params:NavParams) {
        this.page = this.params.get('page');
    }
}   
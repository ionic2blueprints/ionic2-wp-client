import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WpProvider} from '../../providers/wp-provider/wp-provider';
import {UtilProvider} from '../../providers/util-provider/util-provider';
import {WpPage} from '../wp-page/wp-page';

@Component({
    templateUrl: 'build/pages/wp-page-list/wp-page-list.html'
})
export class WpPageList {
    pages:Array<any>;
    constructor(public nav:NavController, public wp: WpProvider, public up: UtilProvider) {
        let loader = this.up.getLoader('Loading Pages ...');
        this.nav.present(loader);
        this.wp.getPages()
        .subscribe(pages => {
            this.pages = pages;
            loader.dismiss();
        }, ()=> {
            loader.dismiss();
        });
    }
    
    openPage(page) {
        this.nav.push(WpPage, {page: page});
    }
}
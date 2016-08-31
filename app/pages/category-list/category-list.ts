import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PostsPage} from '../posts/posts';
import {WpProvider} from '../../providers/wp-provider/wp-provider';
import {UtilProvider} from '../../providers/util-provider/util-provider/';

@Component({
  templateUrl: 'build/pages/category-list/category-list.html',
})
export class CategoryListPage {
  list:Array<any>;
  constructor(public nav:NavController, public wp:WpProvider, public up:UtilProvider) {
    let loader = this.up.getLoader("Loading Categories");
    this.nav.present(loader);
    this.wp.getCategories()
    .subscribe(data => {
      this.list = data;
      loader.dismiss();
    }, ()=> {
      loader.dismiss();
    })
    
  }
  
  openCategory(category) {
    this.nav.push(PostsPage, {"category": category});
  }
}

import {Component} from '@angular/core';
import {Control} from '@angular/common';
import {NavController, NavParams, Modal, Storage, LocalStorage, Loading, Toast, Events} from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import {PostCmp} from '../../components/post/post';
import {PostPage} from '../post/post';
import {SettingsPage} from '../settings/settings';
import {WpProvider} from '../../providers/wp-provider/wp-provider';
import {UtilProvider} from '../../providers/util-provider/util-provider';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  templateUrl: 'build/pages/posts/posts.html',
  directives: [PostCmp]
})
export class PostsPage {
  hideSearch:Boolean = true;
  searchbar:Control = new Control();
  pageCount:number = 1;
  favoriteList = [];
  getData = true;
  sort:string;
  noMore:Boolean = false;
  posts:any;
  storage = new Storage(LocalStorage);
  category:any = {};
  query:{};
  constructor(public params:NavParams, public nav:NavController, public wp:WpProvider, public up:UtilProvider, public events: Events) {
    this.category = this.params.get('category');

    // Getting Favorite List
    this.storage.get('favorite')
    .then(data => {
        if(data === null) {
            data = "[]";
        }
        this.favoriteList = JSON.parse(data);
    });
    
    // Getting Settings
    this.storage.get('settings')
    .then(data => {
      this.sort = JSON.parse(data).sort;
      let query = this.createQuery();
      this.getPosts(query);
    });
    
    
    // Search Subscription
    this.searchbar.valueChanges
    .debounceTime(2000)
    .filter(value => value.length === 0 || value.trim().length > 2)
    .distinctUntilChanged()
    .subscribe((value)=> {
      this.resetSettings();
      let query = this.createQuery();
      this.getPosts(query);
    });
    
    // If Sort Order Changed
    this.events.subscribe("sort:changed", value => {
      this.resetSettings();
      this.sort = value;
      let query = this.createQuery();
      this.getPosts(query);
    });
  }
  
  getPosts(query) {
    let loader = this.up.getLoader("Loading Posts...");
    this.nav.present(loader);
    this.wp.getPosts(query)
    .subscribe(posts => {
      this.posts = posts;
      loader.dismiss();
    }, (error) => {
      loader.dismiss();
    });
    
  }
  
  loadMore(infinteScroll) {
    this.pageCount++;
    let query = this.createQuery();
      
    let toast = this.up.getToast("There are no more posts.");
    this.wp.getPosts(query)
    .subscribe(posts => {
      infinteScroll.complete();
      if(posts.length < 1) { 
       this.noMore = true;
       infinteScroll.enable(!this.noMore);
       this.nav.present(toast);
      } else {
        this.posts = this.posts.concat(posts);
      }
    });
  }
    
  toggleSearch() {
    this.hideSearch = !this.hideSearch;
  }
  
  read(data) {
    this.nav.push(PostPage, {postData: data});
  }
  
  favorite(post) {
    let newPost:Boolean = true;
    let toast;
    let message:string;
    this.favoriteList.forEach(favPost => {
      if(JSON.stringify(favPost) === JSON.stringify(post)) {
        newPost = false;
      }
    });
    
    if(newPost) {
      this.favoriteList.push(post);
      this.storage.set('favorite', JSON.stringify(this.favoriteList));
      message = "This Post is saved in Favorite List";
    } else {
      message = "This Post is already in Favorite List";
    }
    toast = this.up.getToast(message);
    this.nav.present(toast);
  }
  
  openSettings() {
    this.nav.push(SettingsPage);
  }
  
  resetSettings() {
    this.noMore = false;
    this.pageCount = 1;
  }

  createQuery() {
    let query = {};
    query['page'] = this.pageCount;
    if(this.sort) {
      query['order'] = this.sort;
    }
    if(this.searchbar.value) {
      query['search'] = this.searchbar.value;
    }
    if(this.category) {
      query['categories'] = this.category.id;
    }
    return query;
  }
}

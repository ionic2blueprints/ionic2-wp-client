import {Component} from '@angular/core';
import {Storage,LocalStorage, NavController} from 'ionic-angular';
import {PostPage} from '../post/post';

@Component({
    templateUrl: 'build/pages/favorite/favorite.html'
})
export class FavoritePage {
    favoriteList = [];
    storage = new Storage(LocalStorage);
    constructor(public nav:NavController) {}
    
    ionViewWillEnter() {
        this.storage.get('favorite')
        .then(data => {
            if(data !== null) {
                this.favoriteList = JSON.parse(data);
            }
        });
    }
    
    read(post) {
        this.nav.push(PostPage, {postData:post});
    }
    
    removeFavorite(index) {
       this.favoriteList.splice(index, 1);
       this.storage.set('favorite', this.favoriteList); 
    }
}
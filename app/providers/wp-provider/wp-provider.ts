import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {SITE_URL} from '../constants';

@Injectable()
export class WpProvider {
  apiURL:string = SITE_URL + '/wp-json/wp/v2';
  constructor(public http:Http) {}
  
  getPosts(query) {
    query = this.transformRequest(query);
    let url = this.apiURL + `/posts?` + query + '&_embed';
    return this.http.get(url)
      .map(data => {
        let posts = data.json();
        posts.forEach(post => {
          if(post.featured_media) {
            post.featuredMedia = this.getMedia(post.featured_media);
          }
        });
        return posts;
      });
           
  }
  
  getMedia(id:number) {
    return this.http.get(this.apiURL + `/media/${id}`).map(data => data.json());
  }
  
  getPages() {
    return this.http.get(this.apiURL + '/pages').map(data => data.json());
  }
  
  getCategories() {
    return this.http.get(this.apiURL + '/categories').map(data => data.json());
  }
  
  transformRequest(obj) {
    let p, str;
    str = [];
    for (p in obj) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
    return str.join('&');
  }

}


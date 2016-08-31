import {Component} from '@angular/core';
import {CategoryListPage} from '../category-list/category-list';
import {PostsPage} from '../posts/posts';
import {FavoritePage} from '../favorite/favorite';
import {WpPageList} from '../wp-page-list/wp-page-list';

@Component({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
    firstTab = PostsPage;
    secondTab = CategoryListPage;
    thirdTab = WpPageList;
    fourthTab = FavoritePage;
}
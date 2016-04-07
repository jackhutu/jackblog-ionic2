import {Page, NavController, NavParams} from 'ionic-angular'
import {HomePage} from '../home/home'
import {ArticleService} from '../../providers/article-service'
import {ArticleDetailModel } from '../../models'

import {AuthService} from '../../providers/auth-service'


@Page({
  templateUrl: 'build/pages/article/article.html',
})
export class ArticleDetailPage {
  aid:string
  articleDetail: ArticleDetailModel
  user: Object

  constructor(
    private nav: NavController,
    private params: NavParams,
    private articleService: ArticleService,
    private authService: AuthService) {
    this.aid = params.data.aid
    this.articleService.ArticleDetailSubject.subscribe((articleDetail:ArticleDetailModel)=>{
      this.articleDetail = articleDetail
    })
  }

  goBack(){
    this.nav.pop();
  }

  onPageLoaded() {
    if(!this.aid){
      //this.nav.setRoot(HomePage)
      this.nav.setPages([{ page: HomePage }]);
    }
    this.authService.userSubject.subscribe((user:Object)=>{
      this.user = user
      this.articleService.getArticleDetail(this.aid, this.user)
    })
  }
}

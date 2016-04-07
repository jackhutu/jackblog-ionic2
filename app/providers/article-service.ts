import { Injectable, bind } from 'angular2/core'
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs'
import { Response } from 'angular2/http'
import { ArticleDetailModel,PrenextArticleModel,OptionsModel } from '../models'
import { ResourceService } from './resource-service'
import { AuthService } from './auth-service'

@Injectable()
export class ArticleService {
  articleDetailInitialState: ArticleDetailModel = new ArticleDetailModel
  prenextInitialState: PrenextArticleModel = new PrenextArticleModel
  ArticleDetailSubject: Subject<ArticleDetailModel> = new BehaviorSubject<ArticleDetailModel>(this.articleDetailInitialState)
  prenextSubject: Subject<PrenextArticleModel> = new BehaviorSubject<PrenextArticleModel>(this.prenextInitialState)
  constructor(public rs: ResourceService, public authService: AuthService) { }

  getArticleDetail(id: string, user?: any) {
    this.rs.getFrontArticle(id)
      .map((res: Response) => {
        let isLike = false
        let article = res.json().data
        if(user && user.likes){
          user.likes.map(item=>{
            if(item.toString() === article._id){
              isLike = true
            }
          })
        }
        article.isLike = isLike
        return article
      })
      .subscribe((article: ArticleDetailModel) => {
        this.ArticleDetailSubject.next(article)
      }, (err: Response) => {
        this.ArticleDetailSubject.next(this.articleDetailInitialState)
      })
  }
  toggleLike(id:string,articleDetail:ArticleDetailModel){
    this.rs.toggleLike(id)
      .map((res: Response) => {
        let like_count = res.json().count
        let isLike = res.json().isLike
        articleDetail.isLike = isLike
        articleDetail.like_count = like_count
        return articleDetail
      })
      .subscribe((articleDetail: any) => {
        this.authService.getUserInfo()
        this.ArticleDetailSubject.next(articleDetail)
      })
  }

  getPrenext(id: string, options: OptionsModel) {
    this.rs.getPrenext(id,options)
      .subscribe((res:Response)=>{
        this.prenextSubject.next(res.json().data)
      },(err:Response)=>{
        this.prenextSubject.next(this.prenextInitialState)
      })
  }
}
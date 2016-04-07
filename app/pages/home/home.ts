import {Page, IonicApp, NavController } from 'ionic-angular';
import { TagListModel, OptionsModel, ArticleList } from '../../models'
import { TagService } from '../../providers/tag-service'
import {ResourceService} from '../../providers/resource-service'
import {CustomTimePipe, FormatDatePipe} from '../../providers/pipes'
import { ArticleDetailPage } from '../article/article'

@Page({
  templateUrl: 'build/pages/home/home.html',
  pipes: [CustomTimePipe,FormatDatePipe]
})
export class HomePage {
	tagList: TagListModel
	options: OptionsModel
	articleList: any[]
	isFetching: boolean
	isMore: boolean

  constructor(public tagService: TagService, public app: IonicApp, private nav: NavController) {
  	tagService.optionSubject.subscribe((options:OptionsModel)=>{
  		this.options = options
  	})

    tagService.isFetchingSubject.subscribe((isFetching:boolean)=>{
    	this.isFetching = isFetching
    })
    tagService.isMoreSubject.subscribe((isMore: boolean) => {
    	this.isMore = isMore
    })
    tagService.articleListSubject.subscribe((articleList:any[])=>{
    	this.articleList = articleList
    })
  }

  doRefresh(refresher) {
		this.tagService.changeOptions()
    this.tagService.getArticleList()
    setTimeout(() => {
      refresher.complete()
      let infiniteScroll = this.app.getComponent('infinite')
      infiniteScroll.enable(true)
    }, 500);
  }

  doInfinite(infiniteScroll) {
  	let currentPage = this.options.currentPage
  	let newOptions = new OptionsModel(
  		++currentPage,
  		this.options.itemsPerPage,
  		this.options.sortName,
  		this.options.tagId)
		this.tagService.getArticleList(newOptions, true, this.articleList)
		this.tagService.changeOptions(newOptions)

		setTimeout(() => {
			infiniteScroll.complete()
			if(!this.isMore){
				infiniteScroll.enable(false)
			}
		}, 500);
  }

  pushPage(aid) {
    this.nav.push(ArticleDetailPage, { aid: aid });
  }
	
}

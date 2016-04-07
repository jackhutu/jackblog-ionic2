export class ArticleList {
  isFetching: boolean
  isMore: boolean
  items: any[]
  constructor(isFetching?: boolean, isMore?: boolean, items?: any[]) {
    this.isFetching = isFetching || false
    this.isMore = isMore || true
    this.items = items || []
  }
}

export class ArticleDetailModel {
  isLike:boolean
  like_count:number
  title:string
  visit_count:number
  comment_count:number
  content:string
  constructor(obj?: any) {
    this.isLike = obj && obj.isLike || false
    this.like_count = obj && obj.like_count || 0
    this.title = obj && obj.title || ''
    this.visit_count = obj && obj.visit_count || 0
    this.comment_count = obj && obj.comment_count || 0
    this.content = obj && obj.content || ''
  }
}

export class PrenextArticleModel {
  next: Object
  prev: Object
  constructor(next?: Object, prev?: Object) {
    this.prev = prev || {}
    this.next = next || {}
  }
}

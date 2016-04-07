import { Injectable, bind } from 'angular2/core'
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs'
import { Response } from 'angular2/http'
import { CommentModel,ReplyModel } from '../models'
import { ResourceService } from './resource-service'

@Injectable()
export class CommentService {
  commentListInitialState: CommentModel[] = [
    new CommentModel()
  ]
  commentListSubject: Subject<CommentModel[]> = new BehaviorSubject<CommentModel[]>(this.commentListInitialState)
  constructor(public rs: ResourceService) {}

  getCommentList(id: string) {
    this.rs.getFrontCommentList(id)
      .subscribe((res:Response) => {
        this.commentListSubject.next(res.json().data)
      }, (err: Response) => {
        this.commentListSubject.next(this.commentListInitialState)
      })
  }

  addComment(data:any,comments:CommentModel[]) {
    this.rs.addNewComment(data)
      .subscribe((res:Response) => {
        comments.push(res.json().data)
        this.commentListSubject.next(comments)
      }, (err: Response) => {
        this.commentListSubject.next(comments)
      })
  }

  addReply(cid: string, data: any, comments: CommentModel[]): void {
    this.rs.addNewReply(cid,data)
      .map((res: Response) => {
        let replys = res.json().data
        let newComment = comments.map((item)=>{
          if(item._id === cid){
            item.replys = replys
          }
          return item
        })
        return newComment
      })
      .subscribe((newComment: CommentModel[]) => {
        this.commentListSubject.next(newComment)
      }, (err) => {
        this.commentListSubject.next(comments)
      })
  }
}
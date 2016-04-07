export class ReplyModel {
  user_info: any
  created: string
  content: string
  constructor(obj?: any) {
    this.user_info = obj && obj.user_info || {}
    this.created = obj && obj.created || ''
    this.content = obj && obj.content || ''
  }
}

export class CommentModel {
	_id:string
  replys: ReplyModel[]
  user_id: any
  created: string
  content: string
  constructor(obj?: any) {
		this.replys = obj && obj.replys || [new ReplyModel()]
		this.user_id = obj && obj.user_id || {}
  	this.created = obj && obj.created || ''
  	this.content = obj && obj.content || ''
		this._id = obj && obj._id || ''
  }
}


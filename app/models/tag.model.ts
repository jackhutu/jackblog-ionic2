export class TagListModel {
  tags: any[]
  constructor(tags?: any[]) {
    this.tags = tags || []
  }
}

export class OptionsModel {
  currentPage: number
  itemsPerPage: number
  sortName: string
  tagId: string
  constructor(currentPage?: number,
    itemsPerPage?: number,
    sortName?: string,
    tagId?: string) {
    this.currentPage = currentPage || 1
    this.itemsPerPage = itemsPerPage || 10
    this.sortName = sortName || 'publish_time'
    this.tagId = tagId || ''
  }
}
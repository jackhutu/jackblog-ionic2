import {Injectable, Inject, Pipe} from 'angular2/core'

@Pipe({ name: 'customTime' })
export class CustomTimePipe {
  minuteTime: number = 60 * 1000
  hourTime: number = 60 * this.minuteTime
  dayTime: number = 24 * this.hourTime
  monthTime: number = this.dayTime * 30
  yearTime: number = this.monthTime * 12
  nowTime:number = new Date().getTime()
  transform(item: string): string {
    let publishTime:number = new Date(item).getTime();
    let historyTime:number = this.nowTime - publishTime
    let descTime:string
    if(historyTime >= this.yearTime){
      //按年算
      descTime = Math.floor(historyTime / this.yearTime) + '年前'
    }else if(historyTime< this.yearTime && historyTime >= this.monthTime){
      //按月算
      descTime = Math.floor(historyTime / this.monthTime) + '月前'
    }else if(historyTime< this.monthTime && historyTime>= this.dayTime){
      //按天算
      descTime = Math.floor(historyTime / this.dayTime) + '天前'
    }else if(historyTime< this.dayTime && historyTime>= this.hourTime){
      //按小时算
      descTime = Math.floor(historyTime / this.hourTime) + '小时前'
    }else if(historyTime< this.hourTime && historyTime>= this.minuteTime){
      //按分钟算
      descTime = Math.floor(historyTime / this.minuteTime) + '分钟前'
    }else{
      descTime = '刚刚'
    }
    return descTime
  }
}

@Pipe({ name: 'formatDate' })
export class FormatDatePipe {
  transform(time: string): string {
    let tmpDate = new Date(time)
    let year = tmpDate.getFullYear()
    let mathon = tmpDate.getMonth() + 1
    let day = tmpDate.getDate()
    let hours = tmpDate.getHours()
    let minutes = tmpDate.getMinutes()
    return year + '.' + mathon + '.' + day + ' ' + hours + ':' + minutes
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
@Input() totalCount:number=0;
@Input() pageSize!:number;
@Output() PageChanged=new EventEmitter<number>()

constructor(){}

ngOnInit(){

}

onPageChange(event:any){
  this.PageChanged.emit(event.page);
}


}

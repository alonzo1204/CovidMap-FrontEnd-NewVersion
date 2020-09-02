import { Component , Input,EventEmitter, Output} from '@angular/core';
import { DataComment } from '../../../model/comment';


@Component({
  selector: 'ngx-addComment',
  styleUrls: ['./addComment.component.scss'],
  templateUrl: './addComment.component.html',
})
export class AddCommentComponent {
  @Input() comments : DataComment[]
  @Output() greetEvent = new EventEmitter();
  coment:string;

  //@Input() comentStartDate:boolean;
 constructor(){}
 
 createComent(){
  this.greetEvent.emit(this.coment);
  this.coment= " ";
 }
}

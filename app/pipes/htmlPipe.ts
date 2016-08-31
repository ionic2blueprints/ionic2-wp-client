import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'htmlPipe'
})
export class HtmlPipe implements PipeTransform{
  transform(value:string, args) {
      if(args === "delete") {
        let test = value.match("<a");
        if(test) {
            value = value.substring(0,test.index-1);
        }
        return value;
      } else if (args === "change") {
          let test = value.replace("<a","<a target='_system'");
          return test;
      }
      
  }  
}

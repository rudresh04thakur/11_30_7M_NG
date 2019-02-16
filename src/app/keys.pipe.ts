import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  array =[];
  transform(value: any, args?: any): any {
    for(let key in value){
      this.array.push({"key":key,"value":value[key]})
    }
    return this.array;
  }

}

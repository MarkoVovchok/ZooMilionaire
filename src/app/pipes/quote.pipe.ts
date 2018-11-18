import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quote'
})
export class QuotePipe implements PipeTransform {

  transform(text: string): string {

    let doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.body.textContent || "";
  }
}

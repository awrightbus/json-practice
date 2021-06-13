import { Injectable } from '@angular/core';


//Dependency injection is when a class recieves dependency from outer source source

@Injectable({
  providedIn: 'root'
})
export class SortingHatService {

  constructor() { }

  sortingHat(parsedCharacters, interactiveCharacters, nonInteractiveCharacters):Array<any>{



     return [ Object.keys(parsedCharacters).forEach((key: string) => {
      if (key === "harry_potter" || key === "lord_voldemort") {
        interactiveCharacters[key] = parsedCharacters[key];
      } else {
        nonInteractiveCharacters[key] = parsedCharacters[key];
      }
    }),

    ]


  }


}

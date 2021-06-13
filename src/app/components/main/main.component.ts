import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as unparsedJson from '../../json/data.json';
import {SortingHatService} from 'src/app/services/sorting-hat.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  // vars used by the about modal:
  closeModal: string;
  // vars related to data retrieval and storage:
  dataRetrievalComplete: Boolean = false;
  interactiveCharacters: any = {};
  nonInteractiveCharacters: any = {};
  // vars used by bonus challenges (initialized, but currently unused):
  harrysGlassesAreRepaired: Boolean = false;
  voldemortIsCensored: Boolean = false;

  constructor(
    private modalService: NgbModal,
    private sortingHatService: SortingHatService
  ) { }

  ngOnInit(): void {

    let parsedJson = JSON.parse(JSON.stringify(unparsedJson));
    let parsedCharacters = parsedJson.default.characters;
    let sortingHatReturnArray: Array<any>;
    sortingHatReturnArray = this.sortingHatService.sortingHat(parsedCharacters, this.interactiveCharacters, this.nonInteractiveCharacters);
    console.log("sortingHatReturnArray: ", sortingHatReturnArray);
    this.dataRetrievalComplete = true;



  }

  // The triggerModal & getDismissReason functions are related to the about modal:
  // (documented at: https://www.remotestack.io/angular-bootstrap-modal-popup-tutorial-example/)
  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}

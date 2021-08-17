import { LightningElement } from 'lwc';

export default class NewButton extends LightningElement {
    handleClick() {
        //firing an child method
        this.template.querySelector("c-student-application-form");
      }
}
import { LightningElement, wire,api,track } from 'lwc';

import { deleteRecord } from 'lightning/uiRecordApi';

import displayStudents from '@salesforce/apex/StudentFormHandler.displayStudents';
//import updateRecord from '@salesforce/apex/StudentFormHandler.updateRecord';
import { refreshApex } from '@salesforce/apex';
//import { updateRecord } from '@salesforce/apex';
//import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// for edit
/*import Student_OBJECT from "@salesforce/schema/Student__c";
import ID_FIELD from "@salesforce/schema/Student__c.Id";
import FirstName_FIELD from "@salesforce/schema/Student__c.First_Name__c";
import LastName_FIELD from "@salesforce/schema/Student__c.Last_Name__c";*/

export default class studentRecordDisplay extends LightningElement {

    @track customFormModal = false; //for update
    @api recordId;
    name;
    industry;
    rating; //for update
    @api objectApiName; //for update
    @api deleteRecordId;
    //@api currentRecordId;
	@api errorMessage;
    @wire(displayStudents) Students;
   // @wire(updateRecord) Students;

    handleChange(event){
        this.deleteRecordId=event.target.value;
        console.log('@@@current RecordId@@@'+this.deleteRecordId);
    }
    //for delete
    handleDelete(){
        deleteRecord(this.deleteRecordId)
        .then(() => {
            return refreshApex(this.Students);
        })
        .catch((error) => {
           this.error=error;
           console.log('unable to delete the record due to'+JSON.stringify(this.error));
        });
    }
    /*for update
    handleUpdate(event){
        this.currentRecordId=event.target.value;
        console.log('@@currentRecordId@@@'+this.currentRecordId);
        updateRecord({
            accId:this.currentRecordId
        })
        .then(() => {
            console.log('SUCCESS');
            return refreshApex(this.Students);
        })
        .catch((error) => {
            this.errorMessage=error;
			console.log('unable to update the record due to'+JSON.stringify(this.errorMessage));
        });
    }*/
    // for update
   
    
    customShowModalPopup() {            
        this.customFormModal = true;
    }

    customHideModalPopup() {    
        
        this.customFormModal = false;
    }
   /* handleChange1(e) {
        if (e.target.name === "name") {
       
          //this is name input textbox
          this.name = e.target.value;
          console.log(this.name);
        } 
      
      else if (e.target.name === "rating") {
       
        //this is rating input textbox
        this.rating = e.target.value;
        console.log(this.rating);
      }
    }
      handleClick(){
        //4. map the data to the fields
        const fields = {};
  
      fields[ID_FIELD.fieldApiName] = this.recordId;
      fields[FirstName_FIELD.fieldApiName] = this.name;
     // fields[INDUSTRY_FIELD.fieldApiName] = this.industry;
      fields[LastName_FIELD.fieldApiName] = this.rating;
         
          //5. Create a config object that had info about fields.
          //Quick heads up here we are not providing Object API Name
      const recordInput = {
        fields: fields
      };
  
          //6. Invoke the method updateRecord()
      updateRecord(recordInput).then((record) => {
        console.log(record);
      });
     }*/
     handleSubmit(event){
        console.log('onsuccess:'+event.detail.fields);}
        
        handleSuccess(event){
        const updateRecord=event.detail.id;
        console.log('onsuccess:',updateRecord);
    }
    
}
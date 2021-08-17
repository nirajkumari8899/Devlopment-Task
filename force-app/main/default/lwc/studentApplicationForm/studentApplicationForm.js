import { 
    LightningElement,
    api,
    wire,                                                           //C_Sample_Class,m_Insert_A_Contact_Record,a_First_Name
    track 
} from 'lwc';
//import { CloseActionScreenEvent } from 'lightning/actions';
// import apex method
import m_Insert_A_Student_Record from "@salesforce/apex/StudentRecordSaveHandler.m_Insert_A_Student_Record";
  
// import standard toast event
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
  
export default class studentApplicationForm extends LightningElement {

    @api a_First_Name_Ref;
    @api a_Last_Name_Ref;
    @api a_Mobile_Number_Ref;
    @api a_Email_Ref;
    @api a_Address_Ref;

    /*closeAction(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }*/
    @track customFormModal = false; 
    
    customShowModalPopup() {            
        this.customFormModal = true;
    }

    customHideModalPopup() {    
        
        this.customFormModal = false;
    }
    
    handle_First_Name_Change(event) {
        this.a_First_Name_Ref = event.detail.value;
    }
  
    handle_Last_Name_Change(event) {
        this.a_Last_Name_Ref = event.detail.value;
    }
    
    handle_Mobile_number_Change(event){
        this.a_Mobile_Number_Ref = event.detail.value;
    }

    handle_Email_Change(event) {
        this.a_Email_Ref = event.detail.value;                     //C_Sample_Class,m_Insert_A_Contact_Record,a_First_Name
    }
  
    handle_address_Change(event){
        this.a_Address_Ref = event.detail.value;
    }
        
    handle_Save(event){
        // Refering to first method and passwing parameters.
        // Note: a_First_Name, a_Last_Name and a_Email are parameters for the method.
        // all Ref variables are @api references.  
         
        m_Insert_A_Student_Record({ 
            a_First_Name : this.a_First_Name_Ref, 
            a_Last_Name : this.a_Last_Name_Ref, 
            a_Mobile_Number : this.a_Mobile_Number_Ref,
            a_Email : this.a_Email_Ref,
            a_Address : this.a_Address_Ref
        })
        .then(result => {
            const event = new ShowToastEvent({
                title: 'Student Record created',
                message: 'New Student '+ this.a_First_Name_Ref +' '+ this.a_Last_Name_Ref +' created.',
                variant: 'success'
            });
            this.dispatchEvent(event);
        })
        .catch(error => {
            const event = new ShowToastEvent({
                title : 'Error',
                message : 'Error creating contact. Please Contact System Admin',
                variant : 'error'
            });
            this.dispatchEvent(event);
        });
    }
}
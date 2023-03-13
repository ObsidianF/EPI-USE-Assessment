import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IssueServiceService} from '../issue-service.service';

@Component({
  selector: 'app-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.css']
})
export class IssueCreateComponent {

  constructor(public issueservice: IssueServiceService) { }

  ngOnInit(): void{

  }
  
 onaddissue(issueform: NgForm){
    if (issueform.invalid){
      alert("Invalid")
      return
    }
    alert(issueform.value.enteredID+':'+issueform.value.enteredName+':'+issueform.value.enteredSurname+':'+issueform.value.enteredBirthdate+':'+issueform.value.enteredEmployeenumber
    +':'+issueform.value.enteredSalary+':'+issueform.value.enteredPosition+':'+issueform.value.enteredManager)

   this.issueservice.addissue_service(issueform.value.enteredID,issueform.value.enteredName,issueform.value.enteredSurname,issueform.value.enteredBirthdate,issueform.value.enteredEmployeenumber
      ,issueform.value.enteredSalary,issueform.value.enteredPosition,issueform.value.enteredManager)
    issueform.resetForm()
    
  }
  
}

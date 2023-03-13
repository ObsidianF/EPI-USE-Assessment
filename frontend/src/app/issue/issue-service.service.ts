import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueServiceService {

  private issuesdisplay: { _id: string; id: string; name:string, surname: string,birth_date: string,employee_number: string,salary: string,position: string,manager: string, __v: string }[] = [];
  private updatedissuesdisplay = new Subject<
    { _id: string; id: string; name: string, surname: string,birth_date: string,employee_number: string,salary: string,position: string,manager: string, __v: string }[]
  >();

  constructor(private http: HttpClient) {}

  addissue_service(pid: string, pname: string, psurname: string,pbirth_date: string,pemployee_number: string,psalary: string,pposition: string,pmanager: string) {
    this.http.post<{ message: string; issue: any }>('https://localhost:9000/api/issues', { id:pid,name:pname,surname:psurname,birth_date:pbirth_date,employee_number:pemployee_number,salary:psalary,position:pposition,manager:pmanager})
      .subscribe((theissue) => {
        this.issuesdisplay.push(theissue.issue);
        this.updatedissuesdisplay.next([...this.issuesdisplay]);
      });
  }

  getissue_service() {
    this.http
      .get<{ message: string; issues: any }>('https://localhost:9000/api/issues')
      .subscribe((theissue) => {
        this.issuesdisplay = theissue.issues;
        this.updatedissuesdisplay.next([...this.issuesdisplay]);
      });
  }

  deleteissue_service(issueid: string) {

    this.http.delete('https://localhost:9000/api/issues/' + issueid)
      .subscribe(() => {

        const updatedissuesdeleted = this.issuesdisplay.filter(issue=> issue._id !== issueid);
        this.issuesdisplay = updatedissuesdeleted;
        this.updatedissuesdisplay.next([...this.issuesdisplay]);
      })
  }

  getUpdateListener(){
    return this.updatedissuesdisplay.asObservable();
  }
}
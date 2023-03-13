
import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Subscription } from 'rxjs';
import { IssueServiceService } from '../issue-service.service';

interface EmployeeNode {
  name: string;
  position: string;
  children?: EmployeeNode[];
}



interface EmployeeFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  position: string;
}

@Component({
  selector: 'app-issue-display',
  templateUrl: './issue-display.component.html',
  styleUrls: ['./issue-display.component.css']
})
export class IssueDisplayComponent implements OnInit {

  treeControl = new FlatTreeControl<EmployeeFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  private transformer = (node: EmployeeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
      position: node.position
    };
  }

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  issues: {
    _id:string,
    id: string,
    name: string,
    surname: string,
    birth_date: string,
    employee_number: string,
    salary: string,
    position: string,
    manager: string,
    __v: string
  }[] = [];

  constructor(public issueservice: IssueServiceService) { }

  private issuesubscription!: Subscription;

  ngOnInit() {
    this.issueservice.getissue_service();
    this.issuesubscription = this.issueservice.getUpdateListener()
      .subscribe((issues: {
        _id:string,
        id: string,
        name: string,
        surname: string,
        birth_date: string,
        employee_number: string,
        salary: string,
        position: string,
        manager: string,
        __v: string}[]) => {
        this.issues = issues;
        const tree = this.buildTree(this.issues);
        this.dataSource.data = tree;
      });
  }

  
  buildTree(issues: any[]) {
    const tree: any[] = [];
    const positions = issues.reduce((acc, cur) => {
      if (!acc[cur.position]) {acc[cur.position] = [];
      }
      acc[cur.position].push({ name: `${cur.name} ${cur.surname} ${cur.birth_date} ${cur.employee_number} ${cur.salary} ${cur.manager}`, position: cur.position, children: [] });
      return acc;
    }, {});

    Object.entries(positions).forEach(([position, employees]) => {
      tree.push({ name: position, position, children: employees });
    });

    return tree;
  }

  hasChild = (_: number, node: EmployeeFlatNode) => node.expandable;

  ngOnDestroy()
  {
    this.issuesubscription.unsubscribe();
  }

  ondelete(issueid: string) {
    this.issueservice.deleteissue_service(issueid)
  }

}

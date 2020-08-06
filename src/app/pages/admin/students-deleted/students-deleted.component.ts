import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-students-deleted',
  templateUrl: './students-deleted.component.html',
  styleUrls: ['./students-deleted.component.scss']
})
export class StudentsDeletedComponent implements OnInit {
  students: User[] = [];
  constructor(private userService: UserService) {
    userService.getStudentsDeleted().subscribe((students: User[]) => {
      this.students = students;
    });
  }

  ngOnInit(): void {
  }

}

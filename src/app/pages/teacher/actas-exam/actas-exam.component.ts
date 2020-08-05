import { Component, OnInit } from '@angular/core';
import { Course } from '../../../models/course.model';
import { User } from '../../../models/user.model';
import { ActasExamService } from './actas.service';

@Component({
  selector: 'app-actas-exam',
  templateUrl: './actas-exam.component.html',
  styleUrls: ['./actas-exam.component.scss']
})
export class ActasExamComponent implements OnInit {
  courses: Course[] = [];
  course: Course;
  students: User[] = [];
  constructor(private actasExamService: ActasExamService) { }

  ngOnInit(): void {
    this.actasExamService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }
  handleCourseSelected(evt) {
    this.course = evt;

  }
}

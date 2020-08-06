import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../models/user.model';
import { ActasExamService } from '../actas.service';
import { Course } from '../../../../models/course.model';

@Component({
  selector: 'app-listado-exam',
  templateUrl: './listado-exam.component.html',
  styleUrls: ['./listado-exam.component.scss']
})
export class ListadoExamsComponent implements OnInit {
  @Input() students: any[] = [];
  constructor(private actasExamService: ActasExamService ) { }

  ngOnInit(): void {
  }

}

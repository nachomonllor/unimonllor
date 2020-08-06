import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listado-nodirecta',
  templateUrl: './listado-nodirecta.component.html',
  styleUrls: ['./listado-nodirecta.component.scss']
})
export class ListadoNodirectaComponent implements OnInit {
  @Input() students: any[];
  constructor() { }

  ngOnInit(): void {
    this.students = this.students.filter(el => el.note < 7);
    debugger
  }

}

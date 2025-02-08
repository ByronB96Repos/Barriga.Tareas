import { Component } from '@angular/core';
import { TareaService } from '../../../services/tarea.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private tareasService: TareaService, private router: Router) {}

  ngOnInit() {
    console.log(localStorage.getItem('token'));
    this.tareasService.getTarea();
  }
}

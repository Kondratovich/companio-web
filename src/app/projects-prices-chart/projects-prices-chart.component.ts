import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Project } from '../projects/project.model';
import { ProjectService } from '../projects/project.service';
import { ErrorDialogService } from '../shared/components/error-dialog/error-dialog.service';

@Component({
  selector: 'app-projects-prices-chart',
  templateUrl: './projects-prices-chart.component.html'
})
export class ProjectsPricesChartComponent implements OnInit {
  projects!: Project[];
  chartData: { name: string, value: number }[] = [];

  constructor(
    private projectService: ProjectService,
    private errorDialogService: ErrorDialogService
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe({
        next: projects => {
          this.projects = projects,
            this.updateChartData();
        },
        error: error => this.errorDialogService.openDialog(error.message)
      });
  }

  updateChartData(): void {
    this.chartData = [];
    this.projects.forEach(project => {
      this.chartData.push({ name: project.name, value: project.price });
    });
  }
}
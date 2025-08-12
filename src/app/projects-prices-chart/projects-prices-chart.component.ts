import { Component, inject, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Project } from '../projects/project.model';
import { ProjectService } from '../projects/project.service';
import { ErrorDialogService } from '../shared/components/error-dialog/error-dialog.service';

@Component({
  selector: 'app-projects-prices-chart',
  templateUrl: './projects-prices-chart.component.html',
  imports: [NgxChartsModule]
})
export class ProjectsPricesChartComponent implements OnInit {
  private projectService = inject(ProjectService);
  private errorDialogService = inject(ErrorDialogService);

  projects!: Project[];
  chartData: { name: string, value: number }[] = [];

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe({
        next: projects => {
          this.projects = projects;
          this.updateChartData();
        },
        error: error => this.errorDialogService.open(error.message)
      });
  }

  updateChartData(): void {
    this.chartData = [];
    this.projects.forEach(project => {
      this.chartData.push({ name: project.name, value: project.price });
    });
  }
}
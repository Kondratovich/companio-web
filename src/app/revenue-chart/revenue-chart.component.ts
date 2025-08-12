import { Component, inject, OnInit } from '@angular/core';
import { Project } from '../projects/project.model';
import { ProjectService } from '../projects/project.service';
import { ErrorDialogService } from '../shared/components/error-dialog/error-dialog.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  imports: [NgxChartsModule]
})
export class RevenueChartComponent implements OnInit {
  private projectService = inject(ProjectService);
  private errorDialogService = inject(ErrorDialogService);

  projects!: Project[];
  chartData: { name: string, series: { value: number, name: string | undefined }[] }[] = [];

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
    this.chartData = [{
      name: "Доход ($)",
      series: []
    }];

    this.projects.sort((a, b) => {
      const dateA = new Date(a.dateAdded || 0);
      const dateB = new Date(b.dateAdded || 0);
      return dateA.getTime() - dateB.getTime();
    });

    let totalPrice = 0;
    this.projects.forEach(project => {
      totalPrice += project.price;
      this.chartData[0].series.push({ name: project.dateAdded?.toString().substring(0, 10), value: totalPrice });
    });
  }
}
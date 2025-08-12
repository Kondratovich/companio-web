import { Component, inject, OnInit } from '@angular/core';
import { ErrorDialogService } from '../shared/components/error-dialog/error-dialog.service';
import { Task, TaskStatus } from '../tasks/task.model';
import { TaskService } from '../tasks/task.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-tasks-statuses-chart',
  templateUrl: './tasks-statuses-chart.component.html',
  imports: [NgxChartsModule]
})
export class TasksStatusesChartComponent implements OnInit {
  private taskService = inject(TaskService);
  private errorDialogService = inject(ErrorDialogService);

  tasks!: Task[];
  chartData: { name: string, value: number }[] = [];

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.taskService.getTasks()
      .subscribe({
        next: tasks => {
          this.tasks = tasks;
          this.updateChartData();
        },
        error: error => this.errorDialogService.open(error.message)
      });
  }

  updateChartData(): void {
    this.chartData = [];
    const counts = {
      [TaskStatus.NotStarted]: this.tasks.filter(t => t.status === TaskStatus.NotStarted).length,
      [TaskStatus.InProgress]: this.tasks.filter(t => t.status === TaskStatus.InProgress).length,
      [TaskStatus.Done]: this.tasks.filter(t => t.status === TaskStatus.Done).length
    };

    this.chartData.push({ name: TaskStatus[0], value: counts[TaskStatus.NotStarted] });
    this.chartData.push({ name: TaskStatus[1], value: counts[TaskStatus.InProgress] });
    this.chartData.push({ name: TaskStatus[2], value: counts[TaskStatus.Done] });
  }
}
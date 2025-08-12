import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { HttpClient } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru'; // to register french
import { CommonModule, registerLocaleData } from '@angular/common';
import { startOfDay, endOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { AbsenceTimelineService } from './absenceTimeline.service';
import { ErrorDialogService } from '../shared/components/error-dialog/error-dialog.service';
import { Absence, AbsenceTimeline } from './absenceTimeline.model';
import { ConfirmDialogService } from '../shared/components/confirm-dialog/confirm-dialog.service';
import { AppMaterialModule } from "../shared/modules/app.material.module";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

interface Holiday {
  date: string;
  localName: string;
}

type CalendarEventWithMeta = CalendarEvent<
  { type: 'holiday'; holiday: Holiday } | { type: 'normal' }
>;

@Component({
  selector: 'app-absence-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './absence-calendar.component.html',
  imports: [AppMaterialModule, CalendarModule, CommonModule, FormsModule],
})
export class DemoComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  activeDayIsOpen = true;
  viewDate: Date = new Date();
  events: CalendarEventWithMeta[] = [];
  absenceTimeline!: AbsenceTimeline;
  refresh = new Subject<void>();
  displaySaveButton = false;
  minDate: Date = new Date();
  maxDate: Date = new Date(this.minDate.getFullYear() + 1, 0, 0);

  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private errorDialogService = inject(ErrorDialogService);
  private dialogService = inject(ConfirmDialogService);
  private absenceTimelineService = inject(AbsenceTimelineService);
  private auhtService = inject(AuthService);

  ngOnInit(): void {
    registerLocaleData(localeRu);
    this.fetchHolidays();
    this.getAbsenceTimeline();
  }

  private fetchHolidays() {
    this.http.get<Holiday[]>(`https://date.nager.at/api/v3/PublicHolidays/${new Date().getFullYear()}/BY`).subscribe(holidays => {
      console.log(holidays)
      this.events = holidays.map((holiday) => {
        return {
          start: new Date(holiday.date),
          title: holiday.localName,
          allDay: true,
          meta: {
            type: 'holiday',
            holiday,
          },
        };
      });
      this.cdr.markForCheck();
    });
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  addEvent(): void {
    this.displaySaveButton = true;
    this.events = [
      ...this.events,
      {
        title: 'Отпуск',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: {
          primary: '#00ff0c',
          secondary: '#00ff0c',
        },
        draggable: true
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.displaySaveButton = true;
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  getEditableEvents(): CalendarEventWithMeta[] {
    return this.events.filter(e => e.meta?.type !== 'holiday');
  }

  getAbsenceTimeline(): void {
    this.absenceTimelineService.getAbsenceTimelines(this.auhtService.getUserId())
      .subscribe({
        next: absenceTimelines => {

          if (absenceTimelines.length == 0)
            this.errorDialogService.open("Отсутсвует AbsenceTimeline для пользователя ;( ");

          this.absenceTimeline = absenceTimelines[0];
          absenceTimelines[0].absences?.forEach(element => {
            this.events = [
              ...this.events,
              {
                start: new Date(element.startDate),
                end: new Date(element.endDate),
                title: element.absenceName!,
                color: {
                  primary: '#00ff0c',
                  secondary: '#00ff0c',
                },
              },
            ];
          });
          this.cdr.markForCheck();
        },
        error: error => this.errorDialogService.open(error.message)
      });
  }

  onEventArrayChange() {
    this.displaySaveButton = true;
    this.refresh.next();
  }

  saveAbsences(): void {
    this.absenceTimeline.absences = this.events.filter(e => e.meta?.type !== 'holiday').map(e => {
      return new Absence(e.title, e.start, e.end);
    });

    this.absenceTimelineService.updateAbsenceTimeline(this.absenceTimeline).subscribe({
      error: error => this.errorDialogService.open(error.message)
    });
    this.displaySaveButton = true;
  }

  openDialog() {
    const options = {
      title: 'Сохранить изменения отпусков',
      message: 'Вы уверены?',
      cancelText: 'Нет',
      confirmText: 'Да'
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.saveAbsences();
      }
    });
  }
}
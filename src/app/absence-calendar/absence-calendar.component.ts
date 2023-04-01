import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru'; // to register french
import { registerLocaleData } from '@angular/common';

interface Holiday {
  date: string;
  localName: string;
}

type CalendarEventWithMeta = CalendarEvent<
  { type: 'holiday'; holiday: Holiday } | { type: 'normal' }
>;

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './absence-calendar.component.html',
})
export class DemoComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  activeDayIsOpen: boolean = true;
  viewDate: Date = new Date();
  events: CalendarEventWithMeta[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    registerLocaleData(localeRu);
    this.fetchHolidays();
  }

  private fetchHolidays() {
    this.http.get<Holiday[]>('https://date.nager.at/api/v3/PublicHolidays/2023/BY').subscribe(holidays => {
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
}
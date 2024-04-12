"use client";
// import { registerLicense } from "@syncfusion/ej2-base";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
} from "@syncfusion/ej2-react-schedule";

import "@/components/ui/schedulers/CalendarComponent.css";

import * as React from "react";
import SyncfusionWrapper from "@/components/wrappers/SyncfusionWrapper";

interface ICalendarComponentProps {}

const CalendarComponent: React.FunctionComponent<ICalendarComponentProps> = (
  props
) => {
  return (
    <SyncfusionWrapper>
      <ScheduleComponent>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </SyncfusionWrapper>
  );
};

export default CalendarComponent;

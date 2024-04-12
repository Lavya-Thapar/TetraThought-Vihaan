"use client";
import * as React from "react";
import "@/components/ui/schedulers/GanttComponent.css";
// import { registerLicense } from "@syncfusion/ej2-base";
import SyncfusionWrapper from "@/components/wrappers/SyncfusionWrapper";

// import * as ReactDOM from "react-dom";
import {
  GanttComponent,
  TaskFieldsModel,
  Edit,
  Selection,
  Toolbar,
  Inject,
  EditSettingsModel,
  ContextMenu,
  RowDD,
  SelectionSettingsModel,
  LabelSettingsModel,
  TimelineSettingsModel,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-gantt";

import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data"

import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { useSession } from "next-auth/react";

const GanttData: object[] = [
  {
    task_id: "task2",
    task_name: "Task 2",
    start_time: "2024-03-23T17:49:40.681Z",
    end_time: "2024-03-29T02:30:00.681Z",
    Progress: 75,
    description: "Description for Task 3",
    completed: false,
  },
  {
    task_id: "task1",
    task_name: "Task 1",
    start_time: "2024-03-23T17:49:40.681Z",
    end_time: "2024-03-29T02:30:00.681Z",
    parent_id: "task2",
    Progress: 25,
    description: "Description for Task 3",
    completed: false,
  },
];
export default function CustomGanttComponent() {
  const session = useSession()
  const email = session.data?.user?.email
  const taskFields: TaskFieldsModel = {
    id: "task_id",
    name: "task_name",
    startDate: "start_time",
    endDate: "end_time",
    duration: "duration",
    progress: "Progress",
    parentID: "parent_id",
    dependency: "Predecessor",
    expandState: "isExpanded",
  };
  const editOptions: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
  };
  const selectionSettings: SelectionSettingsModel = {
    type: "Multiple",
  };

  const labelSettings: LabelSettingsModel = {
    rightLabel: "Task Name: ${taskData.task_name}",
    taskLabel: "${Progress}%",
  };
  const toolbarOptions = [
    "Add",
    "Delete",
    "Indent",
    "Outdent",
    "ZoomIn",
    "ZoomOut",
    "ZoomToFit",
  ];

  let timelineSettings: TimelineSettingsModel = {
    updateTimescaleView: false,
  };

  const modes = [
    { item: "Hour", id: "1" },
    { item: "Day", id: "2" },
    { item: "Week", id: "3" },
    { item: "Month", id: "4" },
    { item: "Year", id: "5" },
  ];

  // function onChange(args:any) {
  //   if (args.value === "1") {
  //     ganttInstance.timelineSettings.timelineViewMode = "Hour";
  //   } else if (args.value === "2") {
  //     ganttInstance.timelineSettings.timelineViewMode = "Day";
  //   } else if (args.value === "3") {
  //     ganttInstance.timelineSettings.timelineViewMode = "Week";
  //   } else if (args.value === "4") {
  //     ganttInstance.timelineSettings.timelineViewMode = "Month";
  //   } else if (args.value === "5") {
  //     ganttInstance.timelineSettings.timelineViewMode = "Year";
  //   }
  // }

  const datasource = React.useMemo<DataManager>(
    () =>
      new DataManager({
        url: `http://localhost:3000/api/users/GetData/${email}/${"default"}/`, // "default is placeholder for now"
        adaptor: new WebApiAdaptor(),
        crossDomain: true,
      }),
    [email]
  );

  const fields = { text: "item", value: "id" };
  return (
    <SyncfusionWrapper>
      <DropDownListComponent
        id="modes"
        placeholder="Select"
        dataSource={modes}
        fields={fields}
        width="150px"
      />
      <GanttComponent
        dataSource={GanttData}
        editSettings={editOptions}
        toolbar={toolbarOptions}
        height="900px"
        taskFields={taskFields}
        timelineSettings={timelineSettings}
        allowSelection={true}
        allowSorting={true}
        allowResizing={true}
        enableContextMenu={true}
        allowRowDragAndDrop={true}
        selectionSettings={selectionSettings}
        allowTaskbarDragAndDrop={true}
        labelSettings={labelSettings}
      >
        <ColumnsDirective>
          <ColumnDirective headerText="S.No." field="task_id" width="150"></ColumnDirective>
          <ColumnDirective headerText="Task Name" field="task_name" width="250"></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[RowDD, Edit, Selection, Toolbar, ContextMenu]} />
      </GanttComponent>
    </SyncfusionWrapper>
  );
}

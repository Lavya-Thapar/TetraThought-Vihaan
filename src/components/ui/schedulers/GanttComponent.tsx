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
  AddDialogFieldsDirective,
  AddDialogFieldDirective,
  AddDialogFieldSettings,
  EditDialogFieldsDirective,
  EditDialogFieldDirective,
} from "@syncfusion/ej2-react-gantt";

import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";

import { useSession } from "next-auth/react";

export default function CustomGanttComponent() {
  const session = useSession();
  let ganttInstance: GanttComponent;
  const [current_url, setcurrent_url] = React.useState<string>("");
  const email = session.data?.user?.email;
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
    notes: "notes",
  };
  const editOptions: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    mode: "Dialog",
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
    updateTimescaleView: true,
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
  React.useEffect(() => {
    setcurrent_url(window.location.origin);
    console.log(ganttInstance);
  },[]);

  console.log(current_url);

  const datasource = React.useMemo<DataManager>(
    () =>
      new DataManager({
        url: `${current_url}/api/GetData/manikyasharma.ms@gmail.com/default`, // "default is placeholder for now"
        adaptor: new WebApiAdaptor(),
        crossDomain: true,
      }),
    [email]
  );
  const dayWorkingTime = [{ from: 9, to: 18 }];

  const fields = { text: "item", value: "id" };

  return (
    <SyncfusionWrapper>
      {/* <DropDownListComponent
        id="modes"
        placeholder="Select"
        dataSource={modes}
        fields={fields}
        width="150px"
      /> */}
      <GanttComponent
        dataSource={datasource}
        editSettings={editOptions}
        toolbar={toolbarOptions}
        height="900px"
        includeWeekend={true}
        dayWorkingTime={dayWorkingTime}
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
          <ColumnDirective
            headerText="S.No."
            field="task_id"
            width="150"
          ></ColumnDirective>
          <ColumnDirective
            headerText="Task Name"
            field="task_name"
            width="250"
          ></ColumnDirective>
        </ColumnsDirective>

        <AddDialogFieldsDirective>
          <AddDialogFieldDirective
            type="General"
            headerText="General"
            fields={[
              "task_id",
              "task_name",
              "start_time",
              "end_time",
              "duration",
              "notes",
            ]}
          ></AddDialogFieldDirective>
          <AddDialogFieldDirective type="Dependency"></AddDialogFieldDirective>
          <AddDialogFieldDirective type="Resources"></AddDialogFieldDirective>
        </AddDialogFieldsDirective>

        <EditDialogFieldsDirective>
          <EditDialogFieldDirective
            type="General"
            headerText="General"
            fields={[
              "task_id",
              "task_name",
              "start_time",
              "end_time",
              "duration",
              "notes",
            ]}
          ></EditDialogFieldDirective>
          <EditDialogFieldDirective type="Dependency"></EditDialogFieldDirective>
          <EditDialogFieldDirective type="Resources"></EditDialogFieldDirective>
        </EditDialogFieldsDirective>

        <Inject services={[RowDD, Edit, Selection, Toolbar, ContextMenu]} />
      </GanttComponent>
    </SyncfusionWrapper>
  );
}

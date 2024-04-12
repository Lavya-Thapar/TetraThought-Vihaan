"use client";
import { FC, useMemo, useEffect,useState } from "react";
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
} from "@syncfusion/ej2-react-gantt";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
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

// let userid = "65fd93e9013acedd6f51891a";

interface IGanttChartProps {}
export const GanttChart: FC<IGanttChartProps> = (props) => {
  let session = useSession();
  const userid = session.data?.user?.id;
  console.log(userid);

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

  const datasource = useMemo<DataManager>(
    () =>
      new DataManager({
        url: `http://localhost:3000/api/users/GetData/${userid}`,
        adaptor: new WebApiAdaptor(),
        crossDomain: true,
      }),
    [userid]
  );

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
  const toolbarOptions = ["Add", "Delete", "Indent", "Outdent"];
  return (
    userid && (
      <GanttComponent
        ref = {}
        dataSource={datasource}
        editSettings={editOptions}
        toolbar={toolbarOptions}
        height="100vh"
        taskFields={taskFields}
        allowSelection={true}
        allowSorting={true}
        allowResizing={true}
        enableContextMenu={true}
        allowRowDragAndDrop={true}
        selectionSettings={selectionSettings}
        allowTaskbarDragAndDrop={true}
        labelSettings={labelSettings}
      >
        <Inject services={[RowDD, Edit, Selection, Toolbar, ContextMenu]} />
      </GanttComponent>
    )
  );
};

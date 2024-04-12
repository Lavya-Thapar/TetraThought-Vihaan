import * as React from "react";
import * as ReactDOM from "react-dom";
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
  const toolbarOptions = ["Add", "Delete", "Indent", "Outdent"];
  return (
    <GanttComponent
      dataSource={GanttData}
      editSettings={editOptions}
      toolbar={toolbarOptions}
      height="900px"
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
  );
}

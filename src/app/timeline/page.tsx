"use client";
import CustomGanttComponent from "@/components/ui/schedulers/GanttComponent";
import { registerLicense } from "@syncfusion/ej2-base";
import { GanttComponent } from "@syncfusion/ej2-react-gantt";
import * as React from "react";

interface IPageProps {}

const Page: React.FunctionComponent<IPageProps> = (props) => {
  registerLicense(
    "ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5QdEdiWH5XcHZQRmBf"
  );

  return (
    <CustomGanttComponent />
  );
};

export default Page;

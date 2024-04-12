import * as React from "react";
import { registerLicense } from "@syncfusion/ej2-base";

interface ISyncfusionClientWrapperProps {
  children: React.ReactNode;
  license: string;
}

const SyncfusionClientWrapper: React.FunctionComponent<
  ISyncfusionClientWrapperProps
> = (props) => {
  console.log("On client wrapper")
  console.log(props.license)
  console.log(props.test)
  console.log("On client wrapper end")

  registerLicense("ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5QdEdiWH5XcHZQRmBf");
  return <>{props.children}</>;
};

export default SyncfusionClientWrapper;

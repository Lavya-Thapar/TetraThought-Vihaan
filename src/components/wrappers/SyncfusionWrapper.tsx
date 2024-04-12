import * as React from 'react';
import SyncfusionClientWrapper from './SyncfusionClientWrapper';
import { registerLicense } from "@syncfusion/ej2-base";

interface ISyncfusionWrapperProps {
  children:React.ReactNode
}

const SyncfusionWrapper: React.FunctionComponent<ISyncfusionWrapperProps> = (props) => {
  registerLicense("ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5QdEdiWH5XcHZQRmBf");
  return <>{props.children}</>
};

export default SyncfusionWrapper;

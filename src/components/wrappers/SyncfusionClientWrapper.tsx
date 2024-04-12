import * as React from "react";

interface ISyncfusionClientWrapperProps {
  children: React.ReactNode;
  license: string;
}

const SyncfusionClientWrapper: React.FunctionComponent<
  ISyncfusionClientWrapperProps
> = (props) => {
  console.log("On client wrapper")
  console.log(props.license)
  console.log("On client wrapper end")

  return <>{props.children}</>;
};

export default SyncfusionClientWrapper;

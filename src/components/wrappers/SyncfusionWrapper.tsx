import * as React from 'react';
import SyncfusionClientWrapper from './SyncfusionClientWrapper';

interface ISyncfusionWrapperProps {
  children:React.ReactNode
}

const SyncfusionWrapper: React.FunctionComponent<ISyncfusionWrapperProps> = (props) => {
  const license = process.env.SYNCFUSION_LICENSE as string
  console.log(typeof license)
  console.log(license);
  const test = "test"

  return <SyncfusionClientWrapper test={test} license={license}>{props.children}</SyncfusionClientWrapper>
};

export default SyncfusionWrapper;

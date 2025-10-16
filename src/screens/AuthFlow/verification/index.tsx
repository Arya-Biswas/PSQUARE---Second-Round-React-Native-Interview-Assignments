import React, {useEffect, useState} from 'react';
import { OtpVerificationView } from './VerificationView';

const OtpVerification = (props: any) => {

  const {data, method} = props?.route?.params || {};

  return (
    <OtpVerificationView
     
      data={data}
      method={method}
     
    />
  );
};

export default OtpVerification;

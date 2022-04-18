import React, {useEffect, useState} from 'react';
import { Contextprovider } from './Components/SocketContext';
import RegApp from './Components/RegApp'
const Call = () => {


  return (
    <>
      <Contextprovider>
          <RegApp />
      </Contextprovider>
    </>
  )
}

export default Call;

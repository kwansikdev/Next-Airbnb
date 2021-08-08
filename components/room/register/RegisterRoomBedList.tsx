import React from 'react';

import RegisterRoomBedTypes from './RegisterRoomBedTypes';
import RegisterRoomPublicBedTypes from './RegisterRoomPublicBedTypes';

import { useSelector } from '../../../store';

const RegisterRoomBedList = () => {
  const bedList = useSelector((state) => state.registerRoom.bedList);

  return (
    <ul className='register-room-bed-type-list-wrapper'>
      {bedList.map((bedroom) => (
        <RegisterRoomBedTypes bedroom={bedroom} />
      ))}
      <RegisterRoomPublicBedTypes />
    </ul>
  );
};

export default RegisterRoomBedList;

import React from 'react';
import { useDispatch } from 'react-redux';

import Counter from '../../common/Counter';
import Selector from '../../common/Selector';
import RegisterRoomBedList from './RegisterRoomBedList';

import { bedroomCountList } from '../../../lib/staticData';
import { getNumber } from '../../../lib/utils';

import { useSelector } from '../../../store';
import { registerRoomAictions } from '../../../store/registerRoom';

import styled from 'styled-components';
import palette from '../../../styles/palette';
import RegisterRoomFooter from './RegisterRoomFooter';

const Container = styled.div`
  padding: 62px 30px 100px;

  h2 {
    margin-bottom: 56px;
    font-size: 19px;
    font-weight: 800;
  }

  h3 {
    margin-bottom: 6px;
    font-weight: bold;
    color: ${palette.gray_76};
  }

  .register-room-step-info {
    max-width: 400px;
    margin-bottom: 24px;
    font-size: 14px;
    word-break: keep-all;
  }

  .register-room-maximum-guest-count-wrapper {
    width: 320px;
    margin-top: 24px;
    margin-bottom: 32px;
  }

  .register-room-bedroom-count-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }

  .register-room-bed-count-wrapper {
    width: 320px;
    margin-bottom: 57px;
  }

  .register-room-bed-type-info {
    margin-top: 6px;
    margin-bottom: 20px;
    max-width: 400px;
    word-break: keep-all;
  }

  .register-room-bed-type-list-wrapper {
    width: 548px;
  }

  .register-room-bedroom {
    width: 100%;
    padding: 20px 0;
    border-top: 1px solid ${palette.gray_dd};

    &:last-child {
      border-bottom: 1px solid ${palette.gray_dd};
    }
  }

  .register-room-bed-type-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .register-room-bed-type-bedroom {
    font-size: 19px;
    color: ${palette.gray_48};
  }
`;

const RegisterRoomBedrooms = () => {
  const dispatch = useDispatch();

  const maximumGuestCount = useSelector((state) => state.registerRoom.maximumGuestCount);
  const bedroomCount = useSelector((state) => state.registerRoom.bedroomCount);
  const bedCount = useSelector((state) => state.registerRoom.bedCount);
  const bedList = useSelector((state) => state.registerRoom.bedList);

  const onChangeMaximumGuestCount = (value: number) => {
    dispatch(registerRoomAictions.setMaximumGuestCount(value));
  };

  const onChangeBedroomCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomAictions.setBedroomCount(getNumber(e.target.value) || 0));
  };

  const onChangeBedCount = (value: number) => {
    dispatch(registerRoomAictions.setBedCount(value));
  };

  return (
    <Container>
      <h2>숙소에 얼마나 많은 인원이 숙박할 수 있나요?</h2>
      <h3>2단계</h3>
      <p className='register-room-step-info'>
        모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어 있는지 확인하세요.
      </p>
      <div className='register-room-maximum-guest-count-wrapper'>
        <Counter
          label='최대 숙박 인원'
          value={maximumGuestCount}
          onChange={onChangeMaximumGuestCount}
        />
      </div>
      <div className='register-room-bedroom-count-wrapper'>
        <Selector
          type='register'
          label='게스트가 사용할 수 있는 침실은 몇 개인가요?'
          value={`침실 ${bedroomCount}개`}
          options={bedroomCountList}
          onChange={onChangeBedroomCount}
        />
      </div>
      <div className='register-room-bed-count-wrapper'>
        <Counter label='침대' value={bedCount} onChange={onChangeBedCount} />
      </div>
      <h4>침대 유형</h4>
      <p className='register-room-bed-type-info'>
        각 침실에 놓인 침대 우형을 명시하면 숙소에 침대가 어떻게 구비되어 있는지 게스트가 잘 파악할
        수 있습니다.
      </p>
      <RegisterRoomBedList />
      <RegisterRoomFooter
        prevHref='/room/register/building'
        nextHref='/room/register/bathroom'
        isValid={!!bedroomCount}
      />
    </Container>
  );
};

export default RegisterRoomBedrooms;

import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../store';
import { registerRoomAictions } from '../../store/registerRoom';

import Selector from '../common/Selector';

import { largeBuildingTypeList } from '../../lib/staticData';

import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.div`
  padding: 62px 30px 100px;

  .register-room-building-selector-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
`;

const RegisterRoomBuilding: React.FC = () => {
  const dispatch = useDispatch();
  const largeBuildingType = useSelector((state) => state.registerRoom.largeBuildingType);

  const disabledlargeBuildingTypeOptions = ['하나를 선택해주세요.'];

  // 선택된 건물 유형 options
  const defailtBuildingOptions = useMemo(() => {
    switch (largeBuildingType) {
      case '아파트': {
        const { aparmentBuildingTypeList } = require('../../lib/staticData');

        dispatch(registerRoomAictions.setBuildingType(aparmentBuildingTypeList[0]));

        return aparmentBuildingTypeList;
      }
      case '주택': {
        const { houstBuildingTypeList } = require('../../lib/staticData');

        dispatch(registerRoomAictions.setBuildingType(houstBuildingTypeList[0]));

        return houstBuildingTypeList;
      }
      case '별채': {
        const { secondaryUnitBuildingTypeList } = require('../../lib/staticData');

        dispatch(registerRoomAictions.setBuildingType(secondaryUnitBuildingTypeList[0]));

        return secondaryUnitBuildingTypeList;
      }
      case '독특한 숙소': {
        const { uniqueSpaceBuildingTypeList } = require('../../lib/staticData');

        dispatch(registerRoomAictions.setBuildingType(uniqueSpaceBuildingTypeList[0]));

        return uniqueSpaceBuildingTypeList;
      }
      case 'B&B': {
        const { bnbBuildingTypeList } = require('../../lib/staticData');

        dispatch(registerRoomAictions.setBuildingType(bnbBuildingTypeList[0]));

        return bnbBuildingTypeList;
      }
      case '부티크호텔': {
        const { boutiquesHotelBuildingTypeList } = require('../../lib/staticData');

        dispatch(registerRoomAictions.setBuildingType(boutiquesHotelBuildingTypeList[0]));

        return boutiquesHotelBuildingTypeList;
      }
      default:
        return [];
    }
  }, [largeBuildingType]);

  // 큰 범위 건물 유형 변경 시
  const onChangeLargeBuildingType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomAictions.setLargeBuildingType(e.target.value));
  };

  // 상세 건물 유형 변경 시
  const onChangeBuildingType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomAictions.setBuildingType(e.target.value));
  };

  return (
    <Container>
      <h2>등록할 숙소 종류는 무엇인가요?</h2>
      <h3>1단계</h3>
      <div className='register-room-building-selector-wrapper'>
        <Selector
          type='register'
          value={largeBuildingType || undefined}
          defaultValue='하나를 선택해주세요'
          disabledOptions={disabledlargeBuildingTypeOptions}
          label='우선 범위를 좁혀볼까요?'
          options={largeBuildingTypeList}
          onChange={onChangeLargeBuildingType}
        />
      </div>
      <div className='register-room-building-selector-wrapper'>
        <Selector
          type='register'
          value={undefined}
          disabled={!largeBuildingType}
          label='건물 유형을 선택하세요'
          options={defailtBuildingOptions}
          onChange={onChangeBuildingType}
        />
      </div>
    </Container>
  );
};
export default RegisterRoomBuilding;

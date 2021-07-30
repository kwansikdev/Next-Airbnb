import React from 'react';
import { isEmpty } from 'lodash';

import RoomDetailPhotos from './RoomDetailPhotos';
import RoomDetailReservation from './RoomDetailReservation';
import RoomAmenityIcon from './RoomAmenityIcon';

import { useSelector } from '../../../store';

import styled from 'styled-components';
import palette from '../../../styles/palette';
import BedIcon from '../../../public/static/svg/room/detail/bed.svg';

const Container = styled.div`
  width: 1120px;
  margin: auto;
  padding-top: 26px;
  padding-bottom: 100px;

  .room-detail-title {
    margin-bottom: 15px;
    font-size: 26px;
    font-weight: 800;
  }

  .room-detail-location {
    margin-bottom: 24px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
    color: ${palette.gray_71};
  }

  .room-detail-contents {
    display: flex;
    justify-content: space-between;
  }

  .room-detail-infos {
    width: 644px;

    .room-detail-room-type {
      margin-bottom: 8px;
      font-size: 22px;
      font-weight: 800;
    }

    .room-detail-spac-counts {
      background-color: ${palette.gray_dd};
      width: 100%;
      height: 1px;
      margin: 32px 0;
    }

    .room-detail-description {
      white-space: break-spaces;
      word-break: keep-all;
    }
  }

  .room-detatil-bed-type-label {
    margin-bottom: 24px;
    font-size: 22px;
    font-weight: 600;
  }
  .room-detail-bed-type-list {
    display: flex;

    .room-detail-bedroom-card {
      width: 204px;
      margin-right: 16px;
      padding: 26px 24px;
      border: 1px solid ${palette.gray_dd};
      border-radius: 12px;

      svg {
        margin-bottom: 20px;
      }

      .room-detail-bed-card-number {
        margin-bottom: 12px;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }

  .room-detatil-conveniences-label {
    margin-bottom: 24px;
    font-size: 22px;
    font-weight: 600;
  }

  .room-detatil-conveniences-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    li {
      display: flex;
      align-items: center;
      width: 50%;
      margin-bottom: 16px;

      img {
        margin-right: 16px;
      }
    }
  }
`;

const RoomDetail: React.FC = () => {
  const room = useSelector((state) => state.room.detail);

  if (!room) return null;

  const getTranslatedRoomType = () => {
    switch (room.roomType) {
      case 'entire':
        return '집 전체';
      case 'private':
        return '개인실';
      default:
        return '';
    }
  };

  const getBedTypesText = (beds: { type: any; count: number }[]) => {
    const bedTypesText = beds
      .map((bed) => `${bed.type} ${bed.count}개,`)
      .join('')
      .slice(0, -1);

    return bedTypesText;
  };

  return (
    <Container>
      <h1 className='room-detail-title'>{room.title}</h1>
      <p className='room-detail-location'>
        {room.district}, {room.city}, {room.country}
      </p>
      <RoomDetailPhotos />
      <section className='room-detail-contents'>
        <div className='room-detail-infos'>
          <p className='room-detail-room-type'>
            {room.host.lastname}님의 호스팅하는 {getTranslatedRoomType()}
          </p>
          <p className='room-detail-space-counts'>
            인원 {room.maximumGuestCount}명 · 침실 {room.bedroomCount}개 · 침대
            {room.bedCount}개 · 욕실 {room.bathroomCount}개
          </p>
          <div className='room-detail-divider' />
          <p className='room-detail-description'>{room.description}</p>
          <div className='room-detail-divider' />
          {!isEmpty(room.bedList) && (
            <>
              <p className='room-detail-bed-type-label'>침대/침구 유형</p>
              <ul className='room-detail-bed-type-list'>
                {room.bedList.map((bedroom) => (
                  <li className='room-detail-bedroom-card' key={bedroom.id}>
                    <BedIcon />
                    <p className='room-detail-bed-card-number'>{bedroom.id}번 침실</p>
                    <p>{getBedTypesText(bedroom.beds)}</p>
                  </li>
                ))}
                {room.publicBedList.map((bedroom, index) => (
                  <li className='room-detail-bedroom-card' key={index}>
                    <BedIcon />
                    <p className='room-detail-bed-card-number'>공용 공간</p>
                    <p>{getBedTypesText([bedroom])}</p>
                  </li>
                ))}
              </ul>
              <div className='room-detail-divider' />
            </>
          )}
          {!isEmpty(room.conveniences) && (
            <>
              <p className='room-detail-conveniences-label'>편의시설</p>
              <ul className='room-detail-conveniences-list'>
                {room.conveniences.map((amenity, index) => (
                  <li key={index}>
                    <RoomAmenityIcon amenity={amenity} />
                    {amenity}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <RoomDetailReservation />
      </section>
    </Container>
  );
};

export default RoomDetail;

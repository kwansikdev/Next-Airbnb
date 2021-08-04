import React, { useMemo } from 'react';
import Link from 'next/link';
import { differenceInDays } from 'date-fns';

import { makeMoneyString } from '../../../lib/utils';
import { useSelector } from '../../../store';
import { RoomType } from '../../../types/room';

import styled, { css } from 'styled-components';
import palette from '../../../styles/palette';

const Container = styled.li<{ showMap: boolean }>`
  width: calc((100% - 48px) / 4);
  margin-bottom: 32px;
  margin-right: 16px;

  &::nth-child(4n) {
    margin-right: 0;
  }

  @media (min-width: 1440px) {
    width: calc((100% - 64px) / 5);

    &::nth-child(4n) {
      margin-right: 16px;
    }

    &::nth-child(5n) {
      margin-right: 0;
    }
  }

  .room-card-photo-wrapper {
    position: relative;
    width: 100%;
    margin-bottom: 14px;
    padding-bottom: 66.66%;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .room-card-room-info {
    margin-bottom: 8px;
    font-size: 12px;
    color: ${palette.gray_71};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .room-card-title {
    margin-bottom: 4px;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .room-card-price {
    margin-bottom: 4px;

    b {
      font-weight: 800;
    }
  }

  .room-card-total-price {
    font-size: ${palette.gray_71};
    color: ${palette.gray_71};
  }

  .room-bed-bath-room-info {
    display: none;
  }

  ${({ showMap }) =>
    showMap &&
    css`
      width: 60% !important;
      margin: 0;
      padding: 24px 0;
      border-bottom: 1px solid ${palette.gray_eb};

      &:first-child {
        padding-top: 0;
      }

      a {
        display: flex;
        width: 100%;

        .room-card-info-texts {
          position: relative;
          flex-grow: 1;
          height: 200px;
        }

        .room-card-photo-wrapper {
          width: 300px;
          min-width: 300px;
          height: 200px;
          margin-right: 16px;
          margin-bottom: 0;
          padding-bottom: 0;
          border-radius: 8px;
          overflow: hidden;
        }

        .room-card-room-info {
          margin-bottom: 13px;
          font-size: 14px;
        }

        .room-card-title {
          margin-bottom: 11px;
          font-size: 18px;
          white-space: break-spaces;
        }

        .room-card-text-divier {
          background-color: ${palette.gray_dd};
          width: 32px;
          height: 1px;
          margin-bottom: 10px;
        }

        .room-bed-bath-room-info {
          display: block;
          font-size: 14px;
          color: ${palette.gray_71};
        }

        .room-card-price {
          position: absolute;
          right: 0;
          bottom: 17px;
          margin: 0;
        }

        .room-card-total-price {
          position: absolute;
          right: 0;
          bottom: 0;
          text-decoration: underline;
        }
      }
    `}
`;

interface Props {
  room: RoomType;
  showMap: boolean;
}

const RoomCard: React.FC<Props> = ({ room, showMap }) => {
  const checkInDate = useSelector((state) => state.searchRoom.checkInDate);
  const checkOutDate = useSelector((state) => state.searchRoom.checkOutDate);

  const remainDays =
    checkOutDate && checkInDate && differenceInDays(new Date(checkOutDate), new Date(checkInDate));

  // 한글로 된 숙소 유형
  const translatedRoomType = useMemo(() => {
    switch (room.roomType) {
      case 'entrie':
        return '집 전체';
      case 'private':
        return '개인실';
      case 'public':
        return '공용';
      default:
        return '';
    }
  }, []);

  return (
    <Container showMap={showMap}>
      <Link href={`/room/${room.id}`}>
        <a>
          <div className='room-card-photo-wrapper'>
            <img src={room.photos[0]} alt='' />
          </div>
          <div className='room-card-info-texts'>
            <p className='room-card-room-info'>
              {room.buildingType} {translatedRoomType} {room.district} {room.city}
            </p>
            <p className='room-card-title'>{room.title}</p>
            <div className='room-card-text-divider' />

            <p className='room-card-price'>
              <b>₩{makeMoneyString(String(room.price))} </b>/1박
            </p>
            {!!remainDays && (
              <p className='room-card-total-price'>
                총 요금: ₩{makeMoneyString(`${Number(room.price) * remainDays}`)}
              </p>
            )}
          </div>
        </a>
      </Link>
    </Container>
  );
};

export default RoomCard;

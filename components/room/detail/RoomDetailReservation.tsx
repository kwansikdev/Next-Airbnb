import React, { useMemo, useRef, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { useSelector } from '../../../store';

import Button from '../../common/Button';
import Counter from '../../common/Counter';
import DatePicker from '../../common/DatePicker';
import AuthModal from '../../auth/AuthModal';

import useModal from '../../../hooks/useModal';

import styled from 'styled-components';
import palette from '../../../styles/palette';
import { makeReservationAPI } from '../../../lib/api/reservation';
import { useRouter } from 'next/router';

const Container = styled.div`
  position: sticky;
  top: 128px;
  background-color: #fff;
  width: 362px;
  height: fit-content;
  padding: 24px 24px 16px;
  border-radius: 12px;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.12);

  .room-detail-reservation-info {
    margin-bottom: 24px;
    font-size: 22px;
    font-weight: 600;
  }

  .room-detail-reservation-inputs {
    width: 100%;
    margin-bottom: 16px;
    border: 1px solid ${palette.gray_71};
    border-radius: 8px;

    .room-detail-reservation-date-inputs {
      width: 100%;
      height: 56px;
      border-bottom: 1px solid ${palette.gray_71};

      .room-detai-reservation-check-in {
        position: relative;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        border-radius: 8px 0 0 0;

        label {
          display: block;
          width: 100%;
          height: 100%;
          padding: 10px 12px;
          border-right: 1px solid ${palette.gray_71};
          border-radius: 8px 0 0 0;
          cursor: pointer;
          font-size: 10px;
          font-weight: 600;

          input {
            width: 100%;
            margin-top: 7px;
            padding: 0;
            border: 0;
            outline: none;
          }
        }
      }

      .room-detail-reservation-check-out {
        position: relative;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        border-radius: 8px 0 0 0;

        label {
          display: block;
          width: 100%;
          height: 100%;
          padding: 10px 12px;
          border-right: 1px solid ${palette.gray_71};
          border-radius: 8px 0 0 0;
          cursor: pointer;
          font-size: 10px;
          font-weight: 600;

          input {
            width: 100%;
            margin-top: 7px;
            padding: 0;
            border: 0;
            outline: none;
          }
        }
      }
    }

    .room-detail-reservation-guests-count-wrapper {
      position: relative;

      .room-detail-reservation-guests-count {
        width: 100%;
        height: 56px;
        padding: 10px 12px;
        border-radius: 0 0 8px 8px;
        cursor: pointer;

        span {
          display: block;
          margin-bottom: 7px;
          font-size: 10px;
          font-weight: 600;
        }

        p {
          font-size: 14px;
          color: ${palette.gray_71};
        }
      }

      .room-detail-reservatopm-guests-popup {
        background-color: #fff;
        position: absolute;
        top: 60px;
        left: 0;
        width: 100%;
        padding: 16px;
        border-radius: 4px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
        cursor: pointer;

        .room-detail-reservation-guests-info {
          margin-top: 24px;
          font-size: 14px;
          color: ${palette.gray_71};
        }
      }

      .mn-24 {
        margin-bottom: 24px;
      }
    }
  }

  .room-detail-reservation-price-date {
    margin-top: 24px;
    margin-bottom: 16px;

    span {
      float: right;
    }
  }

  .room-detail-reservation-total-price {
    padding-top: 24px;
    border-top: 1px solid ${palette.gray_dd};
    font-size: 16px;
    font-weight: 800;

    span {
      float: right;
    }
  }
`;

const RoomDetailReservation: React.FC = () => {
  const router = useRouter();

  const room = useSelector((state) => state.room.detail);
  const price = useSelector((state) => state.room.detail?.price);
  const userId = useSelector((state) => state.user.id);

  const checkInRef = useRef<HTMLLabelElement>(null);
  const checkOutRef = useRef<HTMLLabelElement>(null);

  const { openModal, ModalPortal, closeModal } = useModal();
  const [guestCountPopupOpened, setGuestCountPopupOpened] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  if (!room) return null;

  // 예약하기 클릭 시
  const onClickReservationButton = async () => {
    if (checkInRef.current && !startDate) {
      checkInRef.current.focus();
    } else if (checkOutRef.current && !endDate) {
      checkOutRef.current.focus();
    }
  };

  //
  const getGuestCountText = useMemo(
    () => `게스트 ${adultCount + childrenCount}명 ${infantCount ? `, 유가 ${infantCount}명` : ''}`,
    [adultCount, childrenCount, infantCount],
  );

  //
  const onClickReservation = async () => {
    if (!userId) {
      openModal();
    } else if (checkInRef.current && !startDate) {
      checkInRef.current.focus();
    } else if (checkOutRef.current && !endDate) {
      checkOutRef.current.focus();
    } else {
      try {
        const body = {
          roomId: room.id,
          userId,
          checkInDate: startDate!.toISOString(),
          checkOutDate: endDate!.toISOString(),
          adultCount,
          childrenCount,
          infantCount,
        };

        await makeReservationAPI(body);

        alert('숙소 예약을 완료했습니다.');
        router.push('/');
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container>
      <p className='room-detail-reservation-info'>요금을 확인하려면 날짜를 입력하세요.</p>
      <div className='room-detail-reservation-date-inputs'>
        <div className='room-detail-reservation-check-in'>
          <label ref={checkInRef}>
            체크인
            <DatePicker
              placeholderText='날짜 추가'
              popperPlacement='top-end'
              disabledKeyboardNavigation
              selected={startDate}
              openToDate={new Date()}
              selectsStart
              onChange={(date) => setStartDate(date as Date)}
              startDate={startDate as Date}
              endDate={new Date(endDate as Date)}
              minDate={new Date(room.startDate)}
              maxDate={new Date(room.endDate)}
            />
          </label>
        </div>
        <div className='room-detail-reservation-check-out'>
          <label ref={checkOutRef}>
            체크아웃
            <DatePicker
              placeholderText='날짜 추가'
              popperPlacement='top-end'
              disabledKeyboardNavigation
              selected={endDate}
              openToDate={new Date()}
              selectsStart
              onChange={(date) => setEndDate(date as Date)}
              startDate={startDate as Date}
              endDate={new Date(endDate as Date)}
              minDate={new Date(startDate as Date)}
              maxDate={new Date(room.endDate)}
            />
          </label>
        </div>
      </div>
      <div className='room-detail-reservation-guests-count-wrapper'>
        <OutsideClickHandler
          onOutsideClick={() => {
            setGuestCountPopupOpened(false);
          }}
        >
          <div
            role='presentation'
            className='room-detail-reservation-guests-count'
            onClick={() => setGuestCountPopupOpened(!guestCountPopupOpened)}
          >
            <span>인원</span>
            <p>{getGuestCountText}</p>
          </div>
          {guestCountPopupOpened && (
            <div className='room-detail-reservation-guests-popup'>
              <div className='mb-24'>
                <Counter
                  label='성인'
                  description='만 13세 이상'
                  minValue={1}
                  value={adultCount}
                  onChange={(count) => setAdultCount(count)}
                />
              </div>
              <div className='mb-24'>
                <Counter
                  label='어린이'
                  description='2~12세'
                  value={childrenCount}
                  onChange={(count) => setChildrenCount(count)}
                />
              </div>
              <Counter
                label='유아'
                description='2세 미만'
                value={infantCount}
                onChange={(count) => setInfantCount(count)}
              />
              <p className='room-detail-reservation-guests-info'>
                최대 {room.maximumGuestCount}명. 유아는 숙박인원에 포함되지 않습니다.
              </p>
            </div>
          )}
        </OutsideClickHandler>
      </div>

      <Button color='amaranth' width='100%' onClick={onClickReservationButton}>
        {startDate && endDate ? '예약하기' : '예약 가능 여부 보기'}
      </Button>
      {startDate && endDate && (
        <>
          <p className='room-detail-reservation-price-date'>
            {price} X {endDate.getDate() - startDate.getDate()}박
            <span>{Number(price) * (endDate.getDay() - startDate.getDay())}</span>
          </p>
          <p className='room-detail-reservation-total-price'>
            총 합계
            <span>{Number(price) * (endDate.getDay() - startDate.getDay())}</span>
          </p>
        </>
      )}

      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default RoomDetailReservation;

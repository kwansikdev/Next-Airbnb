import axios from './index';

type MakeReservationAPIBody = {
  userId: number;
  checkInDate: string;
  checkOutDate: string;
  adultCount: number;
  childrenCount: number;
  infantCount: number;
};

// 숙소 예약하기
export const makeReservationAPI = (body: MakeReservationAPIBody) =>
  axios.post('/api/reservation', body);

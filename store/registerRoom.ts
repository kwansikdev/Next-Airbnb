import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bedroomCountList } from '../lib/staticData';
import { BedType } from '../types/room';

type RegisterRoomState = {
  // 건물 유형 큰 범주
  largeBuildingType: string | null;
  // 건물 유형
  buildingType: string | null;
  // 숙소 유형
  roomType: string | null;
  // 게스트만을 위해 만들어진 숙소인가
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
};

const initialState: RegisterRoomState = {
  largeBuildingType: null,
  buildingType: null,
  roomType: null,
  isSetUpForGuest: null,
  // 최대 숙박 인원
  maximumGuestCount: 1,
  // 침실 개수
  bedroomCount: 0,
  // 침대 개수
  bedCount: 1,
  // 침대 유형
  bedList: [],
  // 공용공간 침대 유형
  publicBedList: [],
};

const registerRoom = createSlice({
  name: 'registerRoom',
  initialState,
  reducers: {
    // 큰 건물 유형 변경하기
    setLargeBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.largeBuildingType = null;
      }

      state.largeBuildingType = action.payload;
    },
    // 건물 유형 변경하기
    setBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.buildingType = null;
      }

      state.buildingType = action.payload;
    },
    // 숙소 유형 변경하기
    setRoomType(state, action: PayloadAction<'entire' | 'private' | 'public'>) {
      state.roomType = action.payload;
    },
    // 게스트용 숙소인지 변경하기
    setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
      state.isSetUpForGuest = action.payload;
    },
    // 최대 숙박 인원 변경하기
    setMaximumGuestCount(state, action: PayloadAction<number>) {
      state.maximumGuestCount = action.payload;
    },
    // 침실 개수 변경하기
    setBedroomCount(state, action: PayloadAction<number>) {
      state.bedroomCount = action.payload;
    },
    // 침대 최대 개수 변경하기
    setBedCount(state, action: PayloadAction<number>) {
      state.bedCount = action.payload;
    },
  },
});

export const registerRoomAictions = { ...registerRoom.actions };

export default registerRoom;

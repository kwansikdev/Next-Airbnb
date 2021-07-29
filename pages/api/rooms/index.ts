import { isEmpty } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';
import { StoredRoomType } from '../../../types/room';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const {
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
      latitude,
      longitude,
      limit,
      page = '1',
    } = req.body;

    try {
      const rooms = Data.room.getList();

      // 개수 자르기
      const limitedRooms = rooms.splice(0 + (Number(page) - 1) * Number(limit), Number(limit));

      // host 정보 넣기
      const roomsWithHost = await Promise.all(
        limitedRooms.map(async (room) => {
          const host = Data.user.find({ id: room.hostId });

          return { ...room, host };
        }),
      );

      res.statusCode = 200;
      return res.send(roomsWithHost);
    } catch (e) {
      console.log(e);
    }
  }

  // 숙소 등록하기
  if (req.method === 'POST') {
    try {
      const {
        largeBuildingType,
        buildingType,
        roomType,
        isSetUpForGuest,
        maximumGuestCount,
        bedroomCount,
        bedCount,
        bedList,
        publicBedList,
        bathroomCount,
        bathroomType,
        latitude,
        longitude,
        country,
        city,
        district,
        streetAddress,
        detailAddress,
        postcode,
        amenities,
        conveniences,
        photos,
        description,
        title,
        price,
        startDate,
        endDate,
        hostId,
      } = req.body;

      if (
        !largeBuildingType ||
        !buildingType ||
        !roomType ||
        isSetUpForGuest === null ||
        !maximumGuestCount ||
        !bedroomCount ||
        !bedCount ||
        !bedList ||
        !publicBedList ||
        !bathroomCount ||
        bathroomType === null ||
        !latitude ||
        !longitude ||
        !country ||
        !city ||
        !district ||
        !streetAddress ||
        (detailAddress !== '' && !detailAddress) ||
        !postcode ||
        !amenities ||
        !conveniences ||
        !photos ||
        !description ||
        !title ||
        !price ||
        !startDate ||
        !endDate ||
        !hostId
      ) {
        res.statusCode = 400;
        res.send({ message: '필수 값이 없습니다.' });
      }

      const rooms = Data.room.getList();

      if (isEmpty(rooms)) {
        const newRoom: StoredRoomType = {
          id: 1,
          ...req.body,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        Data.room.write([newRoom]);

        res.statusCode = 201;
        return res.end();
      }

      const newRoom: StoredRoomType = {
        id: rooms[rooms.length - 1].id + 1,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      Data.room.write([newRoom]);

      res.statusCode = 201;
      return res.end();
    } catch (e) {
      console.log(e);

      return res.send(e.message);
    }
  }

  res.statusCode = 405;

  return res.end();
};

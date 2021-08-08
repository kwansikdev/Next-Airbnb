import { NextApiRequest, NextApiResponse } from 'next';
import Data from '../../../lib/data';
import { StoredUserType } from '../../../types/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { id } = req.query;

    try {
      const room = Data.room.find(Number(id as string));

      if (room) {
        const host = Data.user.find({ id: room.hostId });

        if (host) {
          const newUserWithourPassword: Partial<Pick<StoredUserType, 'password'>> = host;
          delete newUserWithourPassword.password;

          const roomWithHost = { ...room, host: newUserWithourPassword };

          res.statusCode = 200;

          return res.send(roomWithHost);
        }

        res.statusCode = 404;
        return res.send({ message: '호스트 정보가 없습니다.' });
      }
      res.statusCode = 404;
      return res.send({ message: '해당 숙소가 없습니다.' });
    } catch (e) {}
  }

  res.statusCode = 405;

  return res.end();
};

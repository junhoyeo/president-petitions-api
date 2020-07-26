import { NowRequest, NowResponse } from '@vercel/node';

import getPetition from '../../../lib/getPetition';

interface APIRequest extends NowRequest {
  query: {
    petitionID: string;
  };
}

export default async (req: APIRequest, res: NowResponse) => {
  const {
    petitionID
  } = req.query;
  const petition = await getPetition(Number(petitionID));
  return res.json(petition);
};

import { NowRequest, NowResponse } from '@vercel/node';

import getPetitionList from '../../lib/getPetitionList';

interface APIRequest extends NowRequest {
  query: {
    page: string;
    ranked: string;
  };
}

export default async (req: APIRequest, res: NowResponse) => {
  const {
    page: pageAsString = '1',
    ranked: rankedAsString,
  } = req.query;

  const page = Number(pageAsString);
  const ranked = rankedAsString === 'true';

  const petitions = await getPetitionList({
    page,
    isOrderedByAgreementCount: ranked,
  });

  return res.json(petitions);
};

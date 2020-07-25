import client from '../client';
import {
  IGetPetitionsProps,
  IGetPetitionsReturn,
  IPetitionsAPIListResponse,
} from './getPetitions.type';

const PETITIONS_LIST_API_URL = 'https://www1.president.go.kr/api/petitions/list';

export default async function getPetitions({
  isOrderedByAgreementCount = false,
}: IGetPetitionsProps = {}): Promise<IGetPetitionsReturn> {
  const {
    data: {
      status,
      total: totalPagesAsString,
      page: currentPage,
      item: petitions,
    },
  }: IPetitionsAPIListResponse = await client.get(PETITIONS_LIST_API_URL);
  if (status !== 'ok') {
    throw new Error(`Status is not 'OK'`);
  }
  const totalPages = Number(totalPagesAsString);
  return {
    totalPages,
    currentPage,
    petitions: petitions.map(({
      id: idAsString,
      title,
      category,
      provider,
      paging_id: number,
      agreement: agreementCountAsString,
      created: createdAt,
      finished: finishedAt,
    }) => {
      const id = Number(idAsString);
      const agreementCount = Number(agreementCountAsString);
      return {
        id,
        number,
        title,
        category,
        provider,
        agreementCount,
        createdAt,
        finishedAt,
      };
    })
  };
};

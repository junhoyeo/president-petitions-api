import client, { createFormData } from '../client';
import {
  IGetPetitionListProps,
  IGetPetitionListReturn,
  IPetitionsAPIListResponse,
} from './getPetitionList.type';

const PETITIONS_LIST_API_URL = 'https://www1.president.go.kr/api/petitions/list';

export default async function getPetitionList({
  page = 1,
  isOrderedByAgreementCount = false,
}: IGetPetitionListProps = {}): Promise<IGetPetitionListReturn> {
  const formData = createFormData({
    page,
    order: isOrderedByAgreementCount ? 2 : 1,
  });
  const {
    data: {
      status,
      total: totalPagesAsString,
      page: currentPage,
      item: petitions,
    },
  }: IPetitionsAPIListResponse = await client({
    url: PETITIONS_LIST_API_URL,
    method: 'POST',
    data: formData,
    headers: formData.getHeaders(),
  });

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
      const agreementCount = Number(agreementCountAsString.replace(/,/g, ''));
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

import client from './client';

const PETITIONS_LIST_API_URL = 'https://www1.president.go.kr/api/petitions/list';

export interface IPetitionsListItem {
  id: number;
  number: number;
  title: string;
  category: string;
  provider: string;
  agreementCount: number;
  createdAt: string;
  finishedAt: string;
}

export interface IGetPetitionsProps {
  isOrderedByAgreementCount?: boolean;
}

export interface IGetPetitionsReturn {
  totalPages: number;
  currentPage: number;
  petitions: IPetitionsListItem[];
}

export interface IPetitionsAPIListItem {
  id: string;
  paging_id: number;
  title: string;
  agreement: string;
  category: string;
  created: string;
  finished: string;
  provider: string;
}

export interface IPetitionsAPIListResponse {
  data: {
    status: string;
    total: string;
    page: number;
    paging: string;
    item: IPetitionsAPIListItem[];
  };
}

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

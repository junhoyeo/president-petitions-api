import { IPetitionsListItem } from '../models/Petitions';

export interface IGetPetitionListProps {
  page?: number;
  isOrderedByAgreementCount?: boolean;
}

export interface IGetPetitionListReturn {
  currentPage: number;
  totalPetitions: number;
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

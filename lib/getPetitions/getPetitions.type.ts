import { IPetitionsListItem } from '../models/Petitions';

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
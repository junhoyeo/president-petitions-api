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

export interface IPetition {
  id: number;
  status: string,
  title: string,
  agreementCount: number,
  information: {
    category: string,
    createdAt: string,
    finishedAt: string,
  },
  article: string,
}

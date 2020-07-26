import getPetitionList from '../lib/getPetitionList';
import { IGetPetitionListReturn } from '../lib/getPetitionList/getPetitionList.type';
import { IPetitionsListItem } from '../lib/models/Petitions';

describe('Get petitions', () => {
  test('Get petitions', async () => {
    const {
      totalPetitions,
      currentPage,
      petitions,
    }: IGetPetitionListReturn = await getPetitionList();

    expect(totalPetitions).toBeGreaterThan(1000);
    expect(currentPage).toEqual(1);

    expect(Array.isArray(petitions));
    expect(petitions).toContainEqual(
      expect.objectContaining<IPetitionsListItem>({
        id: expect.any(Number),
        number: expect.any(Number),
        title: expect.any(String),
        category: expect.any(String),
        provider: expect.any(String),
        agreementCount: expect.any(Number),
        createdAt: expect.any(String),
        finishedAt: expect.any(String),
      })
    );
  });

  test('Get petitions with agreement order', async () => {
    const { petitions }: IGetPetitionListReturn = await getPetitionList({
      isOrderedByAgreementCount: true,
    });
    expect(Array.isArray(petitions));
  });

  test('Get petitions from next page', async () => {
    const { currentPage }: IGetPetitionListReturn = await getPetitionList({
      page: 2,
    });
    expect(currentPage).toEqual(2);
  });
});

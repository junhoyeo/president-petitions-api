import getPetitionList from '../lib/getPetitionList';
import { IGetPetitionListReturn } from '../lib/getPetitionList/getPetitionList.type';
import { IPetitionsListItem } from '../lib/models/Petitions';

describe('Get petitions', () => {
  test('Get petitions', async () => {
    const {
      totalPages,
      currentPage,
      petitions,
    }: IGetPetitionListReturn = await getPetitionList();

    expect(totalPages).toBeGreaterThan(1000);
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
});

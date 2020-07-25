import getPetitions from './getPetitions';
import { IGetPetitionsReturn } from './getPetitions/getPetitions.type';
import { IPetitionsListItem } from './models/Petitions';

describe('Get petitions', () => {
  test('Get petitions', async () => {
    const {
      totalPages,
      currentPage,
      petitions,
    }: IGetPetitionsReturn = await getPetitions();

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

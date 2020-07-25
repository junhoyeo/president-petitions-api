import getPetition from '../lib/getPetition';
import { IPetition } from '../lib/models/Petitions';

describe('', () => {
  test('', async () => {
    const petition: IPetition = await getPetition(590341);
    expect(petition.status).toEqual('청원진행중');
    expect(petition.title)
      .toEqual('응급환자가 있는 구급차를 막아세운 택시 기사를 처벌해 주세요.');
    expect(petition.agreementCount).toBeGreaterThan(700000);
    expect(petition.information).toEqual(expect.objectContaining({
      category: expect.any(String),
      createdAt: expect.any(String),
      finishedAt: expect.any(String),
    }));
    expect(typeof petition.article).toBe('string');
  });
});

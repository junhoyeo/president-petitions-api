import axios from 'axios';
import cheerio from 'cheerio';

import { IPetition } from '../models/Petitions';

export default async function getPetition(petitionID: number): Promise<IPetition> {
  const { data: html } = await axios.get(`https://www1.president.go.kr/petitions/${petitionID}`);
  const document = cheerio.load(html);

  const status = document('div.petitionsView_progress > h4').text().trim();
  const title = document('h3.petitionsView_title').text().trim();
  const agreementCount = Number(
    document('h2.petitionsView_count > span')
      .text()
      .trim()
      .replace(/,/g, ''));
  const [
    category,
    createdAt,
    finishedAt,
    providerWithAnonymousID,
  ] = document('ul.petitionsView_info_list > li')
    .toArray()
    .map((informationItemReference) => {
      const informationItem = document(informationItemReference);
      const fieldName = informationItem.find('p').text();
      return informationItem
        .text()
        .replace(fieldName, '')
        .trim();
    });
  const provider = providerWithAnonymousID
    .split('-')[0]
    .trim();
  const article = document('div.View_write')
    .text()
    .split('\n')
    .map((line) => line.trim())
    .filter(isNotEmpty => isNotEmpty)
    .join('\n');

  return {
    id: petitionID,
    status,
    title,
    agreementCount,
    information: {
      category,
      provider,
      createdAt,
      finishedAt,
    },
    article,
  };
}

import axios from 'axios';
import FormData from 'form-data';

export const createFormData = <T>(data: T) => {
  const formData = new FormData();
  Object
    .entries(data)
    .forEach(([key, value]) =>
      formData.append(key, value));
  return formData;
};

export default axios.create({
  headers: {
    'x-requested-with': 'XMLHttpRequest',
  },
});

import axios from 'axios';

export default axios.create({
  headers: {
    'x-requested-with': 'XMLHttpRequest',
  },
});

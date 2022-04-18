import data from '../data/data.json';

export const getTransactionData = () => {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
}

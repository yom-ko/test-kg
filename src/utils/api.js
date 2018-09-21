export const fetchRequests = url => fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Probably, a network error occurred.');
  })
  .catch(error => {
    console.log('A problem with the fetch operation: ', error.message);
  });

export const url = 'http://localhost:3000/requests/';

export default fetchRequests;

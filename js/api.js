const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Path = {
  GET_DATA: '/data',
  SEND_DATA: '',
};

const getData = (onSuccess, onError) => {
  fetch(BASE_URL + Path.GET_DATA)
    .then((response) => {
      if(!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .then((photos) => onSuccess(photos))
    .catch(() => onError());
};

const sendData = (formData, onSuccess, onError) =>
  fetch(BASE_URL + Path.SEND_DATA, {
    method: 'POST',
    body: formData
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      onSuccess();
    })
    .catch(() => onError());

export { getData, sendData };

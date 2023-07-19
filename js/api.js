
const getData = () => fetch('https://29.javascript.pages.academy/kekstagram/data',
  {
    method: 'GET',
  },
).then((response) => {
  if (!response.ok) {
    throw new Error();
  }
  return response.json();
})
  .catch(() => {
    throw new Error('Не удалось загрузить данные! Попробуйте ещё раз!');
  });

export {getData};

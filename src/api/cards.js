const API_URL = 'https://localhost:7140/api/Cards';

export const getAllCards = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Errore nel recupero delle carte');
  return await response.json();
};

export const createCard = async (card) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  });
  if (!response.ok) throw new Error('Errore nella creazione della carta');
  return await response.json();
};
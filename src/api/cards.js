const API_URL = "https://localhost:7140/api/Cards";

export const getAllCards = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Errore nel recupero delle carte");
  return await response.json();
};

export const createCard = async (card) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZXR0b3JlIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoidXNlciIsImV4cCI6MTc0NDE5OTgyNCwiaXNzIjoibG9jYWxob3N0IiwiYXVkIjoibG9jYWxob3N0In0.G4OAe_2DeLO7OC8tjiv-Fwjfq4yzH-3Ls1zrkS0a3G8`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });
  if (!response.ok) throw new Error("Errore nella creazione della carta");
  return await response.json();
};

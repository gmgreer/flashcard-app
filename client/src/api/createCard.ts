import { API_URL } from "./config"
import { TDeck } from "./getDecks"

export async function createCard(deckId:string, front: string, back:string): Promise<TDeck> {
    const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
        method: "POST",
        body: JSON.stringify({
          front,
          back
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      return response.json()
}
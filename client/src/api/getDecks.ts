import { API_URL } from "./config"

export type card = {
  front: string,
  back: string
}

export type TDeck = {
    _id: string
    cards: [card]
    title: string
  }

export async function getDecks(): Promise<TDeck[]> {
    const response = await fetch(`${API_URL}/decks`)
      return response.json()
      
}
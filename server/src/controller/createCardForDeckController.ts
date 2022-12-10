import { Response, Request } from "express";
import Deck from '../models/Deck'

export async function createCardForDeckController(req: Request, res: Response) {
    const deckId = req.params.deckId
    const deck = await Deck.findById(deckId)
    if (!deck) return res.status(400).send('no deck of this id exists')
    const front = req.body.front
    const back = req.body.back
    deck.cards.push({front, back})
    await deck.save()
    res.json(deck) 
}
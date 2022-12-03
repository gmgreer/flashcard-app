import express from "express";
import { Response, Request } from "express";
import mongoose from 'mongoose'
import DeckModel from './models/Deck'
const PORT = 5000

const app = express()

app.use(express.json())



app.post("/decks", async (req: Request, res: Response) => {
    const newDeck = new DeckModel({
        title: req.body.title
    });
    const createdDeck = await newDeck.save()
        res.json(createdDeck)

 
})

mongoose.connect("mongodb+srv://gmgreer:rtTuGWyWKAGqVcVa@cluster0.edash7g.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log(`listening on port ${PORT}`)
    app.listen(PORT);
})

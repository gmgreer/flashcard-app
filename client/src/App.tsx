import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteDeck } from './api/deleteDeck'
import { TDeck, getDecks } from './api/getDecks'


import './App.css'



function App() {
  const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState('')
  
  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/decks', {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const deck = await response.json()
    setDecks([...decks, deck])
    setTitle("")
  }

  const handleDeleteDeck = async (deckId: string) => {
      await deleteDeck(deckId)
      setDecks(decks.filter(deck => deck._id !== deckId))
  }

  useEffect(()=>{
    const fetchDecks = async () => {
      
      const newDecks = await getDecks()
      setDecks(newDecks)
    }
    fetchDecks();
    return ()=>{}
  }, [])


  return (
    <div className='bg-slate-500 h-screen flex flex-col justify-center items-center '>
      <div>
        <ul className='flex flex-row flex-wrap gap-5 items-center justify-center mb-5'>

        {decks.map(deck => (
          <li className='border flex justify-center items-center border-black h-[125px] w-[200px] text-center bg-white shadow-md relative' key={deck._id}>
            
            <button 
            onClick={() => handleDeleteDeck(deck._id)}
            className='absolute top-0 right-1 text-xs text-red-600'>X</button>
            
            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>
          ))}
          </ul>
      </div>
      <form onSubmit={handleCreateDeck} className='flex flex-col space-y-3' >
        <input id='deck-title' placeholder='Deck Title' type="text" 
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
        />
        <button className='border border-black'>Create Deck</button>
      </form>
    </div>
  )
}

export default App

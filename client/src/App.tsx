import React, { useEffect, useState } from 'react'

import './App.css'

type decks = {
  _id: string
  title: string
}

function App() {
  const [decks, setDecks] = useState([])
  const [title, setTitle] = useState('')
  
  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:5000/decks', {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    setTitle("")
  }

  useEffect(()=>{
    const fetchDecks = async () => {
      const response = await fetch('http://localhost:5000/decks')
      const newDecks = await response.json()
      setDecks(newDecks)
    }
    fetchDecks();
    return ()=>{}
  }, [])


  return (
    <div className='bg-slate-500 h-screen flex flex-col justify-center items-center '>
      <div>
        <ul className='grid grid-cols-3 gap-5 items-center justify-center mb-5'>

        {decks.map(deck => (
          <li className='border border-black h-20 w-20 text-center bg-white shadow-md' key={deck._id}>{deck.title}</li>
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

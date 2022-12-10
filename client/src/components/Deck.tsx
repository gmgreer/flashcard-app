import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createCard } from '../api/createCard'
import { deleteCard } from '../api/deleteCard'
import { getDeck } from '../api/getDeck'
import { TDeck, card} from '../api/getDecks'





function Deck() {

  const [cards, setCards] = useState<card[]>([])
  const [deck, setDeck] = useState<TDeck | undefined>()
  const [front, setFront] = useState('')
  const [back, setBack] = useState("")
  
  const [current, setCurrent] = useState<number>(0)
  const {deckId} = useParams()

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, front, back)
  
    setCards(serverCards)
    setFront("")
    setBack("")
  }

  // const handleDeleteCard = async ( index: number) => {
  //   if (!deckId) return
  //     await deleteCard(deckId, index)
  //     setCards(cards.filter((card, ind)=> ind !== index))
   
  // }

  const goLeft = () => {
    current == 0 ? setCurrent(cards.length - 1) : setCurrent((prev) => prev -= 1)
  }

  const goRight = () => {
    current == cards.length -1  ? setCurrent(0) : setCurrent((prev) => prev += 1)
  }

  useEffect(()=>{
    // bug when there is no cards within the deck maybe
    if (!deckId) return
    const fetchDeck = async () => { 
      const newDeck = await getDeck(deckId)
      setDeck(newDeck)
      setCards(newDeck.cards)
      
    }
    fetchDeck();
    
  }, [deckId])


  return (
    <div className='bg-gray-900 h-screen flex flex-col justify-center gap-20 items-center text-white'>
          <h1 className='text-6xl'>{deck?.title}</h1>
          <section className='flex justify-center items-center gap-20'>

          <button onClick={goLeft} className='bg-transparent text-gray-100 text-8xl hover:text-orange-700 hover:scale-125'>{"<"}</button>
            
           { cards[0] ? <div className='w-[300px] h-[225px] bg-transparent cursor-pointer group perspective relative' >
          
          <div className='relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000'>
          {/* <button 
            onClick={() => handleDeleteCard()}
            className='absolute top-1 right-2 text-xs text-gray-100 backface-hidden'>X</button> */}
            <div className='absolute backface-hidden border-2 w-full h-full flex justify-center items-center'>
              <h1>{cards[current].front}</h1>
            </div>
            <div className='absolute my-rotate-y-180 backface-hidden w-full h-full bg-gray-100'>
              <div className='text-center flex flex-col items-center justify-center h-full text-gray-900'>
                <h1>{cards[current].back}</h1>
              </div>
            </div>
          </div>
         </div> : <></>}
         <button onClick={goRight} className='bg-transparent text-gray-100 text-8xl hover:text-orange-700 hover:scale-125'>{"/>"}</button>
          </section>
    
      <form onSubmit={handleCreateDeck} className='flex flex-col space-y-3 text-black' >
        <input id='deck-title' placeholder='Front text' type="text" className='px-2'
          value={front}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFront(e.target.value)
          }}
        />
        <input id='deck-back' placeholder='Back text' type="text" className='px-2'
          value={back}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBack(e.target.value)
          }}
        />
        <button  className='border border-gray-100 2 text-gray-100'>Create Card</button>
      </form>
    </div>
  )
}

export default Deck

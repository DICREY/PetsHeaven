// Librarys 
import React from 'react'

// Imports 
import { LoadDog } from './LoadDog'
import { LoadCat } from './Load2'

// Import styles
import '../../../src/styles/Errores/Loader.css'

// Component 
export const Loader = () => {
  const random = Math.floor(Math.random() * 2) + 1 // Randomly choose between 1 and 2
  if (random === 1) {
    return <LoadHamster />
  }
  if (random === 2) {
    return <LoadDog />
  }
  if (random === 3) {
    return <LoadCat />
  }
}

// Component 
export const LoadHamster = () => {
  return (
    <main className='main-container-loader'>
      <div
        aria-label='Orange and tan hamster running in a metal wheel'
        role='img'
        className='wheel-and-hamster'
      >
        <div className='wheel'></div>
        <div className='hamster'>
          <div className='hamster__body'>
            <div className='hamster__head'>
              <div className='hamster__ear'></div>
              <div className='hamster__eye'></div>
              <div className='hamster__nose'></div>
            </div>
            <div className='hamster__limb hamster__limb--fr'></div>
            <div className='hamster__limb hamster__limb--fl'></div>
            <div className='hamster__limb hamster__limb--br'></div>
            <div className='hamster__limb hamster__limb--bl'></div>
            <div className='hamster__tail'></div>
          </div>
        </div>
        <div className='spoke'></div>

      </div>
      <div className='loader'></div>
    </main>
  )
}

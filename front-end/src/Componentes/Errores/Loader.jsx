// Librarys 
import React from 'react'

// Import styles
import '../../../src/styles/Errores/Loader.css'
import '../../../src/styles/Errores/Load.css'

// Component 
export const Loader = () => {
  const random = Math.floor(Math.random() * 2) + 1 // Randomly choose between 1 and 2
  if (random === 1) {
    return <LoaderDog />
  }
  if (random === 2) {
    return <LoaderHamster />
  }
}

// Component 
const LoaderHamster = () => {
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
// Component 
const LoaderDog = () => {
  return (
    <main className='main'>

      <div className="dog">
        <div className="dog__paws">
          <div className="dog__bl-leg leg">
            <div className="dog__bl-paw paw"></div>
            <div className="dog__bl-top top"></div>
          </div>
          <div className="dog__fl-leg leg">
            <div className="dog__fl-paw paw"></div>
            <div className="dog__fl-top top"></div>
          </div>
          <div className="dog__fr-leg leg">
            <div className="dog__fr-paw paw"></div>
            <div className="dog__fr-top top"></div>
          </div>
        </div>

        <div className="dog__body">
          <div className="dog__tail"></div>
        </div>

        <div className="dog__head">
          <div className="dog__snout">
            <div className="dog__nose"></div>
            <div className="dog__eyes">
              <div className="dog__eye-l"></div>
              <div className="dog__eye-r"></div>
            </div>
          </div>
        </div>

        <div className="dog__head-c">
          <div className="dog__ear-l"></div>
          <div className="dog__ear-r"></div>
        </div>
      </div>
      <div className='loader'></div>
    </main>
  )
}
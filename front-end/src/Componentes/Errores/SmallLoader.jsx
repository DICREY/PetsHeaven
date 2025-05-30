// Librarys 
import React from 'react'

// Import styles
import '../../../src/styles/Errores/SmallLoader.css'

// Component
export const SmallLoader = () => {
  const random = Math.floor(Math.random() * 2) + 1 // Randomly choose between 1 and 2
  if (random === 1) {
    return <SmallLoaderDog />
  }
  if (random === 2) {
    return <SmallLoaderDog />
  }
}

const SmallLoaderHamster = () => {
  return (
    <main className='MainContainerSmallLoader'>
      <section
        aria-label='Orange and tan Hamster running in a metal wheel'
        role='img'
        className='WheelAndHamsterSmallLoader'
      >
        <div className='WheelSmallLoader'></div>
        <div className='HamsterSmallLoader'>
          <div className='Hamster__bodySmallLoader'>
            <div className='Hamster__headSmallLoader'>
              <div className='Hamster__earSmallLoader'></div>
              <div className='Hamster__eyeSmallLoader'></div>
              <div className='Hamster__noseSmallLoader'></div>
            </div>
            <div className='Hamster__limbSmallLoader Hamster__limb--frSmallLoader'></div>
            <div className='Hamster__limbSmallLoader Hamster__limb--flSmallLoader'></div>
            <div className='Hamster__limbSmallLoader Hamster__limb--brSmallLoader'></div>
            <div className='Hamster__limbSmallLoader Hamster__limb--blSmallLoader'></div>
            <div className='Hamster__tailSmallLoader'></div>
          </div>
        </div>
        <div className='SpokeSmallLoader'></div>
      </section>
    </main>
  )
}

const SmallLoaderDog = () => {
  return (
    <main className='MainDogLoader'>
      <section className="DogLoader">
        <div className="DogLoader__paws">
          <div className="DogLoader__bl-leg leg">
            <div className="DogLoader__bl-paw paw"></div>
            <div className="DogLoader__bl-top top"></div>
          </div>
          <div className="DogLoader__fl-leg leg">
            <div className="DogLoader__fl-paw paw"></div>
            <div className="DogLoader__fl-top top"></div>
          </div>
          <div className="DogLoader__fr-leg leg">
            <div className="DogLoader__fr-paw paw"></div>
            <div className="DogLoader__fr-top top"></div>
          </div>
        </div>

        <div className="DogLoader__body">
          <div className="DogLoader__tail"></div>
        </div>

        <div className="DogLoader__head">
          <div className="DogLoader__snout">
            <div className="DogLoader__nose"></div>
            <div className="DogLoader__eyes">
              <div className="DogLoader__eye-l"></div>
              <div className="DogLoader__eye-r"></div>
            </div>
          </div>
        </div>

        <div className="DogLoader__head-c">
          <div className="DogLoader__ear-l"></div>
          <div className="DogLoader__ear-r"></div>
        </div>
      </section>
    </main>
  )
}

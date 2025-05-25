// Librarys 
import React from 'react'

// Import styles
import '../../../src/styles/Errores/SmallLoader.css'

// Component 
export const SmallLoader = () => {
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

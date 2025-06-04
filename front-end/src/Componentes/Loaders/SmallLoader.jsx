// Librarys 
import React from 'react'

// Import styles
import '../../../src/styles/Errores/SmallLoader.css'
import '../../../src/styles/Loaders/HamsterLoader.css'

// Component
export const SmallLoader = () => {
  const random = Math.floor(Math.random() * 3) + 1 // Randomly choose between 1 and 3
  if (random === 1) {
    return <SmallLoaderCat />
  }
  if (random === 2) {
    return <SmallLoaderCat />
  }
  if(random=== 3){
    return <SmallLoaderCat/>
  }
}

// const SmallLoaderHamster = () => {
//   return (
//     <main className='MainContainerSmallLoader'>
//       <section
//         aria-label='Orange and tan Hamster running in a metal wheel'
//         role='img'
//         className='WheelAndHamsterSmallLoader'
//       >
//         <div className='WheelSmallLoader'></div>
//         <div className='HamsterSmallLoader'>
//           <div className='Hamster__bodySmallLoader'>
//             <div className='Hamster__headSmallLoader'>
//               <div className='Hamster__earSmallLoader'></div>
//               <div className='Hamster__eyeSmallLoader'></div>
//               <div className='Hamster__noseSmallLoader'></div>
//             </div>
//             <div className='Hamster__limbSmallLoader Hamster__limb--frSmallLoader'></div>
//             <div className='Hamster__limbSmallLoader Hamster__limb--flSmallLoader'></div>
//             <div className='Hamster__limbSmallLoader Hamster__limb--brSmallLoader'></div>
//             <div className='Hamster__limbSmallLoader Hamster__limb--blSmallLoader'></div>
//             <div className='Hamster__tailSmallLoader'></div>
//           </div>
//         </div>
//         <div className='SpokeSmallLoader'></div>
//       </section>
//     </main>
//   )
// }

// const SmallLoaderDog = () => {
//   return (
//     <main className='MainDogLoader'>
//       <section className="DogLoader">
//         <div className="DogLoader__paws">
//           <div className="DogLoader__bl-leg leg">
//             <div className="DogLoader__bl-paw paw"></div>
//             <div className="DogLoader__bl-top top"></div>
//           </div>
//           <div className="DogLoader__fl-leg leg">
//             <div className="DogLoader__fl-paw paw"></div>
//             <div className="DogLoader__fl-top top"></div>
//           </div>
//           <div className="DogLoader__fr-leg leg">
//             <div className="DogLoader__fr-paw paw"></div>
//             <div className="DogLoader__fr-top top"></div>
//           </div>
//         </div>

//         <div className="DogLoader__body">
//           <div className="DogLoader__tail"></div>
//         </div>

//         <div className="DogLoader__head">
//           <div className="DogLoader__snout">
//             <div className="DogLoader__nose"></div>
//             <div className="DogLoader__eyes">
//               <div className="DogLoader__eye-l"></div>
//               <div className="DogLoader__eye-r"></div>
//             </div>
//           </div>
//         </div>

//         <div className="DogLoader__head-c">
//           <div className="DogLoader__ear-l"></div>
//           <div className="DogLoader__ear-r"></div>
//         </div>
//       </section>
//     </main>
//   )
// }
const SmallLoaderCat=()=>{
  return(
    <main className="MainCatLoader">
    <div className="CatLoader">
      <div className="CatContainer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 733 673"
          className="CatLoader_Body"
        >
          <path
            fill="#212121"
            d="M111.002 139.5C270.502 -24.5001 471.503 2.4997 621.002 139.5C770.501 276.5 768.504 627.5 621.002 649.5C473.5 671.5 246 687.5 111.002 649.5C-23.9964 611.5 -48.4982 303.5 111.002 139.5Z"
          ></path>
          <path fill="#212121" d="M184 9L270.603 159H97.3975L184 9Z"></path>
          <path fill="#212121" d="M541 0L627.603 150H454.397L541 0Z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 158 564"
          className="CatLoader_Tail"
        >
          <path
            fill="#191919"
            d="M5.97602 76.066C-11.1099 41.6747 12.9018 0 51.3036 0V0C71.5336 0 89.8636 12.2558 97.2565 31.0866C173.697 225.792 180.478 345.852 97.0691 536.666C89.7636 553.378 73.0672 564 54.8273 564V564C16.9427 564 -5.4224 521.149 13.0712 488.085C90.2225 350.15 87.9612 241.089 5.97602 76.066Z"
          ></path>
        </svg>
        <div className="CatLoader_Text">
          <span className="CatLoader_Bigzzz">Z</span>
          <span className="CatLoader_zzz">Z</span>
        </div>
      </div>
    </div>
  </main>
  )

}

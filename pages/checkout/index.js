import { fetchStyles } from '@/utils/getStyles'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Steps from '../components/Steps'
import FormHandler from '../components/Form'
import CartItem from '../components/CartItem'
import { selectCartTotal } from '@/stores/cart'
import { useSelector } from 'react-redux'
import { createContext, useRef, useState } from 'react'
import LocationForm from '../components/LocationForm'
import TransferForm from '../components/TransferForm'
import PaymentForm from '../components/PaymentForm'

export async function getServerSideProps(){
   const {styles} = await fetchStyles()
   return {
    props:{
      styles
    }
   }
}



export const CheckoutContext = createContext([])
function Checkout({styles}) {
  
  const [formData, setFormData] = useState({
    personalInfo: {},
    locationInfo: {},
    transferMethod: '',
    paymentDetails: {},
 });


  const total = useSelector(selectCartTotal)
  const stepsRef = useRef(null)
  const [currentStep, setCurrentStep] = useState(0);

  const handleGoToNext = () => {
    stepsRef.current.handleNext()
  };

  const handleStepChange = (step) => {
    setCurrentStep(step); 
    console.log(step)
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 0:
        return <FormHandler onNext={handleGoToNext} styles={styles} /> ;
      case 1:
        return <LocationForm onNext={handleGoToNext} styles={styles} />;
      case 2:
        return <TransferForm onNext={handleGoToNext} styles={styles} />;
      case 3:
        return   <PaymentForm onNext={handleGoToNext} styles={styles} /> ;
      default:
        return <div>Invalid step</div>; 
    }
  };
  
  return (
    <>
    {/* header */}
    <div style={{backgroundColor : styles.primary}} className='h-20 py-6 text-left text-white font-bold '>
      <Link href='/' className='flex items-center text-lg gap-4 justify-end hover:underline w-[90%] '>
       متابعة التسوق  <FontAwesomeIcon icon={faArrowLeft} />  </Link>
    </div>
    {/* container */}
    <div className='h-full w-full'>
      <div className='flex-col bg-[#f6f6f6] opacity-75 text-white md:w-[80%] mx-auto  mt-12 rounded-2xl py-6'>
      
      {/* multistep symbols */}
      <div className='md:px-12 px-6 py-6'>
        <Steps ref={stepsRef} onStepChange={handleStepChange}/>

        <div className='mt-10 flex md:flex-row flex-col gap-8'>
            <CheckoutContext.Provider value={{ formData, setFormData }}>
                {renderStepComponent()}
            </CheckoutContext.Provider>  
        <div className='md:w-1/2 -mt-14'>

          <CartItem/>
          <div className="flex justify-between text-base font-medium text-gray-900 px-10 my-6">
        <p>الاجمالي</p>
        <p>{total} د.ل</p>
      </div>
          </div>

        </div>
      </div>
      
      </div>
    </div>

    </>
  )
}

export default Checkout

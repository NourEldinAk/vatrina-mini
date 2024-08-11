import React from 'react';


const TransferForm = (params) => {

  
  const handleNext =()=>{

    params.onNext()
  }

  return(
    <div className='w-1/2 flex flex-col justify-between'>
      <h1 className='text-red-500 text-2xl'>لا يوجد توصيل الي هذه المنطقة في الوقت الحالي</h1>

      <button
        type="submit"
        className='flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-xl hover:opacity-75'
        style={{ backgroundColor: params.styles.primary }}
        onClick={handleNext}
    >
        التالي
    </button>
    </div>

    
  )
};

export default TransferForm;

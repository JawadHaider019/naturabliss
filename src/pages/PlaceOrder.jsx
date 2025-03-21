import Title from '../components/Title'
import CartTotal from '../components/CartTotal'

import { useNavigate } from "react-router-dom"; 

const PlaceOrder = () => {

  const navigate = useNavigate();

  return  (
    <div className="flex min-h-[80vh] flex-col justify-between gap-4 border-t pt-5 sm:flex-row sm:pt-14">
      <div className="flex w-full flex-col gap-4 sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div> 
        <div className='flex gap-3'>
          <input className='w-full rounded border border-gray-300 px-3.5 py-1.5' type='text'placeholder='First name'/>
          <input className='w-full rounded border border-gray-300 px-3.5 py-1.5' type='text'placeholder='Last name'/>
        </div>
        <input className='w-full rounded border border-gray-300 px-3.5 py-1.5' type='email'placeholder='Email'/>
        <input className='w-full rounded border border-gray-300 px-3.5 py-1.5' type='text'placeholder='Adress'/>
        <div className='flex gap-3'>
          <input className='w-full rounded border border-gray-300 px-3.5 py-1.5' type='text'placeholder='City'/>
          <input className='w-full rounded border border-gray-300 px-3.5 py-1.5' type='text'placeholder='State'/>
        </div>
        <div className='flex gap-3'>
          <input className='w-full rounded border border-gray-300 px-3.5 py-1.5' type='number'placeholder='Zipcode'/>
          <input className='w-full rounded border border-gray-300 px-3.5 py-1.5' type='number'placeholder='Phone'/>
        </div>
      </div>

      <div className ='mt-8'>
        <div className = 'mt-8 min-w-80'>
          <CartTotal/>
        </div>
    

      <div className='mt-12'>
        <Title text1={'PAYMENT'} text2={'METHOD'}/>
        <div className =' flex flex-col gap-3 lg:flex-row'>
            <div className='flex cursor-pointer items-center gap-3 border p-2 px-3'>
         
              <p className='mx-4 text-sm font-medium text-gray-500'>CASH ON DELIVERY</p>
            </div>
        </div>
        <div className='mt-8 w-full text-end'>
          <button onClick={()=>navigate('/orders')} className= 'btn'>PLACE ORDER</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default PlaceOrder

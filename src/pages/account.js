import React from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();

  const handleLogout =  () => {
    
      sessionStorage.clear()
      navigate('/demo/react/antdesign/grocery/signin');
      console.log('You are logged out')
    
  };
 
const isLogin = sessionStorage.getItem("userToken")
console.log(isLogin,'sss');
const user = sessionStorage.getItem("userName")
  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      {isLogin &&  <p>User Email: {user}</p>}
{isLogin && <button onClick={handleLogout} className='border px-6 py-2 my-4'>
        Logout
      </button>}
      
    </div>
  );
};

export default Account;
"use client";  // Mark this as a Client Component

import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import UserContext from '@/context/userContext'
import { toast } from 'sonner';
import { logOut } from '../services/httpsignup';
import { useRouter } from 'next/navigation';

const Nav = () => {
  const router = useRouter();
  const data: any = useContext(UserContext);  // This will now work on the client-side.

  async function doLogout() {
    try {
      let result = await logOut();  // Log out the user
      console.log(result);
      toast.success('Logout Successful');
      data.setUser(undefined);  // Clear user context
      router.push('/login');  // Redirect to login page
    } catch (err) {
      console.error(err);
      toast.error('Logout Error');
    }
  }

  return (
    <header className='borderb flex justify-between px-8 box-border bg-gray-800 pt-2 pb-2 items-center'>
      <div>
        <h1>
          <Image src="/download.webp" alt="Logo" width={150} height={90} />
        </h1>
      </div>

      <div>
        <ul className='flex gap-4 text-white text-2xl font-bold'>
          {/* Only show menu items if there is a logged-in user */}
          {data.user && (
            <>
              <li><Link href='/'>Home</Link></li>
              <li><Link href='/show-task'>Show-Task</Link></li>
              <li><Link href='/add-task'>Add-Task</Link></li>
            </>
          ) }
        </ul>
      </div>

      <div className='flex gap-5 text-white font-bold'>
        {/* Render buttons based on user login status */}
        {!data.user && (
          <>
            <button className='bod w-[100px] bg-orange-800 p-4 rounded-lg'>
              <Link href="/signup">Sign Up</Link>
            </button>
            <button className='w-[100px] bg-blue-600 rounded-lg'>
              <Link href="/login">Login</Link>
            </button>
          </>
        ) }
        
        {data.user && (
          <>
            <button className='bod w-[100px] bg-orange-800 p-2 rounded-lg'>
              {data.user.name}
            </button>
            <button className='w-[100px] bg-blue-600 rounded-lg' onClick={doLogout}>
              Logout
            </button>
          </>
        )
        }
      </div>
    </header>
  );
}

export default Nav;

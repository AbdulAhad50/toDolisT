"use client"
import React, { useEffect, useState } from 'react';
import UsersContext from './userContext';
import { httpaxios } from '@/helper/httpaxios';

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null); // Initialize with null or undefined

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let logUser: any = await httpaxios.get('/api/current');
        // console.log(logUser.data);
        setUser({...logUser.data}); // Store only the user data, not the entire response
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchUser(); // Call the async function
  }, []); // Empty dependency array to run only on mount

  return (
    <UsersContext.Provider value={{ user, setUser }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UserProvider;

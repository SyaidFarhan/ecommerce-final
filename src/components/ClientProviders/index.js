'use client';

import GlobalState from '@/context';
import LayoutContent from '@/components/LayoutContent';
import Navbar from '@/components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientProviders({ children }) {
  return (
    <GlobalState>
      <ToastContainer position="top-right" autoClose={3000} />
      <LayoutContent>
        <Navbar />
        <main className='flex min-h-screen flex-col mt-[80px]'>{children}</main>
      </LayoutContent>
    </GlobalState>
  );
}

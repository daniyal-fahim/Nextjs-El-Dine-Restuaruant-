// pages/index.js or pages/index.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page when the component mounts
    router.replace('/Login');
  }, [router]);

  return null; // Return null since we are redirecting
}

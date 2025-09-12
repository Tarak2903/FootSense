"use client";
import { useAuth } from '../Context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';  

const RouteGuard = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return null;
  }
  return children;
};

export default RouteGuard;
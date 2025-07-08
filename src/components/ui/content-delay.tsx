"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface ContentDelayProps {
  children: React.ReactNode;
  delay?: number;
}

export default function ContentDelay({ children, delay = 1200 }: ContentDelayProps) {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Sembunyikan content ketika route berubah
    setIsReady(false);

    // Tampilkan content setelah delay
    const timer = setTimeout(() => {
      setIsReady(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [pathname, delay]);

  // Render content dengan opacity transition
  return (
    <div 
      className={`transition-opacity duration-300 ease-in-out ${
        isReady ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
}

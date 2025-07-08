"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";

// Context untuk mengelola state loading global
interface LoadingContextType {
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
});

export const useLoading = () => useContext(LoadingContext);

// Provider wrapper untuk aplikasi
export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  // Effect untuk handle perubahan route
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // Durasi loading 1.2 detik

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export default function LoadingBar() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    // Reset dan mulai loading
    setProgress(0);
    setVisible(true);

    let progressTimer: NodeJS.Timeout | undefined;

    // Animasi progress yang smooth
    const startProgress = () => {
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            if (progressTimer) clearInterval(progressTimer);
            return 90;
          }
          // Progress bertahap dengan kecepatan yang berkurang
          const increment = Math.random() * (85 - prev) * 0.1;
          return prev + increment;
        });
      }, 100);
    };

    startProgress();

    // Selesaikan loading
    const finishTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    }, 1000);

    return () => {
      if (progressTimer) clearInterval(progressTimer);
      clearTimeout(finishTimer);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-gray-100">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-200 ease-out relative overflow-hidden"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
        }}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-pulse" />
      </div>
    </div>
  );
}

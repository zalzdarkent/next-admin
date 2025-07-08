"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface PageLoadingWrapperProps {
  children: React.ReactNode;
}

export default function PageLoadingWrapper({ children }: PageLoadingWrapperProps) {
  const [isPageReady, setIsPageReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  useEffect(() => {
    // Reset state ketika path berubah
    setIsPageReady(false);
    setProgress(0);

    let progressTimer: NodeJS.Timeout | undefined;

    // Simulasi loading progress
    const startProgress = () => {
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            if (progressTimer) clearInterval(progressTimer);
            return 90;
          }
          const increment = Math.random() * (85 - prev) * 0.12;
          return prev + increment;
        });
      }, 80);
    };

    startProgress();

    // Selesaikan loading dan tampilkan halaman
    const finishTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsPageReady(true);
        setProgress(0);
      }, 200);
    }, 1000);

    return () => {
      if (progressTimer) clearInterval(progressTimer);
      clearTimeout(finishTimer);
    };
  }, [pathname]);

  return (
    <>
      {/* Loading Progress Bar */}
      {!isPageReady && (
        <div className="fixed top-0 left-0 right-0 z-[70] h-1 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition-all duration-150 ease-out relative overflow-hidden"
            style={{
              width: `${progress}%`,
              boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)",
            }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-pulse" />
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {!isPageReady && (
        <div className="fixed inset-0 z-[65] bg-white bg-opacity-80 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading...</p>
          </div>
        </div>
      )}

      {/* Content - hanya ditampilkan setelah loading selesai */}
      <div 
        className={`transition-opacity duration-300 ${
          isPageReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ display: isPageReady ? 'block' : 'none' }}
      >
        {children}
      </div>
    </>
  );
}

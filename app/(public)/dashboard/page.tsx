"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

// Dummy products data
const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Classic White Shirt",
    price: 49.99,
    image: "👔",
    category: "men",
    description: "Premium cotton blend for everyday comfort",
  },
  {
    id: 2,
    name: "Elegant Evening Dress",
    price: 129.99,
    image: "👗",
    category: "women",
    description: "Perfect for special occasions",
  },
  {
    id: 3,
    name: "Casual Denim Jacket",
    price: 79.99,
    image: "🧥",
    category: "men",
    description: "Timeless style with modern fit",
  },
  {
    id: 4,
    name: "Summer Floral Blouse",
    price: 39.99,
    image: "👚",
    category: "women",
    description: "Light and breezy for warm days",
  },
  {
    id: 5,
    name: "Smart Watch Pro",
    price: 299.99,
    image: "⌚",
    category: "accessories",
    description: "Track your style and fitness",
  },
  {
    id: 6,
    name: "Designer Sunglasses",
    price: 159.99,
    image: "🕶️",
    category: "accessories",
    description: "UV protection with premium style",
  },
  {
    id: 7,
    name: "Leather Messenger Bag",
    price: 189.99,
    image: "👜",
    category: "accessories",
    description: "Genuine leather, timeless design",
  },
  {
    id: 8,
    name: "Running Sneakers",
    price: 89.99,
    image: "👟",
    category: "shoes",
    description: "Comfort meets performance",
  },
];

export default function DashboardPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products] = useState(dummyProducts);
  const [liked, setLiked] = useState<number[]>([]);
  const [passed, setPassed] = useState<number[]>([]);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragCurrent, setDragCurrent] = useState<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentProduct = products[currentIndex];

  const handleSwipe = (direction: "left" | "right") => {
    if (currentIndex >= products.length) return;

    setSwipeDirection(direction);
    
    setTimeout(() => {
      if (direction === "right") {
        setLiked([...liked, currentProduct.id]);
      } else {
        setPassed([...passed, currentProduct.id]);
      }
      setCurrentIndex(currentIndex + 1);
      setSwipeDirection(null);
      setDragStart(null);
      setDragCurrent(null);
    }, 300);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart) {
      setDragCurrent({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    if (dragStart && dragCurrent) {
      const diff = dragCurrent.x - dragStart.x;
      if (Math.abs(diff) > 100) {
        handleSwipe(diff > 0 ? "right" : "left");
      } else {
        setDragStart(null);
        setDragCurrent(null);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStart) {
      const touch = e.touches[0];
      setDragCurrent({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchEnd = () => {
    if (dragStart && dragCurrent) {
      const diff = dragCurrent.x - dragStart.x;
      if (Math.abs(diff) > 100) {
        handleSwipe(diff > 0 ? "right" : "left");
      } else {
        setDragStart(null);
        setDragCurrent(null);
      }
    }
  };

  const getCardTransform = () => {
    if (swipeDirection === "left") return "animate-swipeLeft";
    if (swipeDirection === "right") return "animate-swipeRight";
    if (dragStart && dragCurrent) {
      const diffX = dragCurrent.x - dragStart.x;
      const rotation = diffX / 20;
      return { transform: `translateX(${diffX}px) rotate(${rotation}deg)` };
    }
    return {};
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-2xl font-bold text-white">
                T
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900">TAPTO</span>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 transition">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {liked.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {liked.length}
                  </span>
                )}
              </button>
              <button className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 transition">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-md px-4 py-8">
        {currentIndex < products.length ? (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Product {currentIndex + 1} of {products.length}</span>
              <span>{liked.length} liked</span>
            </div>

            {/* Swipe Card */}
            <div className="relative h-[600px] touch-none">
              <div
                ref={cardRef}
                className={`absolute inset-0 ${swipeDirection ? getCardTransform() : ""}`}
                style={!swipeDirection && dragStart && dragCurrent ? getCardTransform() : undefined}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="relative h-full w-full cursor-grab active:cursor-grabbing">
                  <div className="h-full rounded-3xl bg-white shadow-2xl overflow-hidden">
                    {/* Product Image Area */}
                    <div className="relative h-2/3 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                      <div className="text-9xl animate-float">{currentProduct.image}</div>
                      
                      {/* Swipe Indicators */}
                      {dragStart && dragCurrent && (
                        <>
                          {dragCurrent.x - dragStart.x > 50 && (
                            <div className="absolute top-8 right-8 rounded-full bg-green-500 px-6 py-3 text-white font-bold text-xl shadow-lg rotate-12">
                              LIKE
                            </div>
                          )}
                          {dragCurrent.x - dragStart.x < -50 && (
                            <div className="absolute top-8 left-8 rounded-full bg-red-500 px-6 py-3 text-white font-bold text-xl shadow-lg -rotate-12">
                              PASS
                            </div>
                          )}
                        </>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-6 left-6 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-gray-700 shadow-md">
                        {currentProduct.category}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{currentProduct.name}</h2>
                        <p className="mt-2 text-gray-600">{currentProduct.description}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-blue-600">${currentProduct.price}</span>
                        <div className="flex gap-2">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                            Free Shipping
                          </span>
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                            In Stock
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => handleSwipe("left")}
                className="group flex h-16 w-16 items-center justify-center rounded-full border-4 border-red-500 bg-white text-red-500 shadow-lg transition-all hover:scale-110 hover:bg-red-500 hover:text-white active:scale-95"
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:scale-110 active:scale-95">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              <button
                onClick={() => handleSwipe("right")}
                className="group flex h-16 w-16 items-center justify-center rounded-full border-4 border-emerald-500 bg-white text-emerald-500 shadow-lg transition-all hover:scale-110 hover:bg-emerald-500 hover:text-white active:scale-95"
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Instructions */}
            <div className="text-center text-sm text-gray-500">
              <p>Swipe right to like • Swipe left to pass</p>
            </div>
          </div>
        ) : (
          // No More Products
          <div className="flex flex-col items-center justify-center space-y-6 py-20 text-center">
            <div className="text-8xl animate-bounce">🎉</div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">You&apos;ve Seen It All!</h2>
              <p className="text-gray-600">Check back later for new arrivals</p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Activity</h3>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600">{liked.length}</div>
                  <div className="text-sm text-gray-600">Items Liked</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-600">{passed.length}</div>
                  <div className="text-sm text-gray-600">Items Passed</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentIndex(0);
                setLiked([]);
                setPassed([]);
              }}
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfileDropdown from "./ProfileDropdown";
import { getProducts, getPersonalizedProducts, Product } from "@/lib/api/products";

// Product catalog - now fetched from API
const productCatalog: Product[] = [];

type ViewMode = "browse" | "favorites" | "cart";

export default function DashboardPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragCurrent, setDragCurrent] = useState<{ x: number; y: number } | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("browse");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const cardRef = useRef<HTMLDivElement>(null);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Try personalized products first, fallback to all products if not authenticated
        let fetchedProducts: Product[];
        try {
          fetchedProducts = await getPersonalizedProducts(50);
        } catch (personalizedError) {
          console.log('User not authenticated or personalized products failed, fetching all products');
          fetchedProducts = await getProducts();
        }
        setProducts(fetchedProducts);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Load favorites and cart from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedCart = localStorage.getItem('cart');
    
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (err) {
        console.error('Error parsing saved favorites:', err);
      }
    }
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error('Error parsing saved cart:', err);
      }
    }
  }, []);

  // Save favorites and cart to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const currentProduct = products[currentIndex];
  const favoriteProducts = products.filter(p => favorites.includes(p._id));
  const cartProducts = products.filter(p => cart.includes(p._id));

  const handleSwipe = (direction: "left" | "right") => {
    if (currentIndex >= products.length) return;

    setSwipeDirection(direction);
    
    setTimeout(() => {
      if (direction === "right") {
        if (!favorites.includes(currentProduct._id)) {
          setFavorites([...favorites, currentProduct._id]);
        }
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
    if (dragStart && dragCurrent) {
      const diffX = dragCurrent.x - dragStart.x;
      const rotation = diffX / 20;
      return { transform: `translateX(${diffX}px) rotate(${rotation}deg)` };
    }
    return {};
  };

  const getCardClass = () => {
    if (swipeDirection === "left") return "animate-swipeLeft";
    if (swipeDirection === "right") return "animate-swipeRight";
    return "";
  };

  const getDiscountedPrice = (product: Product) => {
    if (product.discount) {
      return (product.price * (1 - product.discount / 100)).toFixed(2);
    }
    return product.price.toFixed(2);
  };

  const toggleFavorite = (productId: string) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const toggleCart = (productId: string) => {
    if (cart.includes(productId)) {
      setCart(cart.filter(id => id !== productId));
    } else {
      setCart([...cart, productId]);
    }
  };

  const categories = ["All", "Men", "Women", "Accessories", "Shoes"];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/logo1.png"
                alt="TAPTO Logo"
                className="h-10 w-auto"
              />
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setViewMode("browse")}
                className={`text-sm font-medium transition ${
                  viewMode === "browse" ? "text-indigo-600" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Browse
              </button>
              <button
                onClick={() => setViewMode("favorites")}
                className={`text-sm font-medium transition ${
                  viewMode === "favorites" ? "text-indigo-600" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Favorites
              </button>
              <button
                onClick={() => setViewMode("cart")}
                className={`text-sm font-medium transition ${
                  viewMode === "cart" ? "text-indigo-600" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Cart
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>

              <button
                onClick={() => router.push('/user/wishlist')}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => router.push('/user/cart')}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-600 rounded-full text-xs text-white flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Profile Dropdown */}
              <ProfileDropdown />
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          filterCategory === cat
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${maxPrice}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {viewMode === "browse" ? (
          <div className="max-w-md mx-auto">
            {currentIndex < products.length ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Product {currentIndex + 1} of {products.length}</span>
                  <button
                    onClick={() => setViewMode("favorites")}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    View Favorites
                  </button>
                </div>

                {/* Swipe Card */}
                <div className="relative h-[550px] touch-none">
                  {/* Next card preview */}
                  {currentIndex + 1 < products.length && (
                    <div className="absolute inset-0 scale-95 opacity-30">
                      <div className="h-full rounded-2xl bg-white shadow-lg border border-gray-200" />
                    </div>
                  )}

                  <div
                    ref={cardRef}
                    className={`absolute inset-0 ${getCardClass()}`}
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
                      <div className="h-full rounded-2xl bg-white shadow-xl overflow-hidden border border-gray-200">
                        {/* Product Image Area */}
                        <div className="relative h-3/5 bg-gray-100">
                          {currentProduct.images && currentProduct.images.length > 0 ? (
                            <img
                              src={`http://localhost:4000${currentProduct.images[0]}`}
                              alt={currentProduct.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                              No Image
                            </div>
                          )}

                          {/* Discount Badge */}
                          {currentProduct.discount && (
                            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                              {currentProduct.discount}% OFF
                            </div>
                          )}

                          {/* Swipe Indicators */}
                          {dragStart && dragCurrent && (
                            <>
                              {dragCurrent.x - dragStart.x > 50 && (
                                <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
                                  <div className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-xl">
                                    ADD TO FAVORITES
                                  </div>
                                </div>
                              )}
                              {dragCurrent.x - dragStart.x < -50 && (
                                <div className="absolute inset-0 bg-gray-500 bg-opacity-20 flex items-center justify-center">
                                  <div className="bg-gray-700 text-white px-6 py-3 rounded-lg font-bold text-xl">
                                    SKIP
                                  </div>
                                </div>
                              )}
                            </>
                          )}

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium text-gray-700">
                            {currentProduct.category}
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-6 space-y-4">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900">{currentProduct.name}</h2>
                            <p className="mt-2 text-gray-600 text-sm">{currentProduct.description}</p>
                          </div>

                          {/* Rating */}
                          {currentProduct.rating && (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(currentProduct.rating || 0)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">
                                {currentProduct.rating} ({currentProduct.reviews} reviews)
                              </span>
                            </div>
                          )}

                          {/* Tags */}
                          {currentProduct.tags && (
                            <div className="flex flex-wrap gap-2">
                              {currentProduct.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-3">
                              {currentProduct.discount ? (
                                <>
                                  <span className="text-3xl font-bold text-gray-900">
                                    ${getDiscountedPrice(currentProduct)}
                                  </span>
                                  <span className="text-lg text-gray-400 line-through">
                                    ${currentProduct.price.toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-3xl font-bold text-gray-900">
                                  ${currentProduct.price.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleSwipe("left")}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-white border-2 border-gray-300 text-gray-600 shadow-md transition-all hover:scale-105 hover:border-gray-400 active:scale-95"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <button
                    onClick={() => {
                      toggleCart(currentProduct._id);
                      handleSwipe("right");
                    }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-all hover:scale-105 hover:bg-indigo-700 active:scale-95"
                  >
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleSwipe("right")}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-white border-2 border-indigo-600 text-indigo-600 shadow-md transition-all hover:scale-105 hover:bg-indigo-50 active:scale-95"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  <p>Swipe right to favorite • Tap cart to add • Swipe left to skip</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-6 py-20 text-center">
                <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">All Products Browsed</h2>
                  <p className="text-gray-600">Check your favorites or start over</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setViewMode("favorites")}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                  >
                    View Favorites
                  </button>
                  <button
                    onClick={() => setCurrentIndex(0)}
                    className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : viewMode === "favorites" ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Favorites</h2>
              <button
                onClick={() => setViewMode("browse")}
                className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
              >
                Back to Browse
              </button>
            </div>

            {favoriteProducts.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className="text-gray-600">No favorites yet</p>
                <button
                  onClick={() => setViewMode("browse")}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                  Start Browsing
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {favoriteProducts.map(product => (
                  <Link key={product._id} href={`/product/${product._id}`} className="block">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition group">
                      <div className="aspect-square bg-gray-100 relative">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={`http://localhost:4000${product.images[0]}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                            No Image
                          </div>
                        )}
                        {product.discount && (
                          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            {product.discount}% OFF
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(product._id);
                          }}
                          className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
                        >
                          <svg className="h-5 w-5 text-red-500 fill-current" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                        </button>
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            {product.discount ? (
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-gray-900">
                                  ${getDiscountedPrice(product)}
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                  ${product.price.toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold text-gray-900">
                                ${product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleCart(product._id);
                            }}
                            className={`p-2 rounded-lg transition ${
                              cart.includes(product._id)
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
              <button
                onClick={() => setViewMode("browse")}
                className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
              >
                Continue Shopping
              </button>
            </div>

            {cartProducts.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-gray-600">Your cart is empty</p>
                <button
                  onClick={() => setViewMode("browse")}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartProducts.map(product => (
                  <Link key={product._id} href={`/product/${product._id}`} className="block">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={`http://localhost:4000${product.images[0]}`}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                        <div className="mt-2">
                          {product.discount ? (
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-gray-900">
                                ${getDiscountedPrice(product)}
                              </span>
                              <span className="text-sm text-gray-400 line-through">
                                ${product.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold text-gray-900">
                              ${product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleCart(product._id);
                        }}
                        className="p-2 h-10 text-gray-400 hover:text-red-600 transition flex-shrink-0"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </Link>
                ))}

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-medium text-gray-700">Subtotal</span>
                    <span className="font-bold text-gray-900">
                      ${cartProducts.reduce((sum, p) => sum + (p.discount ? Number(getDiscountedPrice(p)) : p.price), 0).toFixed(2)}
                    </span>
                  </div>
                  <Link href="/checkout" className="block">
                    <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes swipeLeft {
          to {
            transform: translateX(-150%) rotate(-30deg);
            opacity: 0;
          }
        }
        @keyframes swipeRight {
          to {
            transform: translateX(150%) rotate(30deg);
            opacity: 0;
          }
        }
        .animate-swipeLeft {
          animation: swipeLeft 0.3s ease-out forwards;
        }
        .animate-swipeRight {
          animation: swipeRight 0.3s ease-out forwards;
        }
      `}</style>
    </main>
  );
}

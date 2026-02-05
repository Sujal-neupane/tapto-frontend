"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById, Product } from "@/lib/api/products";
import { resolveImageUrl } from "@/lib/utils/image";
import { toast } from "react-toastify";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    try {
      const savedCart = localStorage.getItem('cart') || '[]';
      const cartItems: string[] = JSON.parse(savedCart);
      
      // Add the product ID 'quantity' times
      for (let i = 0; i < quantity; i++) {
        cartItems.push(productId);
      }
      
      localStorage.setItem('cart', JSON.stringify(cartItems));
      toast.success(`${quantity} ${product!.name}${quantity > 1 ? 's' : ''} added to cart!`);
    } catch (err) {
      console.error('Error adding to cart:', err);
      toast.error('Failed to add item to cart');
    }
  };

  const handleBuyNow = () => {
    // Add to cart and redirect to checkout
    handleAddToCart();
    router.push('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error || 'Product not found'}</div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Product Details</h1>
            <div className="w-16"></div> {/* Spacer */}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group">
              {product.images && product.images.length > 0 ? (
                <>
                  <img
                    src={resolveImageUrl(product.images[selectedImage])}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImage(selectedImage === 0 ? product.images!.length - 1 : selectedImage - 1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setSelectedImage(selectedImage === product.images!.length - 1 ? 0 : selectedImage + 1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-indigo-600 shadow-lg scale-105' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={resolveImageUrl(image)}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating || 0} ({product.reviews || 0} reviews)
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600">{product.stock} in stock</span>
                  </div>
                </div>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                {product.discount ? (
                  <>
                    <span className="text-4xl font-bold text-gray-900">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-2xl text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {product.discount}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{product.description}</p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors rounded-l-lg"
                  >
                    <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-4 py-3 font-semibold text-lg min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 hover:bg-gray-100 transition-colors rounded-r-lg"
                  >
                    <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors text-lg shadow-lg hover:shadow-xl"
              >
                Add to Cart - ${discountedPrice.toFixed(2)}
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full border-2 border-indigo-600 text-indigo-600 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-colors text-lg"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'specifications'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews ({product.reviews || 0})
              </button>
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
                
                {product.category && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Category</h3>
                    <p className="text-gray-600 bg-gray-50 px-4 py-2 rounded-lg inline-block">{product.category}</p>
                  </div>
                )}

                {product.tags && product.tags.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.tags.map((tag, index) => (
                        <span key={index} className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">General Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Product ID:</span>
                        <span className="font-medium">{product._id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{product.category || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Stock:</span>
                        <span className="font-medium">{product.stock} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-medium">{product.rating || 0}/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Pricing Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base Price:</span>
                        <span className="font-medium">${product.price.toFixed(2)}</span>
                      </div>
                      {product.discount && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Discount:</span>
                            <span className="font-medium text-red-600">{product.discount}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Final Price:</span>
                            <span className="font-medium text-green-600">${discountedPrice.toFixed(2)}</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Savings:</span>
                        <span className="font-medium text-green-600">
                          ${product.discount ? (product.price - discountedPrice).toFixed(2) : '0.00'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{product.rating || 0}</span>
                    <span className="text-gray-600">({product.reviews || 0} reviews)</span>
                  </div>
                </div>
                
                {product.reviews && product.reviews > 0 ? (
                  <div className="space-y-4">
                    {/* Placeholder reviews - in real app, these would come from API */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">JD</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-900">John Doe</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">Great product! Exactly as described. Fast shipping and excellent quality.</p>
                          <span className="text-sm text-gray-500 mt-2 block">2 days ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                    <p className="text-gray-600">Be the first to review this product!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder for related products - would be fetched from API */}
            <div className="text-center text-gray-500 py-8">
              Related products would be displayed here
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

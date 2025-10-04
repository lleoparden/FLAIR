import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, ArrowLeft, Plus, Minus, Truck, Shield, RefreshCw } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import tee1 from "../assets/tee1.png";
import tee2 from "../assets/tee2.webp";
import tee3 from "../assets/tee3.webp";

const products = {
  "1": {
    id: "1",
    title: "FLAIR 'DEFINE YOUR FORM' Oversized Tee – White",
    price: "LE 420.00",
    oldPrice: "LE 600.00",
    image: tee1,
    images: [tee1, tee1, tee1],
    description: "The 'Define Your Form' oversized tee is the ultimate statement piece. Crafted from premium cotton blend, this tee combines comfort with bold expression. The oversized fit provides a relaxed silhouette perfect for any occasion.",
    features: [
      "100% Premium Cotton Blend",
      "Oversized Relaxed Fit",
      "Screen-printed Graphics",
      "Pre-shrunk Fabric",
      "Machine Washable"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black"]
  },
  "2": {
    id: "2",
    title: "FLAIR 'FLUID' Oversized Tee – White",
    price: "LE 420.00",
    oldPrice: "LE 600.00",
    image: tee2,
    images: [tee2, tee2, tee2],
    description: "Flow with style in the 'Fluid' oversized tee. Designed for those who appreciate both comfort and aesthetics, this piece features unique graphics and a perfect oversized cut.",
    features: [
      "100% Premium Cotton Blend",
      "Oversized Relaxed Fit",
      "Unique Fluid Graphics",
      "Pre-shrunk Fabric",
      "Machine Washable"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black"]
  },
   "3": {
    id: "3",
    title: "Snake's Wind Shorts",
    price: "LE 550.00",
    oldPrice: null,
    image: tee3,
    images: [tee3, tee3, tee3],
    description: "Move with the wind in these premium athletic shorts. Featuring a sleek design with bold graphics, these shorts offer comfort and style whether you're working out or hanging out.",
    features: [
      "Lightweight Performance Fabric",
      "Moisture-Wicking Technology",
      "Elastic Waistband with Drawstring",
      "Side Pockets",
      "Machine Washable"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Grey"]
  }
};

export default function ProductView() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Get product ID from URL
  const productId = window.location.pathname.split('/').pop();
  const product = products[productId] || products["1"];

  useEffect(() => {
    setIsVisible(true);
    setSelectedColor(product.colors[0]);
    window.scrollTo(0, 0);
  }, [product]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-8 mb-8">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-gray-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Shop
          </a>
        </div>

        {/* Product Content */}
        <div className="max-w-7xl mx-auto px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {product.oldPrice && (
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-medium tracking-wider uppercase">
                    Sale
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square overflow-hidden bg-gray-50 border-2 transition-all ${selectedImage === idx ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Title & Price */}
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight leading-tight">
                  {product.title}
                </h1>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-black">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        {product.oldPrice}
                      </span>
                      <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded">
                        Save {Math.round(((parseFloat(product.oldPrice.replace(/[^\d.]/g, '')) - parseFloat(product.price.replace(/[^\d.]/g, ''))) / parseFloat(product.oldPrice.replace(/[^\d.]/g, ''))) * 100)}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-bold mb-3 tracking-wide uppercase">
                  Color: <span className="font-normal">{selectedColor}</span>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 border-2 transition-all font-medium ${selectedColor === color ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-bold mb-3 tracking-wide uppercase">
                  Size: {selectedSize && <span className="font-normal">{selectedSize}</span>}
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border-2 transition-all font-medium ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-bold mb-3 tracking-wide uppercase">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-300">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-3 font-bold min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-3 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  disabled={!selectedSize}
                  className="w-full py-4 bg-black text-white font-bold uppercase tracking-wider transition-all hover:bg-gray-800 flex items-center justify-center gap-3 disabled:bg-gray-300 disabled:cursor-not-allowed group"
                >
                  <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
                  Add to Cart
                </button>
                <button className="w-full py-4 border-2 border-black text-black font-bold uppercase tracking-wider transition-all hover:bg-black hover:text-white flex items-center justify-center gap-3">
                  <Heart className="w-5 h-5" />
                  Add to Wishlist
                </button>
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="font-bold text-lg mb-4 tracking-wide uppercase">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600">
                      <span className="mt-1 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipping Info */}
              <div className="border-t border-gray-200 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-sm mb-1">Free Shipping</h4>
                    <p className="text-xs text-gray-600">On orders over LE 500</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-sm mb-1">Easy Returns</h4>
                    <p className="text-xs text-gray-600">30-day return policy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-sm mb-1">Secure Payment</h4>
                    <p className="text-xs text-gray-600">100% secure checkout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="max-w-7xl mx-auto px-8 mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black tracking-tight mb-2">
              You May Also Like
            </h2>
            <p className="text-gray-600">Check out these similar items</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.values(products).filter(p => p.id !== product.id).slice(0, 3).map((relatedProduct) => (
              <a
                key={relatedProduct.id}
                href={`/product/${relatedProduct.id}`}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50 mb-4">
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {relatedProduct.oldPrice && (
                    <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-medium tracking-wider uppercase">
                      Sale
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-medium mb-2 line-clamp-2">
                  {relatedProduct.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{relatedProduct.price}</span>
                  {relatedProduct.oldPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      {relatedProduct.oldPrice}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
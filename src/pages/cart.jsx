import { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

import tee1 from "../assets/tee1.png";
import tee2 from "../assets/tee2.webp";
import tee3 from "../assets/tee3.webp";



function Cart() {
  const [isVisible, setIsVisible] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "FLAIR 'DEFINE YOUR FORM' Oversized Tee – White",
      price: 420.00,
      quantity: 1,
      size: 'L',
      image: tee1
    },
    {
      id: 2,
      name: "FLAIR 'FLUID' Oversized Tee – White",
      price: 420.00,
      quantity: 2,
      size: 'M',
      image: tee2
    },
    {
      id: 3,
      name: "Snake's Wind Shorts",
      price: 550.00,
      quantity: 1,
      size: 'L',
      image: tee3
    }
  ]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 50.00;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white pt-10">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-4">
              <span className="text-xs tracking-[0.3em] uppercase text-gray-600">Your Cart</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter">
              SHOPPING BAG
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className={`text-center py-20 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-gray-300" />
                <h2 className="text-2xl font-bold text-black mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Add some items to get started</p>
                <button className="px-10 py-4 bg-black text-white font-medium hover:scale-105 transition-transform duration-300">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`group relative bg-white border-2 border-gray-100 hover:border-black transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex gap-6 p-6">
                      {/* Image */}
                      <div className="relative w-32 h-40 flex-shrink-0 overflow-hidden bg-gray-50">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-black mb-2 tracking-wide">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Size: {item.size}</span>
                          </div>
                        </div>

                        <div className="flex items-end justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4">
                            <span className="text-xs uppercase tracking-wider text-gray-600">Qty</span>
                            <div className="flex items-center border-2 border-black">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-2 hover:bg-black hover:text-white transition-colors duration-200"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-6 font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-2 hover:bg-black hover:text-white transition-colors duration-200"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-2xl font-bold text-black">
                              LE {(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">
                              LE {item.price.toFixed(2)} each
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black hover:bg-gray-100 transition-all duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`sticky top-8 bg-black text-white p-8 transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <h2 className="text-2xl font-black tracking-wider mb-8 uppercase">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span className="font-medium">LE {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="font-medium">LE {shipping.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-700 my-4"></div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>LE {total.toFixed(2)}</span>
                </div>
              </div>

              <button className="group w-full py-4 bg-white text-black font-medium uppercase tracking-wider transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 mb-4">
                Checkout
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button className="w-full py-4 border-2 border-white text-white font-medium uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black">
                Continue Shopping
              </button>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-white mt-2 flex-shrink-0"></div>
                    <span>Free returns within 14 days</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-white mt-2 flex-shrink-0"></div>
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-white mt-2 flex-shrink-0"></div>
                    <span>Ships within 2-3 business days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className={`bg-black py-20 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-800 border border-gray-800">
            {[
              { title: 'Free Shipping', desc: 'On orders over LE 500' },
              { title: 'Easy Returns', desc: '14 days return policy' },
              { title: 'Secure Payment', desc: 'Protected transactions' }
            ].map((item, i) => (
              <div
                key={i}
                className="p-12 bg-black hover:bg-white group transition-all duration-500"
              >
                <div className="text-5xl font-black text-white mb-4 group-hover:text-black transition-colors">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-black transition-colors tracking-wide">
                  {item.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-600 transition-colors font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
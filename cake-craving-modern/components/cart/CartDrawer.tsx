'use client';

import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-cream-light shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="bg-cocoa-dark text-cream-light p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag size={24} className="text-gold" />
            <h2 className="text-2xl font-bold">Your Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gold hover:text-gold-light transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-cocoa-medium">
              <ShoppingBag size={64} className="mb-4 opacity-30" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm mt-2">Add some delicious chocolates!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-4 border border-gold/20"
                >
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-cocoa-dark text-sm mb-1 truncate">
                        {item.name}
                      </h3>
                      <p className="text-gold font-bold text-sm mb-2">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 bg-cream rounded-full p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-cocoa-dark text-gold rounded-full p-1 hover:bg-cocoa-medium transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-cocoa-dark font-semibold w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-cocoa-dark text-gold rounded-full p-1 hover:bg-cocoa-medium transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-cocoa-medium hover:text-cocoa-dark text-xs font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="bg-white border-t-2 border-gold/30 p-6 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold text-cocoa-dark">Total ({totalItems} items)</span>
              <span className="font-bold text-gold text-2xl">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-cocoa-dark hover:bg-cocoa-medium text-gold font-bold py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Proceed to Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full bg-cream hover:bg-cream-light text-cocoa-dark font-semibold py-3 rounded-lg transition-all duration-300 border-2 border-cocoa-dark/20"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

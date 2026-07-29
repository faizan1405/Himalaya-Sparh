'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionHeading, CTAButton } from '@/components/public/Sections';
import { ShoppingCart, Minus, Plus, Check } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  features: string[];
  stock: number;
}

export default function BuyPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content/buy')
      .then((r) => r.json())
      .then((data) => {
        setProduct(data[0] || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/forms/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ productId: product!._id, name: product!.name, quantity, price: product!.price }],
          total: product!.price * quantity,
          customer: {},
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Order placed! Order ID: ${data.orderId}`);
      }
    } catch (e) {
      alert('Something went wrong. Please try again.');
    }
  };

  if (loading) {
    return (
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="w-48 h-8 bg-silver/20 rounded animate-pulse mb-8" />
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-silver/20 rounded-3xl animate-pulse" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-full h-6 bg-silver/20 rounded animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-heading font-bold text-navy mb-4">Buy Himalya Sparsh</h1>
          <p className="text-navy/60">Product details will be displayed once added via admin panel.</p>
          <CTAButton href="/contact">Contact for Purchase</CTAButton>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-navy/50 mb-8">
            <span>Home</span>
            <span>/</span>
            <span className="text-navy">Buy Now</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="aspect-square bg-ice/50 rounded-3xl flex items-center justify-center overflow-hidden">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <div className="w-40 h-40 mx-auto bg-gradient-to-br from-blue-500 to-navy rounded-3xl flex items-center justify-center mb-4">
                      <ShoppingCart className="w-20 h-20 text-white" />
                    </div>
                    <p className="text-navy/40 text-sm">Product Image</p>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mb-4">
                In Stock ({product.stock} units)
              </span>
              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-navy mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-navy">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-navy/40 line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <p className="text-navy/70 leading-relaxed mb-6">{product.description}</p>

              {/* Features */}
              {product.features?.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-heading font-bold text-navy mb-3">Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-navy/70 text-sm">
                        <Check className="w-4 h-4 text-green-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border border-silver/30 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-ice transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-ice transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={handleCheckout} className="flex-1 btn-primary py-3.5">
                  Buy Now
                </button>
                <button className="px-6 py-3.5 border-2 border-navy rounded-full font-semibold hover:bg-navy hover:text-white transition-colors">
                  Add to Cart
                </button>
              </div>

              <p className="text-navy/40 text-xs mt-4">
                Payment integration coming soon. Contact us for immediate purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-ice/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Frequently Asked Questions" centered />
          <div className="space-y-4">
            {[
              { q: 'How long does the device last?', a: 'With proper care and maintenance, the device is designed for long-term daily use.' },
              { q: 'Is it compatible with my water source?', a: 'Yes, the device works universally with tap water, RO water, and water dispensers.' },
              { q: 'Do I need electricity?', a: 'No, the device operates without electricity.' },
              { q: 'What is the warranty?', a: 'Warranty details will be provided with the product. Please contact us for specifics.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-silver/20">
                <h3 className="font-heading font-semibold text-navy mb-2">{faq.q}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

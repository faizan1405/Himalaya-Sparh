'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Minus, Plus, Check, Shield, Truck, Star } from 'lucide-react';
import { Section, SectionHeading, Card, CTAButton } from '@/components/public/Sections';

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
  const [error, setError] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    fetch('/api/content?type=product')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setProduct(data?.[0] || null);
        setLoading(false);
      })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  const handleCheckout = async () => {
    if (!product) return;

    try {
      const res = await fetch('/api/forms/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ productId: product._id, name: product.name, quantity, price: product.price }],
          total: product.price * quantity,
          customer: {},
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOrderPlaced(true);
      } else {
        alert(data.error || 'Something went wrong. Please try again.');
      }
    } catch (e) {
      alert('Something went wrong. Please try again.');
    }
  };

  if (loading) {
    return (
      <main>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-48 h-8 bg-white/10 rounded animate-pulse mb-8" />
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-white/[0.03] rounded-3xl animate-pulse border border-white/[0.06]" />
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-full h-6 bg-white/[0.03] rounded animate-pulse border border-white/[0.06]" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main>
        <section className="py-20 lg:py-28">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-green-400" />
            </motion.div>
            <h1 className="heading-lg font-display font-bold text-white mb-4">Order Placed!</h1>
            <p className="text-silver/70 text-lg mb-8">Thank you for your purchase. We'll get in touch shortly to confirm your order.</p>
            <CTAButton href="/">Back to Home</CTAButton>
          </div>
        </section>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main>
        <section className="py-20 lg:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-aurora/5 to-aqua/5 rounded-3xl p-12 lg:p-16 border border-white/[0.08]">
              <div className="w-20 h-20 bg-aurora/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-10 h-10 text-aurora" />
              </div>
              <h1 className="heading-lg font-display font-bold text-white mb-4">
                {error ? 'Something Went Wrong' : 'Product Coming Soon'}
              </h1>
              <p className="text-silver/70 mb-8 max-w-lg mx-auto">
                {error || 'Product details will be displayed once added via admin panel.'}
              </p>
              <CTAButton href="/contact">Contact for Purchase</CTAButton>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* Product Hero */}
      <section className="relative py-20 bg-gradient-to-b from-navy via-midnight to-navy overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/images/mountain-pattern.svg')] bg-repeat" />
        <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-aurora/10 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-silver/50 mb-8">
            <span className="hover:text-silver transition-colors cursor-pointer">Home</span>
            <span>/</span>
            <span className="text-aurora">Buy Now</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-aurora/5 to-aqua/5 rounded-3xl border border-white/[0.08] backdrop-blur-sm flex items-center justify-center overflow-hidden">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain p-8" />
                ) : (
                  <div className="text-center">
                    <div className="w-40 h-40 mx-auto bg-gradient-to-br from-aurora to-aqua rounded-2xl flex items-center justify-center mb-4 shadow-2xl shadow-aurora/20">
                      <ShoppingCart className="w-20 h-20 text-white" />
                    </div>
                    <p className="text-silver/50 text-sm">Product Image</p>
                  </div>
                )}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                {[
                  { icon: Shield, text: 'Authentic' },
                  { icon: Truck, text: 'Free Shipping' },
                  { icon: Star, text: '4.9 Rating' },
                ].map((badge) => (
                  <div key={badge.text} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                    <badge.icon className="w-4 h-4 text-aurora" />
                    <span className="text-silver/70 text-xs font-medium">{badge.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium rounded-full mb-4">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                In Stock ({product.stock} units)
              </span>

              <h1 className="heading-lg font-display font-bold text-white mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold bg-gradient-to-r from-aurora to-aqua bg-clip-text text-transparent">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-silver/40 line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <p className="text-silver/60 leading-relaxed mb-8">{product.description}</p>

              {/* Features */}
              {product.features?.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-silver/70 text-sm">
                        <div className="w-5 h-5 bg-aurora/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-aurora" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity selector */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-silver/70 text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-white/10 bg-white/5 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors rounded-l-xl"
                  >
                    <Minus className="w-4 h-4 text-silver" />
                  </button>
                  <span className="w-12 text-center font-medium text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors rounded-r-xl"
                  >
                    <Plus className="w-4 h-4 text-silver" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCheckout}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-aurora to-aqua text-white font-semibold rounded-full hover:shadow-lg hover:shadow-aurora/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Buy Now — ₹{(product.price * quantity).toLocaleString()}
                </button>
              </div>

              <p className="text-silver/40 text-xs mt-4">
                Payment integration coming soon. Contact us for immediate purchase.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Section id="faq" dark>
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            label="Support"
            title="Frequently Asked Questions"
            lightTitle
          />

          <div className="space-y-4">
            {[
              { q: 'How long does the device last?', a: 'With proper care and maintenance, the device is designed for long-term daily use. Contact us for warranty details.' },
              { q: 'Is it compatible with my water source?', a: 'Yes, the device works universally with tap water, RO water, borewell water, and water dispensers.' },
              { q: 'Do I need electricity?', a: 'No, the device operates completely without electricity — it\'s 100% natural and eco-friendly.' },
              { q: 'What is the warranty?', a: 'Warranty details will be provided with the product. Please contact us for specifics.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card glow>
                  <h3 className="font-display font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-silver/60 text-sm leading-relaxed">{faq.a}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}

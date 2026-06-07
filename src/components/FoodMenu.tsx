"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Wine, Coffee, Utensils } from "lucide-react";

interface MenuItem {
  name: string;
  price: string;
  desc: string;
  isPopular?: boolean;
}

export default function FoodMenu() {
  const [activeCategory, setActiveCategory] = useState("Burgers");

  const categories = [
    { name: "Burgers", image: "/assets/food_burger.png" },
    { name: "Pizzas", image: "/assets/food_pizza.png" },
    { name: "Mocktails", image: "/assets/food_drink.png" },
    { name: "Fries & Snacks", image: "/assets/food_burger.png" },
    { name: "Shakes & Coffees", image: "/assets/food_drink.png" },
  ];

  const menuData: Record<string, MenuItem[]> = {
    Burgers: [
      {
        name: "GOB Truffle Wagyu Burger",
        price: "₹650",
        desc: "Premium double wagyu patty, melted Swiss gruyère, wild forest truffles, charred onion aioli on buttered brioche.",
        isPopular: true,
      },
      {
        name: "Crispy Avocado Mushroom Burger",
        price: "₹480",
        desc: "Crispy portobello cap stuffed with cheese, fresh Hass avocado, organic rocket greens, garlic mustard spreads.",
      },
      {
        name: "Smoked Hickory BBQ Chicken Burger",
        price: "₹520",
        desc: "Buttermilk chicken breast tossed in house hickory wood BBQ glaze, jalapeño slaw, and cheddar slices.",
      },
    ],
    Pizzas: [
      {
        name: "Artisanal Burrata & Basil Pizza",
        price: "₹620",
        desc: "Neapolitan crust, fresh san marzano pomodoro sauce, organic basil oil, topped with cold fresh creamy burrata.",
        isPopular: true,
      },
      {
        name: "Spicy Honey & Calabrian Salami",
        price: "₹680",
        desc: "Hand-stretched sourdough, spicy salami slices, caramelized red onions, drizzled with organic organic hot chili honey.",
      },
      {
        name: "White Truffle & Wild Mushroom",
        price: "₹720",
        desc: "Creamy parmesan base, wild porcini and shiitake mushrooms, fresh chives, finished with aromatic white truffle oil.",
      },
    ],
    Mocktails: [
      {
        name: "Smoked Rosemary Amber Tonic",
        price: "₹320",
        desc: "Handcrafted amber mocktail infused with cold-pressed orange, tonic water, fresh rosemary stem, smoked wood chips.",
        isPopular: true,
      },
      {
        name: "Elderflower Sage Fizz",
        price: "₹290",
        desc: "Muddled fresh sage, elderflower extract, fresh lime juice, sparkling club soda, and fresh cucumber ribbons.",
      },
      {
        name: "Spiced Hibiscus Ginger Brew",
        price: "₹310",
        desc: "Brewed red hibiscus tea, organic honey, raw ginger extract, fresh cinnamon sticks, served over crushed ice.",
      },
    ],
    "Fries & Snacks": [
      {
        name: "Parmesan White Truffle Fries",
        price: "₹320",
        desc: "Double-cooked potato wedges tossed in grated aged parmigiano, sea salt, chopped fresh flat-leaf parsley, and truffle oil.",
        isPopular: true,
      },
      {
        name: "Steamed Edamame & Sea Salt",
        price: "₹280",
        desc: "Fresh green edamame pods steamed and tossed in gourmet flaky Maldon sea salt.",
      },
      {
        name: "Loaded GOB Sourdough Garlic Bread",
        price: "₹340",
        desc: "Thick slices of fresh sourdough loaded with garlic butter, fresh parsley, and melted stringy mozzarella.",
      },
    ],
    "Shakes & Coffees": [
      {
        name: "Salted Caramel Pretzel Shake",
        price: "₹360",
        desc: "Organic vanilla bean gelato blended with homemade sea salted caramel sauce, topped with crushed crunchy pretzels.",
        isPopular: true,
      },
      {
        name: "Belgian Dark Cocoa Silk Shake",
        price: "₹380",
        desc: "Rich 70% dark Belgian chocolate ganache blended with double cream milk, topped with fine cocoa shavings.",
      },
      {
        name: "Rose & Cardamom Iced Latte",
        price: "₹280",
        desc: "Double shot of single-origin espresso, steamed organic milk, rose-water syrup, and ground green cardamom.",
      },
    ],
  };

  const activeImage = categories.find((cat) => cat.name === activeCategory)?.image || "/assets/food_burger.png";

  return (
    <section id="food" className="py-12 bg-[#E5E0D5] text-[#3F2B2A] border-t border-[#C7AB94]/40 relative overflow-hidden">
      {/* Visual background decor */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#C7AB94]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8F9B60] font-bold block mb-3">
            Gourmet Kitchen & Mixology
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#3F2B2A]">
            Food & Drinks Menu
          </h2>
          <p className="text-sm text-[#3F2B2A]/75 mt-3">
            Handcrafted luxury dining designed to pair perfectly with your board gaming table.
          </p>
          <div className="h-0.5 w-16 bg-[#8F9B60] mx-auto mt-4" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left: Large Image with Parallax Switch */}
          <div className="lg:col-span-5 relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden border border-[#C7AB94]/30 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={activeImage}
                  alt={activeCategory}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#E5E0D5]/60 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Interactive Tabs & Menu List */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2.5 pb-4 border-b border-[#C7AB94]/30">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`text-xs uppercase tracking-widest font-semibold px-5 py-3 rounded-full transition-all border ${
                    activeCategory === cat.name
                      ? "bg-[#3F2B2A] text-[#E5E0D5] border-[#3F2B2A] shadow-md"
                      : "bg-transparent text-[#3F2B2A]/75 border-[#C7AB94]/50 hover:border-[#3F2B2A]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {menuData[activeCategory]?.map((item, idx) => (
                    <div key={idx} className="group relative">
                      <div className="flex justify-between items-baseline gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-xl md:text-2xl font-bold text-[#3F2B2A] group-hover:text-[#8F9B60] transition-colors">
                            {item.name}
                          </h4>
                          {item.isPopular && (
                            <span className="text-[9px] uppercase tracking-wider bg-[#8F9B60]/20 text-[#8F9B60] border border-[#8F9B60]/30 font-bold px-2 py-0.5 rounded-full">
                              Chef Spec
                            </span>
                          )}
                        </div>
                        <span className="h-px flex-grow border-t border-dashed border-[#C7AB94]/40" />
                        <span className="font-serif text-lg md:text-xl font-bold text-[#8F9B60]">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-[#3F2B2A]/70 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

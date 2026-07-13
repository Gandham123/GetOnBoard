"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ParticleRain from "./ParticleRain";

interface MenuItem {
  name: string;
  price: string;
  desc: string;
  isVeg: boolean;
}

export default function FoodMenu() {
  const [activeCategory, setActiveCategory] = useState("Starters");

  const categories = [
    { name: "Starters", image: "/assets/starter_light.png" },
    { name: "Sandwiches & Burgers", image: "/assets/sandwiches.png" },
    { name: "Drinks & Mocktails", image: "/assets/drinks.png" },
    { name: "Rice Bowls", image: "/assets/ricebowls.png" },
    { name: "Beverages", image: "/assets/beverages.png" },
    { name: "Regional & Combos", image: "/assets/combo.png" },
  ];

  const menuData: Record<string, MenuItem[]> = {
    Starters: [
      // Veg Starters
      {
        name: "Veg Nuggets",
        price: "₹109",
        desc: "Crispy golden vegetable nuggets served with a flavorful dipping sauce.",
        isVeg: true,
      },
      {
        name: "Veg Fingers",
        price: "₹109",
        desc: "Crunchy vegetable fingers coated in seasoned breadcrumbs and fried to perfection.",
        isVeg: true,
      },
      {
        name: "Potato Cheese Bytes",
        price: "₹118",
        desc: "Crispy potato bites filled with gooey melted cheese.",
        isVeg: true,
      },
      {
        name: "Chilly Garlic Pops",
        price: "₹118",
        desc: "Crispy snack tossed in spicy chilli garlic seasoning.",
        isVeg: true,
      },
      {
        name: "Cheese Corn Triangles",
        price: "₹109",
        desc: "Golden triangles stuffed with sweet corn and creamy cheese filling.",
        isVeg: true,
      },
      {
        name: "Veg Cheese Fingers",
        price: "₹118",
        desc: "Cheesy vegetable fingers coated in crispy breadcrumbs.",
        isVeg: true,
      },
      {
        name: "Jalapeno Poppers",
        price: "₹109",
        desc: "Crispy jalapeños stuffed with rich cheese for a spicy kick.",
        isVeg: true,
      },
      {
        name: "French Fries",
        price: "₹99",
        desc: "Classic crispy golden fries lightly seasoned with salt.",
        isVeg: true,
      },
      {
        name: "Peri Peri French Fries",
        price: "₹109",
        desc: "Crispy fries tossed with spicy peri peri seasoning.",
        isVeg: true,
      },
      {
        name: "PP Cheese French Fries",
        price: "₹109",
        desc: "Peri peri fries topped with delicious melted cheese.",
        isVeg: true,
      },

      // Non-Veg Starters
      {
        name: "Chicken Nuggets",
        price: "₹118",
        desc: "Tender chicken nuggets coated in a crispy golden crust.",
        isVeg: false,
      },
      {
        name: "Chicken Popcorn",
        price: "₹109",
        desc: "Bite-sized crispy chicken popcorn seasoned to perfection.",
        isVeg: false,
      },
      {
        name: "Chicken Fingers",
        price: "₹118",
        desc: "Juicy chicken strips coated with crispy seasoned breadcrumbs.",
        isVeg: false,
      },

      // Maggie
      {
        name: "Plain Maggie",
        price: "₹99",
        desc: "Classic Maggi noodles cooked with signature seasoning.",
        isVeg: true,
      },
      {
        name: "Vegetable Maggie",
        price: "₹109",
        desc: "Maggi noodles loaded with fresh mixed vegetables.",
        isVeg: true,
      },
      {
        name: "Egg Maggie",
        price: "₹118",
        desc: "Classic Maggi noodles topped with perfectly cooked egg.",
        isVeg: false,
      },
      {
        name: "Cheese Maggie",
        price: "₹129",
        desc: "Creamy cheesy Maggi noodles with rich melted cheese.",
        isVeg: true,
      },

      // Momos (Steam/Fried)
      {
        name: "Veg Cheese Momos",
        price: "₹109",
        desc: "Soft momos stuffed with vegetables and creamy cheese.",
        isVeg: true,
      },
      {
        name: "Paneer Tikka Momos",
        price: "₹109",
        desc: "Delicious momos filled with spicy paneer tikka stuffing.",
        isVeg: true,
      },
      {
        name: "Chicken Momos",
        price: "₹118",
        desc: "Juicy chicken-filled momos served steamed or fried.",
        isVeg: false,
      },
      {
        name: "Chicken Cheese Momos",
        price: "₹118",
        desc: "Tender chicken and melted cheese wrapped in soft momos.",
        isVeg: false,
      },
    ],
    "Sandwiches & Burgers": [
      // Burgers
      {
        name: "Mixed Veg Burger",
        price: "₹109",
        desc: "Fresh vegetable patty layered with crunchy veggies and flavorful sauces.",
        isVeg: true,
      },
      {
        name: "Paneer Burji Burger",
        price: "₹118",
        desc: "Soft burger filled with spicy paneer bhurji and fresh vegetables.",
        isVeg: true,
      },
      {
        name: "Paneer Burger",
        price: "₹118",
        desc: "Grilled paneer patty served with crisp lettuce and creamy mayo.",
        isVeg: true,
      },
      {
        name: "Crazy Aloo Cheese Burger",
        price: "₹118",
        desc: "Crispy potato patty topped with melted cheese and signature sauces.",
        isVeg: true,
      },
      {
        name: "Crazy Chicken Burger",
        price: "₹129",
        desc: "Juicy crispy chicken fillet with fresh veggies and house-made sauce.",
        isVeg: false,
      },
      {
        name: "Crazy Chicken Cheese Burger",
        price: "₹129",
        desc: "Crispy chicken burger loaded with rich melted cheese.",
        isVeg: false,
      },
      {
        name: "Chicken Curry Burger",
        price: "₹129",
        desc: "Flavorful chicken curry filling served inside a soft toasted bun.",
        isVeg: false,
      },
      {
        name: "Chicken Mayo Burger",
        price: "₹129",
        desc: "Tender chicken with creamy mayonnaise in a freshly toasted bun.",
        isVeg: false,
      },
      {
        name: "Angry Burger",
        price: "₹139",
        desc: "A fiery spicy burger packed with bold flavors and extra heat.",
        isVeg: false,
      },

      // Sandwiches
      {
        name: "Veg Sandwich",
        price: "₹99",
        desc: "Fresh vegetables layered between perfectly grilled bread slices.",
        isVeg: true,
      },
      {
        name: "Paneer Burji Sandwich",
        price: "₹109",
        desc: "Spiced paneer bhurji stuffed into crispy toasted bread.",
        isVeg: true,
      },
      {
        name: "Paneer Sandwich",
        price: "₹109",
        desc: "Grilled paneer with fresh vegetables and creamy spreads.",
        isVeg: true,
      },
      {
        name: "Sweet Corn Cheese Sandwich",
        price: "₹129",
        desc: "Sweet corn blended with creamy cheese in toasted bread.",
        isVeg: true,
      },
      {
        name: "Bombay Grill Sandwich",
        price: "₹109",
        desc: "Classic Mumbai-style grilled sandwich with spicy chutneys and veggies.",
        isVeg: true,
      },
      {
        name: "Pizza Sandwich",
        price: "₹118",
        desc: "Toasted sandwich loaded with pizza sauce, vegetables, and cheese.",
        isVeg: true,
      },
      {
        name: "Cheezy Bread Pizza Sandwich",
        price: "₹129",
        desc: "Cheesy bread pizza packed with gooey mozzarella and tasty toppings.",
        isVeg: true,
      },
      {
        name: "Chicken Curry Sandwich",
        price: "₹118",
        desc: "Toasted sandwich filled with flavorful chicken curry stuffing.",
        isVeg: false,
      },
      {
        name: "Chicken Mayo Sandwich",
        price: "₹118",
        desc: "Tender chicken mixed with creamy mayo in toasted bread.",
        isVeg: false,
      },
      {
        name: "Egg Burji/Omelet Sandwich",
        price: "₹109",
        desc: "Soft sandwich filled with spicy egg bhurji or fluffy omelet.",
        isVeg: false,
      },
    ],
    "Drinks & Mocktails": [
      // Milkshakes
      {
        name: "Chocolate Milkshake",
        price: "₹179",
        desc: "Rich and creamy chocolate milkshake blended to perfection.",
        isVeg: true,
      },
      {
        name: "Ferrero-Rocher Milkshake",
        price: "₹179",
        desc: "Luxurious Ferrero Rocher milkshake with rich hazelnut chocolate flavor.",
        isVeg: true,
      },
      {
        name: "Oreo Milkshake",
        price: "₹159",
        desc: "Creamy vanilla shake blended with crunchy Oreo cookies.",
        isVeg: true,
      },
      {
        name: "Kit Kat Milkshake",
        price: "₹149",
        desc: "Smooth milkshake infused with delicious Kit Kat chocolate.",
        isVeg: true,
      },
      {
        name: "Blue Berry Milkshake",
        price: "₹149",
        desc: "Refreshing blueberry flavored milkshake with a creamy finish.",
        isVeg: true,
      },
      {
        name: "Strawberry Milkshake",
        price: "₹159",
        desc: "Classic strawberry milkshake made with sweet fruity goodness.",
        isVeg: true,
      },
      {
        name: "Vanilla Milkshake",
        price: "₹149",
        desc: "Smooth and creamy vanilla milkshake with a timeless taste.",
        isVeg: true,
      },
      {
        name: "Kiwi Milkshake",
        price: "₹159",
        desc: "Refreshing kiwi milkshake with a tropical fruity twist.",
        isVeg: true,
      },
      {
        name: "Black Current Milkshake",
        price: "₹159",
        desc: "Creamy milkshake bursting with rich black currant flavor.",
        isVeg: true,
      },
      {
        name: "Mulberry Milkshake",
        price: "₹159",
        desc: "Delicious mulberry flavored milkshake with a creamy texture.",
        isVeg: true,
      },
      {
        name: "Mango Milkshake",
        price: "₹169",
        desc: "Refreshing mango milkshake made with sweet tropical mangoes.",
        isVeg: true,
      },
      {
        name: "Litchi Milkshake",
        price: "₹169",
        desc: "Creamy milkshake blended with juicy litchi flavor.",
        isVeg: true,
      },
      {
        name: "Biscoff Milkshake",
        price: "₹159",
        desc: "Creamy milkshake blended with caramelized Biscoff cookies.",
        isVeg: true,
      },
      {
        name: "Snickers Milkshake",
        price: "₹159",
        desc: "Rich chocolate milkshake loaded with Snickers goodness.",
        isVeg: true,
      },
      {
        name: "Kit Kat Choc. Cookie Milkshake",
        price: "₹169",
        desc: "Creamy Kit Kat and chocolate cookie milkshake for chocolate lovers.",
        isVeg: true,
      },
      {
        name: "Bourbon Milkshake",
        price: "₹149",
        desc: "Classic creamy milkshake blended with Bourbon chocolate biscuits.",
        isVeg: true,
      },

      // Mojitos (All ₹129)
      {
        name: "Virgin Mojito",
        price: "₹129",
        desc: "Refreshing mint and lime cooler with sparkling soda.",
        isVeg: true,
      },
      {
        name: "Kiwi Mojito",
        price: "₹129",
        desc: "Refreshing mojito infused with fresh kiwi flavor.",
        isVeg: true,
      },
      {
        name: "Orange Mojito",
        price: "₹129",
        desc: "Citrusy orange mojito with sparkling freshness.",
        isVeg: true,
      },
      {
        name: "Mango Mojito",
        price: "₹129",
        desc: "Refreshing mango mojito with tropical fruit flavors.",
        isVeg: true,
      },
      {
        name: "Lime & Mint Mojito",
        price: "₹129",
        desc: "Classic mojito with fresh lime, mint, and soda.",
        isVeg: true,
      },
      {
        name: "Blueberry Mojito",
        price: "₹129",
        desc: "Refreshing blueberry mojito with a fruity sparkling twist.",
        isVeg: true,
      },
      {
        name: "Strawberry Mojito",
        price: "₹129",
        desc: "Fresh strawberry mojito bursting with fruity sweetness.",
        isVeg: true,
      },
      {
        name: "Water Melon Mojito",
        price: "₹129",
        desc: "Cool watermelon mojito perfect for a refreshing sip.",
        isVeg: true,
      },
      {
        name: "Ginger & Lime Mojito",
        price: "₹129",
        desc: "Zesty ginger and lime mojito with sparkling soda.",
        isVeg: true,
      },
      {
        name: "Blue Curacao",
        price: "₹129",
        desc: "Vibrant blue mocktail with citrus notes and refreshing fizz.",
        isVeg: true,
      },
      {
        name: "Pina Colada",
        price: "₹129",
        desc: "Creamy tropical pineapple and coconut mocktail.",
        isVeg: true,
      },
    ],
    "Rice Bowls": [
      {
        name: "Avakai Rice",
        price: "₹99",
        desc: "Traditional Andhra rice mixed with homemade mango pickle and signature spices.",
        isVeg: true,
      },
      {
        name: "Avakai Kandipodi Rice",
        price: "₹109",
        desc: "Homemade mango pickle rice blended with aromatic kandipodi and house spices.",
        isVeg: true,
      },
      {
        name: "Red Chilly Rice",
        price: "₹99",
        desc: "Spicy Guntur-style red chilli flavored rice prepared with special seasonings.",
        isVeg: true,
      },
      {
        name: "Tomato Rice",
        price: "₹99",
        desc: "Tangy tomato rice sautéed with flavorful spices and fresh herbs.",
        isVeg: true,
      },
      {
        name: "Egg Masala Rice",
        price: "₹109",
        desc: "Mildly spiced egg rice cooked with aromatic masala and special ingredients.",
        isVeg: false,
      },
      {
        name: "Chef Special Rice (Veg)",
        price: "₹109",
        desc: "Chef's signature vegetable rice loaded with fresh veggies and house seasoning.",
        isVeg: true,
      },
      {
        name: "Chef Special Rice (Egg)",
        price: "₹129",
        desc: "Chef's signature rice topped with egg and seasoned with aromatic spices.",
        isVeg: false,
      },
      {
        name: "Coriander Rice",
        price: "₹109",
        desc: "Fragrant rice tossed with homemade coriander paste and flavorful spices.",
        isVeg: true,
      },
    ],
    "Beverages": [
      // Coffee
      {
        name: "Hot Filter Coffee",
        price: "₹89",
        desc: "Authentic South Indian filter coffee brewed with rich aromatic beans.",
        isVeg: true,
      },
      {
        name: "Hot BRU Coffee",
        price: "₹99",
        desc: "Freshly brewed BRU coffee with a smooth and comforting taste.",
        isVeg: true,
      },
      {
        name: "Hot Black Coffee",
        price: "₹69",
        desc: "Bold black coffee brewed for a rich and intense flavor.",
        isVeg: true,
      },
      {
        name: "Hot Chocolate",
        price: "₹129",
        desc: "Creamy hot chocolate made with rich cocoa and steamed milk.",
        isVeg: true,
      },
      {
        name: "Horlicks",
        price: "₹79",
        desc: "Warm and nourishing Horlicks prepared with creamy milk.",
        isVeg: true,
      },
      {
        name: "Boost",
        price: "₹79",
        desc: "Hot Boost drink blended with milk for an energy-packed refreshment.",
        isVeg: true,
      },

      // Tea
      {
        name: "Hot Tea",
        price: "₹69",
        desc: "Classic hot tea brewed with fresh tea leaves.",
        isVeg: true,
      },
      {
        name: "Masala Tea",
        price: "₹79",
        desc: "Traditional Indian chai infused with aromatic spices.",
        isVeg: true,
      },
      {
        name: "Ginger Tea",
        price: "₹79",
        desc: "Refreshing tea brewed with fresh ginger for a soothing taste.",
        isVeg: true,
      },
      {
        name: "Lemon Tea",
        price: "₹79",
        desc: "Light and refreshing tea blended with fresh lemon flavor.",
        isVeg: true,
      },
      {
        name: "Ice Tea",
        price: "₹79",
        desc: "Chilled iced tea served with a refreshing citrus twist.",
        isVeg: true,
      },
      {
        name: "Black Tea",
        price: "₹59",
        desc: "Pure black tea with a bold and refreshing flavor.",
        isVeg: true,
      },
      {
        name: "Green Tea",
        price: "₹69",
        desc: "Healthy antioxidant-rich green tea with a refreshing taste.",
        isVeg: true,
      },
    ],
    "Regional & Combos": [
      // Regional Specials
      {
        name: "Araku Hot Coffee",
        price: "₹99",
        desc: "Authentic Araku Valley coffee brewed with premium aromatic beans.",
        isVeg: true,
      },
      {
        name: "Kadapa Nannaru",
        price: "₹129",
        desc: "Traditional South Indian herbal cooler with a unique refreshing flavor.",
        isVeg: true,
      },
      {
        name: "Rajahmundry Rose Milk",
        price: "₹149",
        desc: "Refreshing chilled milk infused with fragrant rose syrup.",
        isVeg: true,
      },
      {
        name: "Pondicherry Spicy Mojito",
        price: "₹139",
        desc: "A refreshing mojito with a spicy twist inspired by Pondicherry flavors.",
        isVeg: true,
      },

      // Weekday Combos
      {
        name: "1 Hour Gaming + Burger + Mojito",
        price: "₹279",
        desc: "Enjoy one hour of board gaming with your choice of burger and a refreshing mojito.",
        isVeg: false,
      },
      {
        name: "1 Hour Gaming + Maggie + Any Mojito",
        price: "₹259",
        desc: "One hour of gaming paired with your choice of Maggi and any mojito.",
        isVeg: false,
      },
    ],

  };

  const activeImage = categories.find((cat) => cat.name === activeCategory)?.image || "/assets/food_burger.png";

  return (
    <section id="food" className="py-16 bg-gradient-to-b from-[#F9FBFF] via-white to-white text-[#0D1B2A] border-t border-[#E3F2FD] relative overflow-hidden">
      {/* Visual background decor */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#E3F2FD]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Particle Sprinkler */}
      <ParticleRain count={12} color="rgba(21, 101, 192, 0.12)" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#1565C0] font-bold block mb-3">
            Gourmet Kitchen & Mixology
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#0D1B2A]">
            Food & Drinks Menu
          </h2>
          <p className="text-sm text-[#546E7A] mt-3">
            Handcrafted luxury dining designed to pair perfectly with your board gaming table.
          </p>
          <div className="h-0.5 w-16 bg-[#1565C0] mx-auto mt-4" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 items-center">

          {/* Category Tabs (Mobile only) */}
          <div className="lg:hidden flex flex-wrap gap-2.5 pb-4 border-b border-[#E3F2FD]">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`text-xs uppercase tracking-widest font-semibold px-5 py-3 rounded-full transition-all border ${activeCategory === cat.name
                  ? "bg-[#1565C0] text-white border-[#1565C0] shadow-md shadow-[#1565C0]/10"
                  : "bg-white text-[#546E7A] border-[#E3F2FD] hover:border-[#1565C0] hover:text-[#1565C0] shadow-sm"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Left: Large Image with Parallax Switch */}
          <div className="lg:col-span-5 relative h-[240px] sm:h-[320px] md:h-[500px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Contained sharp foreground image to preserve aspect ratio and display text completely */}
                <div className="relative w-full h-full">
                  <Image
                    src={activeImage}
                    alt={activeCategory}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Interactive Tabs & Menu List */}
          <div className="lg:col-span-7 space-y-8">

            {/* Category Tabs (Desktop only) */}
            <div className="hidden lg:flex flex-wrap gap-2.5 pb-4 border-b border-[#E3F2FD]">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`text-xs uppercase tracking-widest font-semibold px-5 py-3 rounded-full transition-all border ${activeCategory === cat.name
                    ? "bg-[#1565C0] text-white border-[#1565C0] shadow-md shadow-[#1565C0]/10"
                    : "bg-white text-[#546E7A] border-[#E3F2FD] hover:border-[#1565C0] hover:text-[#1565C0] shadow-sm"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="space-y-6 max-h-[400px] overflow-y-scroll">
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
                      <div className="flex justify-between items-center gap-4 mb-2 pr-3">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-xl md:text-2xl font-bold text-[#0D1B2A] group-hover:text-[#1565C0] transition-colors">
                            {item.name}
                          </h4>
                          {!["Drinks & Mocktails", "Beverages", "Regional & Combos"].includes(activeCategory) && (
                            item.isVeg ? (
                              <span className="text-[9px] uppercase tracking-wider bg-[#EBF9EB] text-[#2E7D32] border border-[#C8E6C9]/40 font-bold px-2 py-0.5 rounded-full">
                                Veg
                              </span>
                            ) : (
                              <span className="text-[9px] uppercase tracking-wider bg-[#FDF2F2] text-[#9B1C1C] border border-[#FBD5D5]/40 font-bold px-2 py-0.5 rounded-full">
                                Non-Veg
                              </span>
                            )
                          )}
                        </div>
                        <span className="h-px flex-grow border-t border-dashed border-gray-400" />
                        <span className=" text-lg md:text-xl font-bold text-[#F57C00]">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-[#546E7A] leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div >
    </section >
  );
}

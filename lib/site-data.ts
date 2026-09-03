export const business = {
  name: "AMSTRDM",
  fullName: "AMSTRDM Coffee House",
  tagline: "Simplicity Elevated.",
  description:
    "Specialty coffee and elevated brunch in the heart of California wine country — two locations in Paso Robles and Atascadero.",
  email: "contact@amstrdmpaso.com",
  orderOnlineUrl: "https://www.amstrdmpaso.com/shop/coffee-tea/2",
  roaster: {
    name: "Paso Robles Coffee Co.",
    url: "https://www.pasoroblescoffeeco.com",
  },
  social: {
    instagram: { handle: "@_amstrdm", url: "https://www.instagram.com/_amstrdm/" },
    facebook: { handle: "AMSTRDM Coffee House", url: "https://www.facebook.com/amstrdmpaso" },
    yelp: {
      handle: "Yelp",
      url: "https://www.yelp.com/biz/amstrdm-coffee-house-piano-lounge-paso-robles-2",
    },
  },
};

export type Location = {
  slug: "paso-robles" | "atascadero";
  name: string;
  short: string;
  flagship: boolean;
  address: { line1: string; city: string; state: string; zip: string };
  phone?: string;
  hoursCoffee: string;
  hoursKitchen?: string;
  description: string;
  mapsUrl: string;
  heroImage: string;
  gallery: string[];
};

export const locations: Location[] = [
  {
    slug: "paso-robles",
    name: "Paso Robles",
    short: "The original AMSTRDM, on 13th Street in downtown Paso Robles.",
    flagship: true,
    address: { line1: "725 13th St", city: "Paso Robles", state: "CA", zip: "93446" },
    phone: "(805) 369-2144",
    hoursCoffee: "Daily · 7am – 4pm",
    hoursKitchen: "Brunch Tue–Sun · 8am – 2pm (limited menu Monday)",
    description:
      "We welcome you to our original location on 13th Street in downtown Paso Robles — just a block off Downtown City Park, with ample free street parking. Featuring freshly brewed dark and light roast coffee, specialty drinks, teas and more. Be sure to try our breakfast burrito, waffle, or “famous breakfast sando.” Whether you're picking up a coffee or looking to post up and get some work done, we're there for you. See you soon!",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=725+13th+St+Paso+Robles+CA+93446",
    heroImage: "/subjects/paso-robles/01.jpg",
    gallery: [
      "/subjects/paso-robles/02.jpeg",
      "/subjects/paso-robles/03.jpeg",
      "/subjects/paso-robles/04.jpg",
      "/subjects/paso-robles/05.jpeg",
      "/subjects/paso-robles/06.jpeg",
      "/subjects/paso-robles/07.jpeg",
      "/subjects/paso-robles/08.jpeg",
    ],
  },
  {
    slug: "atascadero",
    name: "Atascadero",
    short: "Our newest location, next to Atascadero's historic Sunken Gardens.",
    flagship: false,
    address: { line1: "6480 Palma Avenue", city: "Atascadero", state: "CA", zip: "93422" },
    hoursCoffee: "Daily · 7am – 4pm",
    description:
      "Stop by AMSTRDM Coffee House in Atascadero, conveniently located next to Atascadero's historic Sunken Gardens. Featuring all the same coffee favorites from our Paso Robles location, plus both indoor and outdoor seating and plenty of street parking. Whether you're picking up a coffee or looking to post up and get some work done, we're there for you. See you soon!",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=6480+Palma+Avenue+Atascadero+CA+93422",
    heroImage: "/subjects/atascadero/01.jpeg",
    gallery: [
      "/subjects/atascadero/02.jpeg",
      "/subjects/atascadero/03.jpeg",
      "/subjects/atascadero/04.jpeg",
      "/subjects/atascadero/05.jpeg",
      "/subjects/atascadero/06.jpeg",
      "/subjects/atascadero/07.jpeg",
      "/subjects/atascadero/08.jpg",
    ],
  },
];

export const ratingBadges = [
  {
    platform: "Google",
    rating: "4.5",
    reviewCount: "697",
    url: "https://joe.coffee/locations/ca/paso-robles/amstrdm-coffee-house-paso-robles-3536ed7d-df1a-43db-8849-6ac2b98460ad/",
  },
  {
    platform: "Yelp",
    rating: "4.5",
    reviewCount: "274",
    url: "https://www.yelp.com/biz/amstrdm-coffee-house-paso-robles-2",
  },
  {
    platform: "TripAdvisor",
    rating: "4.8",
    reviewCount: "Top-rated",
    url: "https://www.tripadvisor.com/Restaurant_Review-g32861-d23068794-Reviews-Amstrdm_Coffee_House-Paso_Robles_San_Luis_Obispo_County_California.html",
  },
];

export type MenuItem = {
  name: string;
  price: string;
  description?: string;
  addOns?: string[];
};

export type MenuCategory = {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "favorites",
    title: "AMSTRDM Favorites",
    items: [
      {
        name: "Eggs Benedict",
        price: "18",
        description: "Black forest ham, spinach, sage hollandaise, french baguette",
      },
      {
        name: "Breakfast Tacos",
        price: "20",
        description:
          "Pork belly, yellow onion, poblano chilis, red potatoes, scrambled egg, cilantro repollo, sriracha aioli, queso fresco",
      },
      {
        name: "Biscuits & Gravy",
        price: "11 half / 17 full",
        description: "Cheddar chive biscuits, AMSTRDM gravy",
      },
      {
        name: "The Hash",
        price: "20",
        description:
          "Pork belly, yellow onion, red bell pepper, poblano chilis, queso fresco, cilantro repollo, sweet potatoes, fresno peppers, sriracha aioli",
      },
      {
        name: "Pulled Pork Polenta",
        price: "20",
        description:
          "Braised pork, fire roasted tomato sauce, yellow onion, red bell pepper, poblano chilis, poached egg, parmesan (sub mushroom available)",
      },
      {
        name: "Posole Verde",
        price: "20",
        description: "Braised pork, avocado, cilantro repollo, queso fresco, panko egg",
      },
      {
        name: "Mushroom Bowl",
        price: "20",
        description:
          "Crimini, shiitake, oyster mushrooms, kimchi, spring onion, pork belly, cilantro repollo, chashu sauce, brown rice, sunny egg, feta",
      },
      {
        name: "Mushroom Toast",
        price: "18",
        description:
          "Crimini, shiitake, oyster mushrooms, applewood bacon, smashed avocado, red onion, crème fraîche, queso fresco, poached egg",
      },
    ],
  },
  {
    id: "breakfast",
    title: "Breakfast",
    items: [
      {
        name: "Breakfast Sando",
        price: "17",
        description: "Turkey, applewood bacon, avocado, greens, tomato, cheddar, fried egg, garlic aioli, brioche",
      },
      {
        name: "AMSTRDM Burrito",
        price: "16",
        description: "Scrambled eggs, AMSTRDM tots, avocado, cheddar",
        addOns: ["Add Bacon +2", "Add Chicken sausage +2", "Add Braised pork +3", "Add Soy chorizo +3"],
      },
      {
        name: "Breakfast Dip",
        price: "20",
        description: "Pork belly, two fried eggs, chashu au jus, sage hollandaise, gruyère, french baguette",
      },
      {
        name: "Paso Breakfast",
        price: "18",
        description: "Two eggs any style, bacon or chicken sausage, sourdough",
        addOns: ["Add Avo +3"],
      },
    ],
  },
  {
    id: "savory",
    title: "Savory",
    items: [
      {
        name: "Pork Chilaquiles",
        price: "20",
        description:
          "Black beans, braised pork, avocado, queso fresco, cilantro repollo, verde sauce, crème fraîche, sunny egg — vegan option available",
      },
      {
        name: "Shakshuka",
        price: "17",
        description:
          "Yellow onion, poblano chilis, red bell peppers, roasted tomatoes, avocado, queso fresco, sunny egg, toasted sourdough",
      },
      {
        name: "The Irishman",
        price: "20",
        description:
          "Corned beef, braised cabbage, sour cream mustard sauce, red potatoes, mustard greens, sunny egg",
      },
    ],
  },
  {
    id: "sweet",
    title: "Something Sweet",
    items: [
      { name: "Buttermilk Pancakes", price: "16", description: "Lemon curd, blueberry coulis" },
      {
        name: "Caramel Apple French Toast",
        price: "18",
        description: "Sweet cream cheese, vanilla whip, crushed pecans",
      },
      {
        name: "Wild Berry Oatmeal",
        price: "12",
        description: "Date butter, brown sugar, raspberry, blueberry, blackberry, strawberry, chia seeds",
      },
    ],
  },
  {
    id: "garden",
    title: "From the Garden",
    items: [
      {
        name: "Quinoa Tostada",
        price: "16",
        description:
          "Red onion, black beans, cilantro repollo, avocado, cucumber, radishes, feta, gremolata, cherry tomatoes",
        addOns: ["Add Chicken +6"],
      },
      {
        name: "Thai Chicken Salad",
        price: "20",
        description:
          "Mixed greens, cilantro repollo, roasted cashews, rice noodles, cucumber, radishes, spicy thai vinaigrette, grilled chicken",
      },
      {
        name: "Kate + Corey",
        price: "20",
        description:
          "Mixed greens, cherry tomatoes, cheddar, applewood bacon, toasted pepitas, avocado, grilled chicken, panko egg, ranch dressing",
      },
    ],
  },
  {
    id: "lunch",
    title: "Lunch",
    items: [
      {
        name: "Pastrami Reuben",
        price: "20",
        description: "House sauerkraut, russian dressing, dijon, gruyère, AMSTRDM pickles, sourdough",
      },
      {
        name: "AMSTRDM Burger",
        price: "17",
        description: "Angus patty, greens, tomato, red onion, AMSTRDM pickles",
        addOns: ["Cheddar +1", "Double patty +6"],
      },
      {
        name: "Banh Mi",
        price: "20",
        description: "Pork belly, pickled carrots, cilantro repollo, pickled onions, sriracha aioli, chashu sauce, baguette",
      },
      {
        name: "Cali Club",
        price: "20",
        description:
          "Turkey, ham, applewood bacon, avocado, greens, tomato, arugula, red onion, pepperjack, garlic aioli, ciabatta",
      },
    ],
  },
  {
    id: "sides",
    title: "Sides",
    items: [
      { name: "Eggs (1 or 2)", price: "4 / 8" },
      { name: "Avocado", price: "3" },
      { name: "Chicken Sausage", price: "6" },
      { name: "Bacon", price: "4" },
      { name: "Linguica", price: "6" },
      { name: "Avocado Toast", price: "8" },
      { name: "Buttered Toast", price: "3" },
      { name: "Fruit Bowl", price: "10" },
      { name: "Side Salad", price: "8" },
      { name: "Shoestring Fries", price: "5" },
      { name: "AMSTRDM Tots", price: "8" },
    ],
  },
  {
    id: "coffee",
    title: "Coffee",
    items: [
      { name: "House Drip", price: "3.50 – 4" },
      { name: "Espresso", price: "4" },
      { name: "Americano", price: "4.50" },
      { name: "Cortado", price: "4.50" },
      { name: "Cappuccino", price: "5" },
      { name: "Latte", price: "5.50 – 6" },
      { name: "Mocha Oaxaca", price: "6 – 6.50" },
      { name: "Cold Brew", price: "5.25 – 5.75" },
      { name: "Espresso Spritzer", price: "5" },
    ],
  },
  {
    id: "tea",
    title: "Tea",
    note: "House Syrups +0.50 (Elderflower Vanilla / Autumn Spice) · Himalayan Salted Caramel +0.75 · Milk Alternatives +0.75 (Soy / Almond / Coconut / Oat +1)",
    items: [
      { name: "Tea", price: "4.50 – 5" },
      { name: "London Fog", price: "5.50 – 6" },
      { name: "Chai Tea Latte", price: "6 – 6.50" },
      { name: "Matcha Latte", price: "6 – 6.50" },
      { name: "Hot Chocolate", price: "4.50 – 5" },
    ],
  },
  {
    id: "kids",
    title: "Kids Menu",
    items: [
      { name: "Pancake (1) + Egg (1) + Chicken Sausage or Bacon", price: "12" },
      { name: "French Toast (1) + Egg (1) + Chicken Sausage or Bacon", price: "12" },
      { name: "Kids Burger", price: "10" },
      { name: "Grilled Cheese", price: "10" },
      { name: "Quesadilla", price: "10" },
    ],
  },
];

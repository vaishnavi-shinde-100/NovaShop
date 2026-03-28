const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

const categories = [
  "Rings",
  "Necklaces",
  "Earrings",
  "Bracelets",
  "Jewellery Sets",
  "Pendant",
  "Anklets",
  "Bangles",
];

const names = [
  "Diamond",
  "Gold",
  "Silver",
  "Royal",
  "Elegant",
  "Luxury",
  "Vintage",
  "Pearl",
  "Sparkle",
  "Classic",
];

const generateProducts = () => {
  const products = [];

  categories.forEach((category) => {
    for (let i = 1; i <= 20; i++) {
      const name = names[Math.floor(Math.random() * names.length)];

      const product = {
        name: `${name} ${category}`,
        price: Math.floor(Math.random() * 3000) + 100,
        category: category,
        image: `https://loremflickr.com/400/400/${category},jewellery`,
        description: `Beautiful ${category} for special occasions`,
      };

      products.push(product);
    }
  });

  return products;
};

const seedData = async () => {
  try {
    // await Product.deleteMany();

    const products = generateProducts();

    await Product.insertMany(products);

    console.log("100 jewellery products generated successfully");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

seedData();

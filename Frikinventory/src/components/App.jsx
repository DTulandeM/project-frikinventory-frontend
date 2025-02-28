import { useState } from "react";
import Header from "./Header";
import Cards from "./Cards";
import "../index.css";
import SideMenu from "./SideMenu";
import Products from "./Products";
import Footer from "./footer";
const products = [
  {
    number: "",
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    productId: 1,
    name: "Laptop",
    price: 999.99,
    quantity: 6,
    status: true,
    action: "",
  },
  {
    number: "",
    image: "",
    productId: 2,
    name: "Laptop",
    price: 999.99,
    quantity: 5,
    status: true,
    action: "",
  },
  {
    number: "",
    image: "",
    productId: 3,
    name: "Laptop",
    price: 999.99,
    quantity: 0,
    status: true,
    action: "",
  },
];

function App() {
  const [cards, setCards] = useState([
    {
      title: "Total Products",
      total: 4892,
      percentage: -6.53,
      initialTimeFrame: "last week",
    },
    {
      title: "Total Products",
      total: 4892,
      percentage: 6.53,
      initialTimeFrame: "last week",
    },
    {
      title: "Total Products",
      total: 4892,
      percentage: -5.53,
      initialTimeFrame: "last week",
    },
    {
      title: "Total Products",
      total: 4892,
      percentage: 7.53,
      initialTimeFrame: "last week",
    },
  ]);

  return (
    <>
      <div className="page">
        <Header />
        <SideMenu />
        <section className="card__statistic">
          {cards.map((card) => (
            <Cards cards={card} />
          ))}
        </section>

        <Products products={products} />
        <Footer />
      </div>
    </>
  );
}

export default App;

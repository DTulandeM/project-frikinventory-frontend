import { useContext } from "react";
import Cards from "./Cards";
import Products from "./Products";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main>
      <section className="card__statistic">
        {props.cards.map((card, index) => (
          <Cards
            key={index}
            card={card}
            products={props.products}
            updateStockCards={props.updateStockCards}
          />
        ))}
      </section>

      <Products
        products={props.products}
        editProduct={props.editProduct}
        addProduct={props.addProduct}
        onDeleteProduct={props.deleteProduct}
        isLoading={props.isLoading}
      />
    </main>
  );
}

export default Main;

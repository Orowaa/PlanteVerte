import { useState, useEffect } from "react";
import "../styles/Cart.css";

function Cart({ cart, updateCart }) {
  const [isOpen, setIsOpen] = useState(true);
  const total = cart.reduce(
    (acc, plantType) => acc + plantType.amount * plantType.price,
    0
  );

  useEffect(() => {
    document.title = `Plantes Vertes: ${total}€ d'achats`;
  }, [total]);

  return isOpen ? (
    <div className="lmj-cart">
      <button
        className="lmj-cart-toggle-button"
        onClick={() => setIsOpen(false)}
      >
        Fermer
      </button>
      {cart.length > 0 ? (
        <div>
          <h2>Panier</h2>
          <ul>
            {cart.map(({ name, price, amount }, index) => (
              <div key={`${name}-${index}`}>
                {name}
                <button
                  onClick={() => {
                    updateCart(
                      cart
                        .map((item, i) => {
                          if (i === index) {
                            return { ...item, amount: item.amount + 1 };
                          }
                          return item;
                        })
                        .filter((item) => item.amount > 0)
                    );
                  }}
                > 
                   ➕  

                </button>
                {price}€ x {amount}
                <button
                  onClick={() => {
                    updateCart(
                      cart
                        .map((item, i) => {
                          if (i === index) {
                            return { ...item, amount: item.amount - 1 }; // Diminuer la quantité en utilisant `amount`
                          }
                          return item;
                        })
                        .filter((item) => item.amount > 0)
                    ); // Retirer l'élément si la quantité (`amount`) est 0
                  }}
                > 
                    ➖ 
                </button>
              </div>
            ))}
          </ul>
          <h3>Total :{total}€</h3>
          <button onClick={() => updateCart([])}>Vider le panier</button>
        </div>
      ) : (
        <div>Votre panier est vide</div>
      )}
    </div>
  ) : (
    <div className="lmj-cart-closed">
      <button
        className="lmj-cart-toggle-button"
        onClick={() => setIsOpen(true)}
      >
        Ouvrir le Panier
      </button>
    </div>
  );
}

export default Cart;

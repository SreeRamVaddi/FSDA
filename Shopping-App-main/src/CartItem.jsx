import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping, setQuantity, quantity }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () =>
    cart.reduce((acc, curr) => acc + calculateTotalCost(curr), 0);

  // Calculate total cost for a specific item based on quantity
  const calculateTotalCost = (item) =>
    parseFloat(item.cost.substring(1)) * item.quantity;

  const handleContinueShopping = (e) => onContinueShopping(e);

  const handleIncrement = (item) => {
    dispatch(addItem(item));
    setQuantity(quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      handleRemove(item);
    } else {
      dispatch(updateQuantity({ ...item, quantity: item.quantity - 1 }));
      setQuantity(quantity - 1);
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    setQuantity(0);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-total-amount">Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>
      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  Total: ${calculateTotalCost(item).toFixed(2)}
                </div>
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-cart-message">Your cart is empty. Add some items!</p>
      )}
      <div className="cart-actions">
        <button
          className="continue-shopping-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
        <button
          className="checkout-button"
          onClick={() => alert("Coming soon!")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
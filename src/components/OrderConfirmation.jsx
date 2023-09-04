import React from "react";
import styles from "./styles/OrderConfirmation.module.css";
import OrderConfirmationItem from "./OrderConfirmationItem";

function OrderConfirmation({ order }) {
  const orderItems = order.items;

  if (!orderItems || orderItems.length === 0) {
    return <div>example</div>;
  }

  const mappedItems = orderItems.map((item, index) => (
    <div key={index}>
      <OrderConfirmationItem item={item.item} />
    </div>
  ))

  return (
    <div className={styles.orderConfirmationContent}>
      <h2>Thank you for your order!</h2>
      <h4>Order Id: {order.id}</h4>
      <h4>Name: {order.name}</h4>
      <h4>Address: {order.address}</h4>
      <h4>Your Order:</h4>
      <div>{mappedItems}</div>
    </div>
  );
}

export default OrderConfirmation;
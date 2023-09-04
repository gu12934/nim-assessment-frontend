import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/ConfirmationPage.module.css";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
  const { id } = useParams(); // get the id parameter from url
  const [order, setOrder] = useState({});
  // const getOrder = () => (
  //   fetch(`/api/orders/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setOrder(data))
  // )

  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/orders/${id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className={styles["confirmation-page"]}>
      {order ? <OrderConfirmation order={order} /> : <p>Loading...</p>}
    </div>
  );
}

export default ConfirmationPage;

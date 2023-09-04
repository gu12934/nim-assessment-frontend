import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
 // validation message
  const [validationMessage, setValidationMessage] = useState(false);
// form checker for notes
  const formChecker = (nameCheck, phoneCheck, addressCheck) => {
    if (nameCheck === "" || phoneCheck === "" || addressCheck === "") {
      return true;
    }
    return false;
  };

  const phoneCheck = (phoneNumber) => {
    const pattern = /^[\d()\-\s]+$/;
    if (!pattern.test(phoneNumber)) {
      return true;
    }
    return false;
  };
// place order with fetch
  const placeOrder = async () => {
    const response = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone,
        address,
        items: order
      })
    });
    // retrieving the information
    const data = await response.json();

    if (response.status === 200) {
      navigate('/order-confirmation/${data.id}');
    }
  };
// code that was previously in file
  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                type="phone"
                id="phone"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="phone"
                id="address"
              />
            </label>
          </div>
        </form>

        {validationMessage && (
          <p className={styles.validationMessage}>
            Please ensure all fields are entered properly!
          </p>
        )}

        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              if (formChecker(name, phone, address) || phoneCheck(phone)) {
                setValidationMessage(true);
              } else {
                placeOrder();
              }
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;

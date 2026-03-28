import React, { useState } from "react";
import "./Payment.css";

function Payment({ payment, setPayment, cardData, setCardData }) {
  // const [cardNumber, setCardNumber] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  return (
    <div className="payment-container">
      {/* Payment Method */}
      <div className="payment-method">
        <button
          className={payment === "COD" ? "active" : ""}
          onClick={() => setPayment("COD")}
        >
          Cash on Delivery
        </button>

        <button
          className={payment === "Online" ? "active" : ""}
          onClick={() => setPayment("Online")}
        >
          Card Payment
        </button>
      </div>

      {/* Card Section */}
      {payment === "Online" && (
        <div className="card-section">
          {/* 💳 CARD UI */}
          <div className={`card ${isFlipped ? "flipped" : ""}`}>
            <div className="front">
              <h3>{cardData.cardNumber || "XXXX XXXX XXXX XXXX"}</h3>
              <p>{cardData.cardName || "YOUR NAME"}</p>
              <span>{cardData.expiry || "MM/YY"}</span>
            </div>

            <div className="back">
              <div className="strip"></div>
              <p>CVV: {cardData.cvv || "***"}</p>
            </div>
          </div>

          {/* INPUTS */}
          <div className="inputs">
            <input
              type="text"
              placeholder="Card Number"
              maxLength="19"
              value={cardData.cardNumber}
              onChange={(e) =>
                setCardData({
                  ...cardData,
                  cardNumber: formatCardNumber(e.target.value),
                })
              }
            />

            <input
              type="text"
              placeholder="Card Holder Name"
              value={cardData.cardName}
              onChange={(e) =>
                setCardData({
                  ...cardData,
                  cardName: e.target.value,
                })
              }
            />

            <div className="row">
              <input
                type="text"
                placeholder="MM/YY"
                value={cardData.expiry}
                onChange={(e) =>
                  setCardData({
                    ...cardData,
                    expiry: e.target.value,
                  })
                }
              />

              <input
                type="password"
                placeholder="CVV"
                maxLength="3"
                value={cardData.cvv}
                onFocus={() => setIsFlipped(true)}
                onBlur={() => setIsFlipped(false)}
                onChange={(e) =>
                  setCardData({
                    ...cardData,
                    cvv: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;

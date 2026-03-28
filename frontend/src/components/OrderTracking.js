import React from "react";
import "./OrderTracking.css";

function OrderTracking({ status }) {
  const steps = ["Placed", "Shipped", "Out for Delivery", "Delivered"];

  return (
    <div className="order-tracking">
      {steps.map((step, index) => {
        const stepIndex = steps.indexOf(status);
        const isCompleted = index <= stepIndex;
        return (
          <div key={step} className="tracking-step">
            <div className={`circle ${isCompleted ? "completed" : ""}`}>
              {index + 1}
            </div>
            <div className="label">{step}</div>
            {index < steps.length - 1 && (
              <div className={`bar ${isCompleted ? "completed" : ""}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default OrderTracking;

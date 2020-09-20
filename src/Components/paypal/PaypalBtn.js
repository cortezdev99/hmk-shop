import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";

export default (props) => {
  const { amount, onSuccess, currency, options } = props;

  return (
      <PayPalButton
        amount={amount}
        currency={currency}
        onSuccess={(details, data) => onSuccess(details, data)}
        options={options}
        style={{
          height: 40
        }}
    />
  );
}

// export default PaypallBtn;
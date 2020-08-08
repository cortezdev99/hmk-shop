import React, { useContext } from 'react'
import CartContext from '../../Contexts/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default () => {
  const {
    isCartOpen,
    products
  } = useContext(CartContext)

  if (isCartOpen !== true) {
    return <></>
  }

  return (
    <div style={{ position: "fixed", backgroundColor: "rgba(29, 29, 29, 0.7", zIndex: 100000, height: "100%", width: "100%", display: "flex", justifyContent: "flex-end" }}>
      <div style={{ height: "calc(100vh - 120px)", background: "#fff", width: "40%", padding: "40px", maxWidth: "570px" }}>
        <div>
          {
            products.map((product, productIdx) => {
              return (
                <div key={productIdx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "40px", rowGap: "40px" }}>
                  <div>
                    <img
                      src={Object.values(product[3])[0]}
                    />
                  </div>

                  <div>
                    <div style={{ height: "calc(100% / 4)" }}>
                      {product[0].product.title}
                    </div>

                    <div style={{ height: "calc(100% / 4)" }}>
                      $80
                    </div>

                    <div style={{ display: "flex", height: "calc(100% / 4)" }}>
                      <div style={{ width: "100%" }}>
                        {Object.values(product[2])[0]} / {Object.values(product[1])[0]}
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "calc(100% / 4)"}}>
                      <div style={{ display: "flex", backgroundColor: "#f6f6f6", border: "1px solid #CCC", borderRadius: "5px" }}>
                        <button style={{ width: "calc(100% / 3)", border: "1px solid transparent", backgroundColor: "transparent", cursor: "pointer", color: "#7f7f7f" }}>
                        <FontAwesomeIcon icon="minus" />
                        </button>

                        <div style={{ width: "calc(100% / 3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          1
                        </div>

                        <button style={{ width: "calc(100% / 3)", border: "1px solid transparent", backgroundColor: "transparent", cursor: "pointer", color: "#7f7f7f" }}>
                        <FontAwesomeIcon icon="plus" />
                        </button>
                      </div>
                        
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <button style={{ border: "1px solid transparent", backgroundColor: "transparent", cursor: "pointer", textDecorationLine: "underline" }}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
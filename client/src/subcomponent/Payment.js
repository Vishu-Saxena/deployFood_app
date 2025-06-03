import React from 'react'
import DropIn from "braintree-web-drop-in-react";
const Payment = ({clientToken , cart ,setInstance ,handlePayment ,  }) => {
  return (
    <div>
      <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    // disabled={loading || !instance || !authUser?.userDetailes?.address}
                  >
                    Make Payment
                    {/* {loading ? "Processing ...." : "Make Payment"} */}
                  </button>
                </>
              )}
            </div>
    </div>
  )
}

export default Payment

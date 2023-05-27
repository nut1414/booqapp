import { CartBookTable } from "@/components/book/CartBookTable";
import { Template } from "@/components/common/Template";
import { Button } from "@/components/input/Button";
import { useEffect, useState } from "react";
import fetch from "@/utils/fetch";
import { PublisherGroupRow } from "@/components/book/CartBookTable/PublisherGroupRow";
import { BookItemRow } from "@/components/book/CartBookTable/BookItemRow";
import { AddressU } from "@/components/addressUser/addressU";
import Swal from "sweetalert2";

import { useRouter } from "next/router";
import { ShippingFeeRow } from "@/components/book/CartBookTable/ShippingFeeRow";

export default function OrderCart() {
  const [ordergroup, setOrdergroup] = useState([]);
  const [selectitems, setselectitems] = useState([]);
  const [currentStep, setCurrentStep] =
    useState("itemselect"); /* itemselect, address, summarize */
  const [addresses, setAddresses] = useState([]);
  const [shipAddressID, setShipAddressID] = useState(null);
  const [orderSummarize, setOrderSummarize] = useState({
    allOrderPrice: 0,
    allOrderShipping: 0,
    order: []
  });
  const allSummarizeQuantity = orderSummarize.order.reduce((acc, order) => { 
    return acc + order.items.reduce((acc, item) => {
      return acc + item.Quantity
    },0)
  },0)


  const router = useRouter();

  const getAddresses = async () => {
    try {
      const res = await fetch("/api/profile/address", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setShipAddressID(data.address[0].ShippingAddressID);
        setAddresses(data.address);
      } else {
        throw Error(data.message);
      }
    } catch (e) {
      console.log(e);
      Swal.fire({ title: "Error", text: e.message, icon: "error" });
    }
  };

  const getCartItem = async () => {
    try {
      const res = await fetch("/api/order/cart");
      const data = await res.json();
      if (res.ok) {
        const itemsexistinorderpublishergroup = [];
        data.cart.forEach((publisherGroup) => {
          const items = publisherGroup.items.forEach((item) => {
            if (selectitems.includes(item.ItemID)) {
              itemsexistinorderpublishergroup.push(item.ItemID);
            }
          });
        });

        setOrdergroup(data.cart);
      }
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const updateCartItem = async (cartItemID, amount) => {
    try {
      const res = await fetch("/api/order/cart", {
        method: "PUT",
        body: JSON.stringify({
          ItemID: cartItemID,
          Quantity: amount,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        getCartItem();
      }
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  const deleteCartItem = async (cartItemID) => {
    try {
      const res = await fetch("/api/order/cart?ItemID=" + cartItemID, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        getCartItem();
      }
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getSummarizeOrder = async () => {
    try {
      const res = await fetch("/api/order/summarize", {
        method: "POST",
        body: JSON.stringify({
          ShippingAddressID: shipAddressID,
          selectedItems: selectitems,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        setOrderSummarize(data);
        // router.push("/order/checkout");
      }
      console.log(data);
    } catch (e) {
      Swal.fire({ title: "Error", text: e.message, icon: "error" });
      console.log(e);
    }
  };

  const handleCreateOrder = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to create order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fetch("/api/order/create", {
            method: "POST",
            body: JSON.stringify({
              shippingAddressID: shipAddressID,
              selectedItems: selectitems,
            }),
          });
          const data = await res.json();
          if (res.ok) {
            Swal.fire({
              title: "Success",
              text: "Order created",
              icon: "success",
            });
            router.push("/user/order");
          } else {
            Swal.fire({ title: "Error", text: data.message, icon: "error" })
          }
        }
      }
      );

    }catch (e) {
      Swal.fire({ title: "Error", text: e.message, icon: "error" });
      console.log(e);
    }
  }

  useEffect(() => {
    console.log("Selected Items", selectitems);
  }, [selectitems]);

  useEffect(() => {
    if (currentStep == "summarize") {
      getSummarizeOrder();
    }
  }, [currentStep]);

  useEffect(() => {
    getCartItem();
    getAddresses();
  }, []);

  return (
    <Template noBack={true}>
      <div className="text-2xl font-bold p-8 pl-16">
        <h1>
          {currentStep == "itemselect"
            ? "Your Shopping Cart"
            : currentStep == "shipping"
            ? "Choose Your Address"
            : currentStep == "summarize"
            ? "Order confirmation"
            : ""}
        </h1>
      </div>

      {currentStep == "itemselect" ? (
        <div className=" min-w-[75vw] mx-auto">
          <table className={"table-auto  w-full "}>
            <thead>
              <tr>
                <th className="px-4 py-2 w-1/6">Book Cover</th>
                <th className="px-4 py-2 w-2/6 text-left">Title</th>
                <th className="px-4 py-2 w-1/6">Price</th>
                <th className="px-4 py-2 w-1/6">Amount</th>
                <th className="px-4 py-2 w-1/6">Subtotal</th>
              </tr>
            </thead>
            <tbody className="border-b">
              {ordergroup.map((ordergroup, index) => {
                return (
                  <>
                    <PublisherGroupRow
                      key={index + "publishergroup"}
                      publisher={ordergroup.publisher}
                    />
                    {ordergroup.items.map((item, index) => {
                      return (
                        <BookItemRow
                          key={index + item.ItemID + "itembook"}
                          item={item}
                          selectitems={selectitems}
                          setselectitems={setselectitems}
                          updateaction={updateCartItem}
                          deleteaction={deleteCartItem}
                        />
                      );
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
          <div className="p-8 flex justify-end">
            <Button text={"Back"} onClick={() => router.back()} />

            {selectitems.length > 0 && (
              <Button
                text={"Next"}
                onClick={() => setCurrentStep("shipping")}
              />
            )}
          </div>
        </div>
      ) : currentStep == "shipping" ? (
        <div className=" min-w-[75vw] mx-auto">
          <div>
            {addresses.map((address) => (
              <label
                key={address.ShippingAddressID + "shipping"}
                className="flex grow "
              >
                <input
                  type="checkbox"
                  className="mt-2 self-start"
                  checked={shipAddressID == address.ShippingAddressID}
                  onChange={() => setShipAddressID(address.ShippingAddressID)}
                />
                <AddressU
                  className="grow"
                  name={address.Name}
                  addressDetail={
                    address.Address +
                    " " +
                    address.ZipCode +
                    ", " +
                    address.PhoneNumber
                  }
                  onclick={() => {}}
                  noDelete={true}
                />
              </label>
            ))}
          </div>
          <div className="p-8 flex justify-end">
            <Button
              text={"Back"}
              onClick={() => setCurrentStep("itemselect")}
            />
            {selectitems.length > 0 && (
              <Button
                text={"Checkout"}
                onClick={() => setCurrentStep("summarize")}
              />
            )}
          </div>
        </div>
      ) : currentStep == "summarize" ? (
        <div className=" min-w-[75vw] mx-auto">
          <table className={"table-auto  w-full "}>
            <thead>
              <tr>
                <th className="px-4 py-2 w-1/6">Book Cover</th>
                <th className="px-4 py-2 w-2/6 text-left">Title</th>
                <th className="px-4 py-2 w-1/6">Price</th>
                <th className="px-4 py-2 w-1/6">Amount</th>
                <th className="px-4 py-2 w-1/6">Subtotal</th>
              </tr>
            </thead>
            <tbody className="border-b">
              {orderSummarize.order.map((ordergroup, index) => {
                return (
                  <>
                    <PublisherGroupRow
                      key={index + "publishergroup"}
                      publisher={ordergroup.publisher}
                    />
                    {ordergroup.items.map((item, index) => {
                      return (
                        <BookItemRow
                          isSummarize={true}
                          key={index + item.ItemID + "itembook"}
                          item={item}
                          selectitems={selectitems}
                          setselectitems={setselectitems}
                          updateaction={updateCartItem}
                          deleteaction={deleteCartItem}
                        />
                      );
                    })}
                    <ShippingFeeRow
                      key={index + "shippingfee"}
                      shippingFee={ordergroup.totalShipping}
                    />
                  </>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="font-bold">
                <td className="border-b p-4" colspan="1">
                  Total:
                </td>
                <td className="border-b p-4" colspan="2">
                  {allSummarizeQuantity} Unit
                </td>
                <td className="border-b flex flex-col p-4">
                  <div>All Order</div>
                  <div>Delivery Fee</div>
                  <div>Total</div>
                </td>
                <td className="border-b p-4 text-right">
                  <div>{orderSummarize.allOrderPrice}</div>
                  <div>{orderSummarize.allOrderShipping}</div>
                  <div>
                    {orderSummarize.allOrderPrice +
                      orderSummarize.allOrderShipping}
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="p-8 flex justify-end">
            <Button text={"Back"} onClick={() => setCurrentStep("shipping")} />
            <Button text={"Order"} onClick={handleCreateOrder}/>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Template>
  );
}

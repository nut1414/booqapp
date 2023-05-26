import { useEffect, useState } from "react";
import { AddressU } from "../addressUser/addressU";
import { Button } from "../input/Button";
import fetch from "@/utils/fetch";
import { TextBox } from "../input/TextBox";
import { PostalPicker } from "../input/PostalPicker";
import Swal from "sweetalert2";

export default function AddressPage({}) {
  const [addingAddress, setAddingAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const deleteAddress = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Delete logic goes here
        try {
          const res = await fetch(
            `/api/profile/address?ShippingAddressID=${id}`,
            {
              method: "DELETE",
            }
          );
          const data = await res.json();
          if (res.ok) {
            console.log(data);
            await getAddresses();
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
          } else {
            throw Error(data.message)
          }
        } catch (err) {
          Swal.fire("Error", err.message, "error");
        }
        
        
      }
    });


    
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    data["Name"] = data["FirstName"] + " " + data["LastName"];
    console.log(data);
    try {
      const res = await fetch("/api/profile/address", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const datares = await res.json();
      if (res.ok) {
        console.log(datares);
        getAddresses();
        Swal.fire({
          title: "Success",
          text: datares.message,
          icon: "success",
        }).then(() => {
          setAddingAddress(false);
        });
      } else {
        throw Error(datares.message)
      }
    } catch (err) {
      Swal.fire({ title: "Error", text: err.message, icon: "error" });
      console.log(err);
    }
    
  }

  const getAddresses = async () => {
    try {
      const res = await fetch("/api/profile/address", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setAddresses(data.address);
      } else {
        throw Error(data.message)
      }
    } catch (e) {
      console.log(e);
      Swal.fire({ title: "Error", text: e.message, icon: "error" });
    }
    
  };

  useEffect(() => {
    getAddresses();
  },[]);

  return (
    <>
      {addingAddress ? (
        <div>
          <div className="font-bold text-2xl mb-5">My Address</div>
          <div className="border-b-2 border-black border-opacity-50 mb-10"></div>
          <div>
            <form method="POST" onSubmit={handleAddSubmit}>
              <TextBox label={"First Name"} name={"FirstName"} type={"text"} />
              <TextBox label={"Last Name"} name={"LastName"} type={"text"} />
              <TextBox label={"Phone"} name={"PhoneNumber"} type={"text"} />
              <PostalPicker />
              <TextBox
                label={"Address Detail"}
                name={"Address"}
                type={"text"}
              />
              <div className="float-right">
                <Button type="submit" text={"Cancel"} onClick={(e) => { e.preventDefault();  setAddingAddress(false)}} onSubmit={(e) => { e.preventDefault(); }} />
                <Button type="submit" text={"Add"} />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <div className="font-bold text-2xl mb-5">My Address</div>
          <div className="border-b-2 border-black border-opacity-50 mb-10"></div>
          <div>
            {addresses.map((address) => (
              <AddressU
                key={address.ShippingAddressID}
                name={address.Name}
                addressDetail={
                  address.Address +
                  " " +
                  address.ZipCode +
                  ", " +
                  address.PhoneNumber
                }
                onclick={() => deleteAddress(address.ShippingAddressID)}
              />
            ))}
          </div>
          <div>
            <Button
              className={"float-right"}
              text={"+Add"}
              onClick={() => setAddingAddress(true)}
            ></Button>
          </div>
        </div>
      )}
    </>
  );
}

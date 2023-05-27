import { useEffect, useState } from "react";
import { AddressU } from "../addressUser/addressU";
import { Button } from "../input/Button";
import fetch from "@/utils/fetch";
import { TextBox } from "../input/TextBox";
import { PostalPicker } from "../input/PostalPicker";
import Swal from "sweetalert2";
import { defaultBank } from "@/config/default";
import { useRouter } from "next/router";
import { BankU } from "../bankPublisher/BankU";
import { SelectBox } from "../input/SelectBox";

export default function BankPage({ }) {
  const [addingBank, setAddingBank] = useState(false);
  const [banks, setBanks] = useState([]);
  const [mainBankID, setMainBankID] = useState(null);
  const [defaultBankData, setDefaultBankData] = useState(defaultBank);



  const router = useRouter();
  const deleteBank = async (id) => {
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
               `/api/profile/publisher/bank?PBankID=${id}`,
            {
              method: "DELETE",
            }
          );
          const data = await res.json();
          if (res.ok) {
            console.log(data);
            await getBanks();
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
          } else {
            throw Error(data.message);
          }
        } catch (err) {
          Swal.fire("Error", err.message, "error");
        }
      }
    });
  };
  const mainBankChange = async (id) => {
    try {
      const res = await fetch(
        `/api/profile/publisher/bank?PBankID=${id}`,
        {
          method: "PUT",
        }
      );
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        await getBanks();
        Swal.fire("Success", data.message, "success")
      } else {
        throw Error(data.message);
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    try {
      const res = await fetch(
          "/api/profile/publisher/bank" ,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const datares = await res.json();
      if (res.ok) {
        console.log(datares);
        getBanks();
        Swal.fire({
          title: "Success",
          text: datares.message,
          icon: "success",
        }).then(() => {
          setAddingBank(false);
        });
      } else {
        throw Error(datares.message);
      }
    } catch (err) {
      Swal.fire({ title: "Error", text: err.message, icon: "error" });
      console.log(err);
    }
  };



  const fetchDefaultBank = async () => {
    const res = await fetch("/api/fetch/bank");
    try {
      if (!res.ok) {
        setDefaultBankData(defaultBank);
      }
      const resdata = await res.json();
      if (res.ok) {
        setDefaultBankData(resdata.bank);
      }
    } catch (err) {
      console.log(err);
    }
  };




    

  const getBanks = async () => {
    try {
      const res = await fetch("/api/profile/publisher/bank",
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (res.ok) {
        console.log(data)
        setMainBankID(data.Mainbank)
        setBanks(data.publisherbank);
      } else {
        throw Error(data.message);
      }
    } catch (e) {
      console.log(e);
      Swal.fire({ title: "Error", text: e.message, icon: "error" });
    }
  };

  useEffect(() => {
    fetchDefaultBank();
    getBanks();
  }, []);

  return (
    <>
      {addingBank ? (
        <div>
          <div className="font-bold text-2xl mb-5">My Bank Account</div>
          <div className="border-b-2 border-black border-opacity-50 mb-10"></div>
          <div>
            <form method="POST" onSubmit={handleAddSubmit}>
              <TextBox label={"Bank Name"} name={"BankName"} type={"text"} />
              <TextBox
                label={"Bank Number"}
                name={"AccountNumber"}
                type={"text"}
              />
              <SelectBox name="BankID" label="Bank">
                {
                  defaultBankData.map((bank) => (
                    <option key={bank.BankID+"bank"} value={bank.BankID}>
                      {bank.BankName}
                    </option>
                  ))
                }
              </SelectBox>
              <TextBox
                label={"Confirm Password"}
                name={"Password"}
                type={"password"}
              />
              
              <div className="float-right">
                <Button
                  type="secondary"
                  text={"Cancel"}
                  onClick={(e) => {
                    e.preventDefault();
                    setAddingBank(false);
                  }}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                />
                <Button type="submit" text={"Add"} />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <div className="font-bold text-2xl mb-5">My Bank Account</div>
          <div className="border-b-2 border-black border-opacity-50 mb-10"></div>
          <div>
            {banks.map((bank) => (
              <BankU
                key={bank.BankID}
                bank={bank}
                mainBankID={mainBankID}
                name={bank.BankName}
                isMain={bank.PBankID == mainBankID}
                mainBankChange={() => mainBankChange(bank.PBankID)}
                bankType={bank.bank.BankName}
                bankNumber={bank.AccountNumber}
                onclick={() => deleteBank(bank.PBankID)}
              />
            ))}
          </div>
          <div className={"float-right"}>
            <Button
              type={"secondary"}
              onClick={() => router.back()}
              text={"Back"}
            ></Button>
            <Button text={"+Add"} onClick={() => setAddingBank(true)}></Button>
          </div>
        </div>
      )}
    </>
  );
}

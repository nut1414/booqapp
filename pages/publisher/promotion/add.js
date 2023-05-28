import { ActionTemplate } from "@/components/common/ActionTemplate";
import { Template } from "@/components/common/Template";
import promotion from "@/public/promo.svg";
import Image from "next/image";
import { Button } from "@/components/input/Button";
import { TextBox } from "@/components/input/TextBox";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TagSelectBox from "@/components/input/TagSelectBox";
import fetch from "@/utils/fetch";
import Swal from "sweetalert2";

export default function PublisherPromotionAdd() {
  const { user, status } = useAuth();
  const [selectBook, setSelectBook] = useState([]);
  const [book, setBook] = useState([]);
  const router = useRouter();

  const getPublisherBook = async () => {
    console.log(user);
    const res = await fetch("/api/booksearch?PublisherID=" + user?.id, {
      method: "GET",
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setBook(data.book);
    }
  };

  const handleCreatePromotion = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      BookID: selectBook,
    };
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(data)
    if (!data.StartDate || !data.EndDate) {
      Swal.fire({
        title: "Error",
        text: "Please select date",
        icon: "error",
        confirmButtonText: `OK`,
      });
      return;
    } else
    if (data.StartDate > data.EndDate) {
      Swal.fire({
        title: "Error",
        text: "Date start must be before date end",
        icon: "error",
        confirmButtonText: `OK`,
      });
      return;
    } else if (data.StartDate == data.EndDate) {
      Swal.fire({
        title: "Error",
        text: "Date start must be before date end",
        icon: "error",
        confirmButtonText: `OK`,
      });
      return;
    } else if (data.PromotionDetails == "" || data.DiscountPercentage == "" || data.BookID.length == 0) {
      
    }

    console.log(data)
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Create`,
      cancelButtonText: `Cancel`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch("/api/promotion", {
            method: "POST",
            body: JSON.stringify(data),
          });
          const re = await res.json();
          if (res.ok) {
            Swal.fire({
              title: "Success",
              text: "Create promotion success",
              icon: "success",
              confirmButtonText: `OK`,
            }).then((result) => {
              if (result.isConfirmed) {
                router.push("/publisher/promotion");
              }
            });
          } else {
            throw new Error(re.message);
          }
        } catch (e) {
          Swal.fire({
            title: "Error",
            text: e.message,
            icon: "error",
            confirmButtonText: `OK`,
          });

        }
        }
        
    
    })


  };

  useEffect(() => {
    getPublisherBook();
  }, [status]);

  return (
    <Template>
      <ActionTemplate
        heading={"Create Your Promotion"}
        sideChildren={
          <div className="pt-8 pb-16">
            <img className=" w-80" src="/promotionlogo.svg" alt="promo" />
          </div>
        }
      >
        <form
          method="POST"
          className=" ml-48 mt-10"
          onSubmit={handleCreatePromotion}
        >
          <TextBox
            id={"a"}
            name={"DiscountPercentage"}
            max={99}
            min={1}
            label={"Discount percentage"}
            type={"number"}
          ></TextBox>
          <TextBox
            id={"b"}
            name={"StartDate"}
            label={"Date start"}
            type={"date"}
          ></TextBox>
          <TextBox
            id={"c"}
            name={"EndDate"}
            label={"Date end"}
            type={"date"}
          ></TextBox>
          <TextBox
            id={"d"}
            name={"PromotionDetails"}
            label={"Promotion details"}
            type={"text"}
          ></TextBox>
          <TagSelectBox
            label="Select Book"
            tags={book}
            tagvalue="BookID"
            taglabel="BookName"
            selectedTags={selectBook}
            setSelectedTags={setSelectBook}
          />

          <div className="ml-96 mt-10 mb-5">
            <Button
              className={"w-28"}
              text={"Cancel"}
              type={"secondary"}
            ></Button>
            <Button className={"w-28"} text={"Done"}></Button>
          </div>
        </form>
      </ActionTemplate>
    </Template>
  );
}

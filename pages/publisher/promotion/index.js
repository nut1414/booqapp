import { Template } from "@/components/common/Template";
import { SearchBox } from "@/components/input/SearchBox";
import { SelectBox } from "@/components/input/SelectBox";
import { PromotionManageRow } from "@/components/manage/PromotionManageRow";
import { useEffect, useState } from "react";
import fetch from "@/utils/fetch";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function Managepromotion() {
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");
  const [nameFilter, setNameFilter] = useState("");
  const [promotions, setPromotions] = useState([]);
  const { status, user } = useAuth();
  const router = useRouter();

  const perPage = 10;
  const indexOfLast = page * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const totalPages = Math.ceil(promotions.length / perPage);

  
  const getPromotion = async () => {
    try{

      const res = await fetch(`/api/promotion?Filter=${activeFilter}&${nameFilter.length>0? "PromotionDetail="+nameFilter : ""}`, {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok) {
        setPromotions(data)
        console.log(data);
      } else {
        console.log(data)
      }
      console.log(res)
    } catch (e) { console.log(e)}
  };

  useEffect(() => {
    if (router.isReady) {
      if (
        (status == "authenticated" && user?.role?.RoleID != 2) ||
        status == "unauthenticated"
      ) {
        router.push("/");
      }
    }
  }, [status, user, router]);

  useEffect(() => {
    if (router.isReady) {
      getPromotion();
    }
  }, [page, router, activeFilter, nameFilter]);
  

  // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">
        All Promotion
      </div>
      <div className="mx-32 flex justify-end">
        <div className="flex align-middle">
          <SelectBox noWidth={true} label={"Active Status"} value={activeFilter} onChange={(e) => setActiveFilter(e.target.value)} className="">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Not Active</option>
          </SelectBox>
        </div>
        <div className="h-6 pt-8 ">
          <SearchBox placeholder="Search for Promotion name" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
        </div>
      </div>

      <div className="min-w-[75vw] mx-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="border-b border-gray-500 text-left">
              <th className=" font-light text-base">Promotion ID</th>
              <th className=" font-light text-base">Promotion Name</th>
              <th className=" font-light text-base">Discount</th>
              <th className=" font-light text-base">Date Start</th>
              <th className=" font-light text-base">Date End</th>
              <th className=" font-light text-base">Sales Counts</th>
            </tr>
          </thead>
          <tbody>
            {
              promotions?.slice(indexOfFirst, indexOfLast).map((promotion) => (
                <PromotionManageRow key={promotion.PromotionID} promotionManage={promotion} />))
            }
          </tbody>
        </table>
        <div className="flex justify-center text-center">
          <button
            className="bg-transparent cursor-pointer w-32 text-black text-xl font-light py-2 px-4 rounded-full"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            {"< Previous"}
          </button>
          <button
            className="mx-4 text-xl font-light py-2 px-4 w-8 flex justify-center rounded-full cursor-pointer"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            {page > 1 ? page - 1 : ""}
          </button>
          <button className="mx-4 text-xl font-light py-2 px-4 w-8 flex justify-center text-spooky-orange rounded-full">
            {page}
          </button>
          <button
            className="mx-4 text-xl font-light py-2 px-4 w-8 flex justify-center rounded-full cursor-pointer"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
          >
            {page < totalPages ? page + 1 : ""}
          </button>
          <button
            className="bg-transparent cursor-pointer w-32 text-black text-xl font-light py-2 px-4 rounded-full"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
          >
            {"Next >"}
          </button>
        </div>
      </div>
    </Template>
  );
}

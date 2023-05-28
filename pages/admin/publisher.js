import { Template } from "@/components/common/Template";
import { SearchBox } from "@/components/input/SearchBox";
import { SelectBox } from "@/components/input/SelectBox";
import { PublisherManageRow } from "@/components/manage/PublisherManageRow";
import { useState, useEffect } from "react";
import fetch from "@/utils/fetch";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";


export default function Managepublisher() {
  const [page, setPage] = useState(1);
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [nameFilter, setNameFilter] = useState("");
  const [publishers, setPublishers] = useState([]);
  const { status, user } = useAuth();
  const router = useRouter();

  const perPage = 10;
  const indexOfLast = page * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const totalPages = Math.ceil(publishers.length / perPage);

  const getGenres = async () => {
    try {
      const res = await fetch(
        `/api/genre?${nameFilter.length > 0 ? "name=" + nameFilter : ""}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setPage(1);
        setPublishers(data.genre);
        console.log(data);
      } else {
        console.log(data);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    if (router.isReady) {
      if (
        (status == "authenticated" && user?.role?.RoleID != 0) ||
        status == "unauthenticated"
      ) {
        router.push("/");
      }
    }
  }, [status, user, router]);

  useEffect(() => {
    if (router.isReady) {
      getGenres();
    }
  }, [router, nameFilter]);
  // verification drop down has 4 value to pick from -> all, unverified, pending, verified
  return (
    <Template>
      <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">
        All Publisher
      </div>
      <div className="mx-32 flex justify-end">
        <div className="flex align-middle">
          <SelectBox noWidth={true} label={"Verification"} className="">
            <option value="all">All</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="notverify">Not Verify</option>
          </SelectBox>
        </div>
        <div className="h-6 pt-8 ">
          <SearchBox  placeholder="Search for Publisher name" />
        </div>
      </div>

      <div className="min-w-[75vw] mx-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="border-b border-gray-500 text-left">
              <th className=" font-light text-base">Publisher ID</th>
              <th className=" font-light text-base">Publisher Name</th>
              <th className=" font-light text-base">Order</th>
              <th className=" font-light text-base">Sales</th>
              <th className=" font-light text-base">Verify Status</th>
            </tr>
          </thead>
          <tbody>
            <PublisherManageRow
              publisherManage={{
                publisherID: "P0000000001",
                publishername: "Publisher1",
                order: "00000",
                sales: "00000",
                verifystatus: "Verified",
              }}
            />
            <PublisherManageRow
              publisherManage={{
                publisherID: "P0000000001",
                publishername: "Publisher1",
                order: "00000",
                sales: "00000",
                verifystatus: "Verified",
              }}
            />
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

import { Template } from "@/components/common/Template";
import { SearchBox } from "@/components/input/SearchBox";
import { SelectBox } from "@/components/input/SelectBox";
import { BookManageRow } from "@/components/manage/BookManageRow";
import { useEffect, useState } from "react";
import fetch from "@/utils/fetch";
import { useAuth } from "@/hooks/useAuth";
import { TextBox } from "@/components/input/TextBox";
import { Button } from "@/components/input/Button";
import { useRouter } from "next/router";

export default function ManageBook() {
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all");
  const [nameFilter, setNameFilter] = useState("");
  const [bookManage, setBookManage] = useState([]);

  const { status, user } = useAuth();
  const router = useRouter();

  const [filterDate, setFilterDate] = useState(false);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const perPage = 10;
  const indexOfLast = page * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const totalPages = Math.ceil(bookManage.length / perPage);

  const handleDateStart = (e) => {
    if (e.target.value > dateEnd && dateEnd.length > 0) {
      setDateStart("");
    } else {
      setDateStart(e.target.value);
    }
  };

  const handleDateEnd = (e) => {
    if (e.target.value < dateStart && dateStart.length > 0) {
      setDateEnd("");
    } else {
      setDateEnd(e.target.value);
    }
  };

  const getBookManage = async () => {
    try {
      const res = await fetch(
        `/api/getpublisherbook?Available=${activeFilter}${
          nameFilter.length > 0 ? "&BookName=" + nameFilter : ""
        }${filterDate && dateStart.length > 0 && dateEnd.length > 0 ? "&StartDate=" + dateStart + "&EndDate=" + dateEnd : ""}`
      );
      const data = await res.json();
      console.log(data);
      setBookManage(data);
    } catch (e) {
      console.log(e);
    }
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
    getBookManage();
  }, [activeFilter, nameFilter, dateStart, dateEnd, filterDate]);

  return (
    <Template>
      <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">
        All Book
      </div>
      <div className="mx-32 flex justify-end">
        <div className="flex align-middle">
          <div className="flex align-middle bg-slate-100 p-2 rounded-xl">
            <input
              type="checkbox"
              checked={filterDate}
              onChange={(e) => {
                setFilterDate(e.target.checked);
                setDateStart("");
                setDateEnd("");
              }}
            />
            <div className="flex">
              <TextBox
                noWidth={true}
                label="Date Start"
                type="date"
                className=""
                disabled={!filterDate}
                onChange={handleDateStart}
                value={dateStart}
              />
              <TextBox
                noWidth={true}
                onChange={handleDateEnd}
                value={dateEnd}
                label="Date End"
                type="date"
                disabled={!filterDate}
              />
            </div>
          </div>
          <SelectBox
            noWidth={true}
            label={"Available Status"}
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className=""
          >
            <option value="all">All</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </SelectBox>
        </div>
        <div className="h-6 pt-8 ">
          <SearchBox
            placeholder="Search for Book name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="min-w-[75vw] mx-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="border-b border-gray-500 text-left">
              <th className=" font-light text-base">Book ID</th>
              <th className=" font-light text-base">Book Title</th>
              <th className=" font-light text-base">Release Date</th>
              <th className=" font-light text-base">Price</th>
              <th className=" font-light text-base"></th>
              <th className=" font-light text-base">Sales Counts</th>
              <th className=" font-light text-base">Available Status</th>
            </tr>
          </thead>
          <tbody>
            {bookManage?.slice(indexOfFirst, indexOfLast)?.map((bookmanage) => {
              return (
                <BookManageRow
                  key={bookmanage.BookID + "bookmanage"}
                  bookManage={bookmanage}
                />
              );
            })}
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
        <Button className={"float-right"} text={"+Add"} onClick={()=> {router.push('/publisher/book/add')}}/>
      </div>
    </Template>
  );
}

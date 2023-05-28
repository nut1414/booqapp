import { Template } from "@/components/common/Template";
import { Button } from "@/components/input/Button";
import { SearchBox } from "@/components/input/SearchBox";
import { GenreManageRow } from "@/components/manage/GenreMangaeRow";
import { useState, useEffect } from "react";
import fetch from "@/utils/fetch";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";

export default function Managegenre() {
  const [page, setPage] = useState(1);

  const [nameFilter, setNameFilter] = useState("");
  const [genres, setGenres] = useState([]);
  const { status, user } = useAuth();
  const router = useRouter();

  const perPage = 10;
  const indexOfLast = page * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const totalPages = Math.ceil(genres.length / perPage);

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
        setGenres(data.genre);
        console.log(data);
      } else {
        console.log(data);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this genre!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it.",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/genre?id=${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (res.ok) {
            Swal.fire("Deleted!", "Your genre has been deleted.", "success");
            router.reload();
            getGenres();
          } else {
            Swal.fire("Error!", data.message, "error");
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
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

  return (
    <Template>
      <div className=" text-2xl font-bold mt-10 ml-32 inline-flex">
        All Genre
      </div>
      <div className="mx-32 flex justify-end">
        <div className="flex align-middle"></div>
        <div className="h-6 pt-8 mb-20">
          <SearchBox
            placeholder="Search for Genre name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="min-w-[75vw] mx-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="border-b border-gray-500 text-left">
              <th className=" font-light text-base">Genre ID</th>
              <th className=" font-light text-base">Genre Name</th>
              <th className=" font-light text-base">Book Count</th>
              <th className=" font-light text-base">Sales Count</th>
            </tr>
          </thead>
          <tbody>
            {genres?.slice(indexOfFirst, indexOfLast)?.map((genre) => (
              <GenreManageRow
                key={genre.GenreID}
                genreManage={genre}
                onClick={() => handleDelete(genre.GenreID)}
              />
            ))}
          </tbody>
        </table>
        <div className="ml-[73rem] mt-7">
          <Button text={"+Add"} onClick={() => router.push("/admin/genre/add")}></Button>
        </div>
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

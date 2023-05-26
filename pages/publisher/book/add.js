import { ActionTemplate } from "@/components/common/ActionTemplate"
import { Template } from "@/components/common/Template"
import { Button } from "@/components/input/Button"
import { SelectBox } from "@/components/input/SelectBox"
import { TagInput } from "@/components/input/TagInput"
import TagSelectBox from "@/components/input/TagSelectBox"
import { TextAreaBox } from "@/components/input/TextAreaBox"
import { TextBox } from "@/components/input/TextBox"
import { defaultFormat, defaultGenre } from "@/config/default"
import fetch from "@/utils/fetch"
import { useEffect, useRef, useState } from "react"
import Resizer from "react-image-file-resizer"
import Swal from "sweetalert2"
import { useRouter } from "next/router"

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      400,
      "JPEG",
      70,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64",
      300,
      400
    );
  });


  
export default function PublisherBookAdd() {
  const imgRef = useRef(null)
  const [img, setImg] = useState(null)
  const [genre, setGenre] = useState([])
  const [format, setFormat] = useState([])
  const [selectedGenre, setSelectedGenre] = useState([])
  const [selectedAuthor, setSelectedAuthor] = useState([])
  const router = useRouter()
  
  const getGenre = async () => {
    const res = await fetch('/api/fetch/genre', {
      method: 'GET'
    })
    if (res.ok) {
      const data = await res.json()
      console.log(data);
      setGenre(data.genre);
    } else {
      setGenre(defaultGenre)
    }
  }

  const getFormat = async () => {
    const res = await fetch("/api/fetch/format", {
      method: "GET",
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setFormat(data.formattype);
    } else {
      setFormat(defaultFormat);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      GenreID: selectedGenre,
      AuthorName: selectedAuthor,
      BookCover: img
    }

    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    console.log(data)
    //error checking
    if (data.BookName.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Title cannot be empty!",
      });
      return;
    } else if (data.AuthorName.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Author cannot be empty!",
      });
      return;
    } else if (data.GenreID.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Genre cannot be empty!",
      });
      return;
    } else if (data.FormatTypeID == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Format cannot be empty!",
      });
      return;
    } else if (data.Description == "") {

    } else if (data.Weight <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Weight must be greater than 0!",
      });
      return;
    } else if (data.Price <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Price must be greater than 0!",
      });

    }

    const res = await fetch('/api/book', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Book has been added!",
      });
      router.push('/publisher/book')
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }

  }




    // console.log(data)


  useEffect(() => {
    getGenre()
    getFormat()
  }, []) 

  useEffect(() => {
    imgRef.current.addEventListener('change', () => {
      console.log('change')
      console.log(imgRef.current.files)
      if (imgRef.current.files[0]) {
        resizeFile(imgRef.current.files[0]).then((res) => {
          setImg(res)
        })
      }
    })
  }, [imgRef])
  

  return (
    <Template>
      <ActionTemplate
        heading={"Adding Book"}
        sideChildren={
          <div>
            <div
              className="flex justify-center"
              onClick={() => imgRef.current.click()}
            >
              <img className=" w-80" src={img ? img : "/addbook.svg"}></img>
            </div>
            <input
              ref={imgRef}
              type="file"
              id="img"
              name="img"
              accept="image/*"
              className="file:text-spooky-orange file:border-none text-white file:bg-transparent hover:file:text-white hover:file:bg-spooky-orange file:min-w-28 file:h-10 file:m-2 file:px-6 file:rounded-3xl file:outline file:outline-2 file:outline-spooky-orange file:transition-all "
            />
            <p className="text-white mt-5 text-xs text-opacity-60 font-semibold inline-flex">
              jpg, jpeg, png (max file size 5MB)
            </p>
          </div>
        }
      >
        <div className=" ml-48 mt-10">
          <form method="POST" onSubmit={handleSubmit}>
            <TextBox
              id={"a"}
              name={"BookName"}
              label={"Book Title"}
              type={"text"}
            ></TextBox>
            <TagInput
              label="Author"
              tags={selectedAuthor}
              setTags={setSelectedAuthor}
            />
            <TagSelectBox
              label="Genre"
              tags={genre}
              tagvalue="GenreID"
              taglabel="GenreName"
              selectedTags={selectedGenre}
              setSelectedTags={setSelectedGenre}
            />
            <SelectBox name="FormatID" label="Format">
              {format?.map((item) => (
                <option key={item.FormatTypeID} value={item.FormatTypeID}>
                  {item.TypeName}
                </option>
              ))}
            </SelectBox>
            <TextAreaBox
              className={""}
              id={"e"}
              name={"Description"}
              label={"Description"}
            />
            {/* <TextBox className={""} id={"e"} name={"Description"} label={"Description"}  type={"text"} desorNot={"Description"}></TextBox> */}
            <TextBox
              id={"f"}
              name={"ReleaseDate"}
              label={"Release Date"}
              type={"date"}
            ></TextBox>
            <TextBox
              id={"g"}
              name={"Price"}
              label={"Price"}
              type={"number"}
            ></TextBox>
            <TextBox
              id={"h"}
              name={"Weight"}
              label={"Weight"}
              type={"number"}
            ></TextBox>
            <SelectBox name="Available" label="Available">
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </SelectBox>
            <div className="ml-96 mt-10 mb-5">
              <Button
                className={"w-28"}
                text={"Cancel"}
                type={"secondary"}
                onClick={(e) => {
                  e.preventDefault();
                  router.back();
                }}
                onSubmit={(e) => e.preventDefault()}
              ></Button>
              <Button
                className={"w-28"}
                text={"Done"}
                onSubmit={(e) => e.preventDefault()}
              ></Button>
            </div>
          </form>
        </div>
      </ActionTemplate>
    </Template>
  );
}
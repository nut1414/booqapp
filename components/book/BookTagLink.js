import Link from "next/link"

export function BookTagLink({ tagID, tagLabel, type }) {
  const tagType = type === "genre" ? "genre" : type === "author" ? "author" : type === "publisher" ? "publisher" : "book"
  return (
    <Link href={`/book/search/${tagType}/${tagID}`}>
      <div className="text-black hover:text-spooky-orange underline transition-all">{tagLabel}</div>
    </Link>
  )
  
}
import Link from "next/link"

export function BookTagLink({ tagID, tagLabel, type }) {
  const tagType = type === "genre" ? "GenreID" : type === "author" ? "AuthorID" : type === "publisher" ? "PublisherID" : "book"
  return (
    <Link href={`/search?${tagType}=${tagID}`}>
      <div className="text-black hover:text-spooky-orange underline transition-all">{tagLabel}</div>
    </Link>
  )
  
}
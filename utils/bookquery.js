const includeBookPublisher = () => ({
  publisher: true
})

const includeBookPromotion = (time) => ({
  promotionbook: {
    where: time ? {
      promotion:
      {
        StartDate: {
          lte: time,
        },
        EndDate: {
          gte: time,
        },
      },
    } : undefined,
    include: {
      promotion: true,
    },
  },
})

const includeBookAuthor = () => ({
  bookauthor: {
    include: {
      author: true,
    }
  }
})

const includeBookGenre = () => ({
  bookgenre: {
    include: {
      genre: true,
    },
  }
})

const whereBookSearchQuery = ({
      BookName,
      BookID,
      AuthorName,
      AuthorID,
      GenreName,
      GenreID,
      PublisherID,
      PublisherName
}) => (
  {
      BookName: BookName ? {
          contains: BookName
      } : undefined,
      BookID: BookID ? {
        equals: parseInt(BookID, 10)
      } : undefined,
      bookgenre: (GenreID || GenreName) ? {
        some: {
          genre: {
            OR: [
              { GenreName: GenreName ? { contains: GenreName } : undefined },
              { GenreID: GenreID ? { equals: parseInt(GenreID, 10) } : undefined }
            ]
          },
        }
      } : undefined,
      bookauthor: (AuthorID || AuthorName) ? {      
        some: {
          author: {
            OR: [
              { AuthorName: AuthorName ? { contains: AuthorName } : undefined },
              { AuthorID: AuthorID ? { equals: parseInt(AuthorID, 10) } : undefined }
            ]
          }
        }
      } : undefined,
      publisher: (PublisherID || PublisherName) ? {
        some: {
          publisher: {
            OR: [
              { PublisherName: PublisherName ? { contains: PublisherName } : undefined },
              { PublisherID: PublisherID ? { equals: parseInt(PublisherID, 10) } : undefined }
            ]
          }
        }
      } : undefined,
    }
)

export {
  includeBookPublisher,
  includeBookPromotion,
  includeBookAuthor,
  includeBookGenre,
  whereBookSearchQuery,
}
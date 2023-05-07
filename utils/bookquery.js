const includePublisher = () => ({
  publisher: true
})

const includePromotion = (time) => ({
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

export {
  includePublisher,
  includePromotion,
}
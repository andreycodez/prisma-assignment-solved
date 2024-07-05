import { prisma } from './prisma';

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: userId,
  //   },
  //   include: {
  //     starRatings: {
  //       select: {
  //         score: true,
  //       },
  //     },
  //   },
  // });

  // if (!user) return 0;
  // return (
  //   user.starRatings.reduce((acc, item) => acc + item.score, 0) /
  //   user.starRatings?.length
  // );

  return prisma.starRating
    .aggregate({
      _avg: {
        score: true,
      },
      where: {
        userId,
      },
    })
    .then((ratingAggregated) => ratingAggregated._avg.score);
};

import { prisma } from './prisma';

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  return prisma.user
    .findUnique({
      where: {
        id: userId,
      },
      include: {
        starRatings: {
          select: {
            score: true,
          },
        },
      },
    })
    .then(
      (data) =>
        data?.starRatings &&
        data?.starRatings.reduce((acc, item) => acc + item.score, 0) /
          data?.starRatings?.length
    );
};

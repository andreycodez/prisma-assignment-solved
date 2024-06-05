import { prisma } from './prisma';

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  return prisma.user
    .findUnique({
      where: {
        id: userId,
      },
      include: {
        starRatings: {
          include: {
            movie: true,
          },
        },
      },
    })
    .then((data) => data?.starRatings.map((item) => item.movie));
};

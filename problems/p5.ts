import { groupBy, sumBy, reduce, prop } from 'remeda';
import { prisma } from './prisma';

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones

export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const starRatingsWithMovies = await prisma.starRating.findMany({
    include: {
      movie: true,
    },
  });

  return reduce(
    Object.values(groupBy(starRatingsWithMovies, prop('movieId'))),
    (acc: unknown[], val) => {
      const avg = sumBy(val, (val) => val.score) / val.length;
      return avg > n ? [...acc, val[0].movie] : acc;
    },
    []
  );
};

import { maxBy, minBy } from 'remeda';
import { prisma } from './prisma';

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  return prisma.starRating
    .groupBy({
      by: ['userId'],
      _avg: {
        score: true,
      },
      orderBy: {
        _avg: {
          score: 'asc',
        },
      },
    })
    .then((data) => data[0].userId);
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  return prisma.starRating
    .groupBy({
      by: ['userId'],
      _avg: {
        score: true,
      },
      orderBy: {
        _avg: {
          score: 'desc',
        },
      },
    })
    .then((data) => data[0].userId);
};

import { prisma } from './prisma';

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  // const ratingDelete = prisma.starRating.deleteMany({
  //   where: { user: { age: { lt: n } } },
  // });
  // const userDelete = prisma.user.deleteMany({
  //   where: { age: { lt: n } },
  // });

  // return await prisma.$transaction([ratingDelete, userDelete]);

  return prisma.user.deleteMany({
    where: {
      age: {
        lt: n,
      },
    },
  });

  // const deletedRatings = await prisma.starRating.deleteMany({
  //   where: { user: { age: { lt: n } } },
  // });

  // if (!deletedRatings) return;

  // await prisma.user.deleteMany({
  //   where: { age: { lt: n } },
  // });
};

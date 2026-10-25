export function resultRank<T extends object>(
  items: T[],
  getScore: (item: T) => number,
): (T & { rank: number })[] {
  let currentRank = 1;

  return items.map((item, index) => {
    if (index > 0 && getScore(item) !== getScore(items[index - 1])) {
      currentRank = index + 1;
    }
    return {
      ...item,
      rank: currentRank,
    };
  });
}

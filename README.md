const getIconColor = (expiredate) => {
  const now = new Date();
  const expireDateObj = new Date(expiredate);
  const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = 7 * oneDay;

  if (expireDateObj < now) {
    return 'text-red-500';
  } else if (expireDateObj - now <= oneDay) {
    return 'text-orange-500';
  } else if (expireDateObj - now <= oneWeek) {
    return 'text-yellow-500';
  } else {
    return 'text-gray-500 dark:text-gray-400';
  }
};

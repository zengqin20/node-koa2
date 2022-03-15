function getTime() {
  const random = Math.floor(Math.random() * 16) + 1;
  const random1 = Math.floor(Math.random() * 5) + 1;
  const random2 = Math.floor(Math.random() * 9) + 1;

  const arr = [
    random2,
    random1,
    "即将到达",
    random,
    random1,
    random2,
    random2,
    "等待发车",
    random2,
    random2,
    random1,
  ];

  return arr[Math.floor(Math.random() * 11)];
}
module.exports = getTime;

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  const produkte = [
    {
      id: 1,
      title: "produkti 01",
      description: "pershkrimi i produktit 01",
      price: 1000,
    },
    {
      id: 2,
      title: "produkti 02",
      description: "pershkrimi i produktit 02",
      price: 2000,
    },
    {
      id: 3,
      title: "produkti 03",
      description: "pershkrimi i produktit 03",
      price: 3000,
    },
    {
      id: 4,
      title: "produkti 04",
      description: "pershkrimi i produktit 04",
      price: 4000,
    },
  ];
  res.status(200).json(produkte);
};

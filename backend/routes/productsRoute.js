import express from "express";
import productsModel from "../models/productsModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let { search, sortOrder, id } = req.query;
  const searchQuery = search && {
    product_name: {
      $regex: search,
      $options: "i",
    },
  };
  const findId = id && { uniq_id: id };
  const sort = sortOrder
    ? sortOrder === "asc"
      ? { discounted_price: 1 }
      : { discounted_price: -1 }
    : { id: 1 };
  const query = { ...searchQuery, ...findId };
  const result = await productsModel.find(query).sort(sort);

  res.send({ result });
});

export default router;

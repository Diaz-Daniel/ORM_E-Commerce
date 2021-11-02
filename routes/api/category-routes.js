const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

//Works
router.get("/", async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: [Product],
    });

    res.json(categories);
  } catch (err) {
    res.json(err);
  }

  // be sure to include its associated Products
});

//Works
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catId = await Category.findByPk(req.params.id, {
      include: [Product],
    });

    if (!catId) {
      res.status(404).json(err);
      return;
    }

    res.status(200).json(catId);
  } catch (err) {
    res.status(500).json(err);
  }
});

//NOT WORKING
router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      id: req.body.id,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

//NOT WORKING
router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
});

//Works
router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCat) {
      res.status(404).json(err);
      return;
    }

    res.status(200).json(deleteCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

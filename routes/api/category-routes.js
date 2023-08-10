const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: Product
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Product
    });
    res.json(category);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const target = req.params.id;
  const newName = req.body.category_name;

  try {
    const result = await Category.update(
      { category_name: newName },
      { where:    {id: target} }
    );

    if (result[0] === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: `Category name updated to ${newName}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const ctgData = await Category.destroy({
      where: { id: req.params.id }
    });

    if (!ctgData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(ctgData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: Product
    });
    res.json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: Product
    });
    res.json(tag);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const target = req.params.id;
  const newName = req.body.tag_name;

  try {
    const result = await Tag.update(
      { tag_name:   newName },
      { where: {id: target} }
    );

    if (result[0] === 0) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.status(200).json({ message: `Tag name updated to ${newName}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

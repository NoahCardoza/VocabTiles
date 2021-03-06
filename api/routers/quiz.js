const express = require('express');
const dbCategory = require('../db/category');
const dbQuestion = require('../db/question');

const router = express.Router();

router.get('/:slugs', async (req, res) => {
  const categories = await Promise.all(
    req.params.slugs.split(',').map((slug) => dbCategory.getCatBySlug(slug))
  );

  const result = await Promise.all(
    categories.map(async ({ id, type, title, slug }) => ({
      id,
      type,
      slug,
      category: title,
      tiles: await dbQuestion.getQuestionsByCategoryId(id).then((tiles) =>
        tiles.map((tile) => ({
          type,
          ...tile,
        }))
      ),
    }))
  );

  res.json(result);
});

module.exports = router;

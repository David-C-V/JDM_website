const express = require('express');
const router = express.Router();
const db = require('../db');

// 1. Obtener todos los carros
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM cars');
  res.json(result.rows);
});

// 2. Obtener un carro por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await db.query('SELECT * FROM cars WHERE id = $1', [id]);
  res.json(result.rows[0]);
});

// 3. Agregar un carro nuevo
router.post('/', async (req, res) => {
  const { brand, model, year } = req.body;
  const result = await db.query(
    'INSERT INTO cars (brand, model, year) VALUES ($1, $2, $3) RETURNING *',
    [brand, model, year]
  );
  res.json(result.rows[0]);
});

// 4. Editar un carro
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { brand, model, year } = req.body;
  const result = await db.query(
    'UPDATE cars SET brand=$1, model=$2, year=$3 WHERE id=$4 RETURNING *',
    [brand, model, year, id]
  );
  res.json(result.rows[0]);
});

// 5. Eliminar un carro
router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM cars WHERE id = $1', [req.params.id]);
  res.sendStatus(204);
});

module.exports = router;

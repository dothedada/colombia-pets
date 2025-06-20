const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, "data");

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf8"));
}

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Colombia Pets API",
      version: "1.0.0",
      description: "API documentation for Colombia Pets",
    },
    servers: [{ url: "http://localhost:" + PORT }],
  },
  apis: [__filename],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Get list of departments
 *     responses:
 *       200:
 *         description: List of departments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 */
app.get("/departments", (req, res) => {
  const departments = readJson("departments.json");
  const result = departments.map((d) => ({ id: d.id, name: d.name }));
  res.json(result);
});

/**
 * @swagger
 * /departments/{id}:
 *   get:
 *     summary: Get detailed department info
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Department ID
 *         example: "AMZ"
 *     responses:
 *       200:
 *         description: Department details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Department not found
 */
app.get("/departments/:id", (req, res) => {
  const departments = readJson("departments.json");
  const department = departments.find((d) => d.id === req.params.id);
  if (!department)
    return res.status(404).json({ error: "Department not found" });
  res.json(department);
});

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Get list of all pets
 *     responses:
 *       200:
 *         description: List of pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get("/pets", (req, res) => {
  const petsList = readJson("pets.json");
  res.json(petsList);
});

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Get info for a given pet by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pet ID
 *         example: "2"
 *     responses:
 *       200:
 *         description: Pet details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Pet not found
 */
app.get("/pets/:id", (req, res) => {
  const petsList = readJson("pets.json");
  const pet = petsList.find((pet) => pet.id === Number(req.params.id));
  if (!pet) return res.status(404).json({ error: "Pet not found" });
  res.json(pet);
});

/**
 * @swagger
 * /pets-list:
 *   get:
 *     summary: Get info of pets for a department and year
 *     parameters:
 *       - in: query
 *         name: departmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Department ID
 *         example: "AMZ"
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Year
 *         example: 2025
 *     responses:
 *       200:
 *         description: Pets info for department and year
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: departmentId and year are required
 *       404:
 *         description: No data for this department/year
 */
app.get("/pets-list", (req, res) => {
  const { departmentId, year } = req.query;
  if (!departmentId || !year) {
    return res
      .status(400)
      .json({ error: "departmentId and year are required" });
  }
  const petsData = readJson("pets_by_department_year.json");
  const petsList = readJson("pets.json");

  const records = petsData.filter(
    (r) => r.departmentId === departmentId && r.year === Number(year),
  );
  if (!records.length)
    return res.status(404).json({ error: "No data for this department/year" });

  const result = records.map((record, idx) => {
    const pet = petsList[idx];
    return {
      id: pet ? pet.id : idx,
      name: pet ? pet.name : undefined,
      favorite_food: pet ? pet.favorite_food : undefined,
      average_lifespan: pet ? pet.average_lifespan : undefined,
      common_color: pet ? pet.common_color : undefined,
      count: record.count,
    };
  });

  res.json(result);
});

/**
 * @swagger
 * /pets-group-by-year:
 *   get:
 *     summary: Get pets info for a department grouped by year
 *     parameters:
 *       - in: query
 *         name: departmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Department ID
 *         example: "AMZ"
 *     responses:
 *       200:
 *         description: Species info grouped by year
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: departmentId is required
 *       404:
 *         description: No data for this department
 */
app.get("/pets-group-by-year", (req, res) => {
  const { departmentId } = req.query;
  if (!departmentId) {
    return res.status(400).json({ error: "departmentId is required" });
  }
  const petsList = readJson("pets.json");
  const petsData = readJson("pets_by_department_year.json");

  const records = petsData.filter((r) => r.departmentId === departmentId);
  if (!records.length)
    return res.status(404).json({ error: "No data for this department" });

  const grouped = {};
  records.forEach((record) => {
    const year = record.year;
    const pet = petsList[record.petId - 1];
    const petInfo = {
      id: pet.id,
      name: pet.name,
      favorite_food: pet.favorite_food,
      average_lifespan: pet.average_lifespan,
      common_color: pet.common_color,
      count: record.count,
    };
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(petInfo);
  });

  const result = Object.entries(grouped).map(([year, pets]) => ({
    year: isNaN(Number(year)) ? year : Number(year),
    pets,
  }));

  result.sort((a, b) => a.year - b.year);
  res.json(result);
});

/**
 * @swagger
 * /pets-summary:
 *   get:
 *     summary: Get sum of species info for all departments in a given year
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Year
 *         example: 2025
 *     responses:
 *       200:
 *         description: Sum of species info for all departments in a year
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: year is required
 *       404:
 *         description: No data for this year
 */
app.get("/pets-summary", (req, res) => {
  const { year } = req.query;
  if (!year) {
    return res.status(400).json({ error: "year is required" });
  }
  const petsList = readJson("pets.json");
  const petsData = readJson("pets_by_department_year.json");

  const records = petsData.filter((r) => r.year === Number(year));
  if (!records.length)
    return res.status(404).json({ error: "No data for this year" });

  const petCounts = {};
  records.forEach((record) => {
    if (record.petId) {
      if (!petCounts[record.petId]) petCounts[record.petId] = 0;
      petCounts[record.petId] += record.count;
    }
  });

  const result = petsList.map((pet) => ({
    id: pet.id,
    name: pet.name,
    favorite_food: pet.favorite_food,
    average_lifespan: pet.average_lifespan,
    common_color: pet.common_color,
    count: petCounts[pet.id] || 0,
  }));

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

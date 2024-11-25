"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.use(express.json()); // => to parse request body with http header "content-type": "application/json"
var swaggerJsdoc = require("swagger-jsdoc"); // * as swaggerJsdoc from 'swagger-jsdoc'
var swaggerUi = require("swagger-ui-express");
var jsDocOptions = {
    definition: {
        openapi: '3.0.0', // Specify the OpenAPI version
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'Documentation for Express API with Swagger',
        },
        components: {
            schemas: {
                Todo: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                        },
                        title: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                    },
                },
                TodoNoId: {
                    type: 'object',
                    properties: {
                        title: {
                            type: 'string',
                        },
                        description: {
                            type: 'string',
                        },
                    },
                },
                // Define other schemas as needed
                LearningPackage: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Unique identifier of the Learning Package',
                        },
                        title: {
                            type: 'string',
                            description: 'Title of the Learning Package',
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the Learning Package',
                        },
                        category: {
                            type: 'string',
                            description: 'Category of the Learning Package (e.g., Programming, Web Development)',
                        },
                        targetAudience: {
                            type: 'string',
                            description: 'Target audience for the Learning Package (e.g., age, prerequisites)',
                        },
                        difficulty: {
                            type: 'integer',
                            description: 'Difficulty level of the Learning Package (from 1 to 20)',
                            minimum: 1,
                            maximum: 20,
                        },
                    },
                    required: ['id', 'title', 'description', 'category', 'targetAudience', 'difficulty'], // Optional: add required fields if necessary
                },
            },
        },
    },
    apis: ['app-todo.js'],
};
var apiDoc = swaggerJsdoc(jsDocOptions);
console.log('api-doc json:', JSON.stringify(apiDoc, null, 2));
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(apiDoc));
app.get('/api/liveness', function (req, res) {
    res.send('OK !!!');
});
var idGenerator = 1;
function newId() {
    return idGenerator++;
}
var todos = [
    { id: newId(), title: 'Learn TypeScript' },
    { id: newId(), title: 'Learn Angular' },
    { id: newId(), title: 'Learn NodeJs' },
    { id: newId(), title: 'Learn Express' },
];
/**
 * @openapi
 * /api/todos:
 *   get:
 *     description: Get all todos
 *     responses:
 *       200:
 *         description: An array of Todo
 *         schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Todo'
 */
app.get('/api/todos', function (req, res) {
    console.log('handle http GET /api/todos');
    res.send(todos);
});
/**
 * @openapi
 * /api/todos:
 *   post:
 *     description: save a new Todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoNoId'
 *     responses:
 *       200:
 *         description: An array of Todo
 *         schema:
 *           $ref: '#/components/schemas/Todo'
 */
app.post('/api/todos', function (req, res) {
    var item = req.body;
    console.log('handle http POST /api/todos', item);
    item.id = newId();
    todos.push(item);
    res.send(item);
});
/**
 * @openapi
 * /api/todos:
 *   put:
 *     description: update an existing todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: An array of Todo
 *         schema:
 *           $ref: '#/components/schemas/Todo'
 */
app.put('/api/todos', function (req, res) {
    var item = req.body;
    console.log('handle http PUT /api/todos', item);
    var id = item.id;
    var idx = todos.findIndex(function (x) { return x.id === id; });
    if (idx !== -1) {
        var found = todos[idx];
        if (item.title) {
            found.title = item.title;
        }
        if (item.description) {
            found.description = item.description;
        }
        res.send(found);
    }
    else {
        res.status(404).send('Todo entity not found by id:' + id);
    }
});
/**
 * @openapi
 * /api/todos/{id}:
 *   get:
 *     description: get a todo by its id
 *     parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the Todo to get
 *           schema:
 *             type: number
 *     responses:
 *       200:
 *         description: the todo
 *         schema:
 *           $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
app.get('/api/todos/:id', function (req, res) {
    var id = +req.params['id'];
    console.log('handle http GET /api/todos/:id', id);
    var idx = todos.findIndex(function (x) { return x.id === id; });
    if (idx !== -1) {
        var found = todos[idx];
        res.send(found);
    }
    else {
        res.status(404).send('Todo entity not found by id:' + id);
    }
});
/**
 * @openapi
 * /api/todos/{id}:
 *   delete:
 *     description: delete an existing Todo by its id
 *     parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the Todo to delete
 *           schema:
 *             type: number
 *     responses:
 *       200:
 *         description: the deleted Todo
 *         schema:
 *           $ref: '#/components/schemas/Todo'
 *       404:
 *         description: when the Todo was not found
 */
app.delete('/api/todos/:id', function (req, res) {
    var id = +req.params['id'];
    console.log('handle http DELETE /api/todos/:id', id);
    var idx = todos.findIndex(function (x) { return x.id === id; });
    if (idx !== -1) {
        var found = todos.splice(idx, 1)[0];
        res.send(found);
    }
    else {
        res.status(404).send('Todo entity not found by id:' + id);
    }
});
// Hard-coded array of LearningPackage objects
var learningPackages = [
    { id: 1, title: "Learn TypeScript", description: "An introductory course to TypeScript.", category: "Programming", targetAudience: "Beginner, 15+ years old", difficulty: 5 },
    { id: 2, title: "Learn NodeJs", description: "A course on building backend applications using Node.js.", category: "Programming", targetAudience: "Intermediate, 18+ years old", difficulty: 8 },
    { id: 3, title: "Learn Html", description: "Basic web development with HTML.", category: "Web Development", targetAudience: "Beginner, 12+ years old", difficulty: 4 },
    { id: 4, title: "Learn Angular", description: "A comprehensive guide to building web apps with Angular.", category: "Web Development", targetAudience: "Intermediate, 16+ years old", difficulty: 7 },
];
/**
 * @openapi
 * /api/package:
 *   get:
 *     description: Get all learning packages
 *     responses:
 *       200:
 *         description: An array of LearningPackage
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LearningPackage'
 */
app.get('/api/package', function (req, res) {
    console.log('handle http GET /api/package');
    res.status(200).json(learningPackages);
});
/**
 * @openapi
 * /api/package:
 *   post:
 *     description: Create a new LearningPackage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningPackage'
 *     responses:
 *       200:
 *         description: Created LearningPackage
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningPackage'
 *       400:
 *         description: Missing required fields
 */
app.post('/api/package', function (req, res) {
    var _a = req.body, title = _a.title, description = _a.description, category = _a.category, targetAudience = _a.targetAudience, difficulty = _a.difficulty;
    // Validate required fields
    if (!title || !description || !category || !targetAudience || difficulty === undefined) {
        res.status(400).send("Mandatory fields 'title', 'description', 'category', 'targetAudience', and 'difficulty' are missing.");
        return;
    }
    // Validate difficulty range
    if (difficulty < 1 || difficulty > 20) {
        res.status(400).send("Field 'difficulty' must be between 1 and 20.");
        return;
    }
    var newPackage = {
        id: learningPackages.length + 1, // Generate new id
        title: title,
        description: description,
        category: category,
        targetAudience: targetAudience,
        difficulty: difficulty,
    };
    learningPackages.push(newPackage); // Add to list
    res.status(200).send(newPackage); // Return the created object
});
/**
 * @openapi
 * /api/package:
 *   put:
 *     description: Update an existing LearningPackage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningPackage'
 *     responses:
 *       200:
 *         description: Updated LearningPackage
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningPackage'
 *       404:
 *         description: LearningPackage not found
 */
app.put('/api/package', function (req, res) {
    var _a = req.body, id = _a.id, title = _a.title, description = _a.description, category = _a.category, targetAudience = _a.targetAudience, difficulty = _a.difficulty;
    // Validate ID and all fields
    if (!id || !title || !description || !category || !targetAudience || difficulty === undefined) {
        res.status(400).send("Mandatory fields 'id', 'title', 'description', 'category', 'targetAudience', and 'difficulty' are missing.");
        return;
    }
    // Validate difficulty range
    if (difficulty < 1 || difficulty > 20) {
        res.status(400).send("Field 'difficulty' must be between 1 and 20.");
        return;
    }
    var packageIndex = learningPackages.findIndex(function (pkg) { return pkg.id === id; });
    if (packageIndex !== -1) {
        // Update the learning package
        learningPackages[packageIndex] = {
            id: id,
            title: title,
            description: description,
            category: category,
            targetAudience: targetAudience,
            difficulty: difficulty,
        };
        res.status(200).send(learningPackages[packageIndex]); // Respond with updated object
    }
    else {
        res.status(404).send("Entity not found for id: ".concat(id));
    }
});
/**
 * @openapi
 * /api/package-summaries:
 *   get:
 *     description: Get a summary of all LearningPackages (only id and title)
 *     responses:
 *       200:
 *         description: An array of LearningPackage summaries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 */
app.get('/api/package-summaries', function (req, res) {
    // Get the summaries with only id and title fields
    var summaries = learningPackages.map(function (pkg) { return ({
        id: pkg.id,
        title: pkg.title,
    }); });
    res.status(200).send(summaries);
});
console.log('starting...');
app.listen(3000, function () {
    console.log('Ok, started port 3000, please open http://localhost:3000/swagger-ui');
});

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
var LearningPackage_1 = require("./models/LearningPackage");
var app = express();
app.use(express.json());
var jsDocOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'Documentation for Express API with Swagger',
        },
        components: {
            schemas: {
                // app-todos
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
                // app-todos without id
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
                // learning package
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
                            description: 'Category of the Learning Package',
                        },
                        targetAudience: {
                            type: 'string',
                            description: 'Target audience for the Learning Package',
                        },
                        difficulty: {
                            type: 'integer',
                            description: 'Difficulty level of the Learning Package',
                            minimum: 1,
                            maximum: 20,
                        },
                    },
                },
                // learning package without ID (for the POST)
                LearningPackageNoID: {
                    type: 'object',
                    properties: {
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
                            description: 'Category of the Learning Package',
                        },
                        targetAudience: {
                            type: 'string',
                            description: 'Target audience for the Learning Package',
                        },
                        difficulty: {
                            type: 'integer',
                            description: 'Difficulty level of the Learning Package',
                            minimum: 1,
                            maximum: 20,
                        },
                    },
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
// GET all
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
// POST
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
// PUT
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
// DELETE (with id)
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
// LEARNING PACKAGE PART
// GET all
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
app.get('/api/package', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var packages, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, LearningPackage_1.default.findAll()];
            case 1:
                packages = _a.sent();
                res.status(200).json(packages);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error('Erreur lors de la récupération des packages :', err_1);
                res.status(500).json({ error: 'Erreur interne du serveur.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET a specific id
/**
 * @openapi
 * /api/package/{id}:
 *   get:
 *     description: Get a Learning Package by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Learning Package
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested Learning Package
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningPackage'
 *       404:
 *         description: Learning Package not found
 */
app.get('/api/package/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, foundPackage, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = +req.params.id;
                return [4 /*yield*/, LearningPackage_1.default.findByPk(id)];
            case 1:
                foundPackage = _a.sent();
                if (!foundPackage) {
                    res.status(404).json({ error: 'Learning Package not found.' });
                    return [2 /*return*/];
                }
                res.status(200).json(foundPackage);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.error('Error retrieving the package:', err_2);
                res.status(500).json({ error: 'Internal server error.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// POST
/**
 * @openapi
 * /api/package:
 *   post:
 *     description: Create a new Learning Package
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningPackageNoID'
 *     responses:
 *       201:
 *         description: The created Learning Package
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningPackage'
 */
app.post('/api/package', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, category, targetAudience, difficulty, newPackage, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, description = _a.description, category = _a.category, targetAudience = _a.targetAudience, difficulty = _a.difficulty;
                return [4 /*yield*/, LearningPackage_1.default.create({
                        title: title,
                        description: description,
                        category: category,
                        targetAudience: targetAudience,
                        difficulty: difficulty,
                    })];
            case 1:
                newPackage = _b.sent();
                res.status(201).json(newPackage);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _b.sent();
                console.error('Error creating a new package:', err_3);
                res.status(500).json({ error: 'Internal server error.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// PUT
/**
 * @openapi
 * /api/package/{id}:
 *   put:
 *     description: Update an existing Learning Package by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Learning Package to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LearningPackage'
 *     responses:
 *       200:
 *         description: The updated Learning Package
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningPackage'
 *       404:
 *         description: Learning Package not found
 */
app.put('/api/package/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updatedData, packageToUpdate, updatedPackage, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = +req.params.id;
                updatedData = req.body;
                return [4 /*yield*/, LearningPackage_1.default.findByPk(id)];
            case 1:
                packageToUpdate = _a.sent();
                if (!packageToUpdate) {
                    res.status(404).json({ error: 'Learning Package not found.' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, packageToUpdate.update(updatedData)];
            case 2:
                updatedPackage = _a.sent();
                res.status(200).json(updatedPackage);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                console.error('Error updating the package:', err_4);
                res.status(500).json({ error: 'Internal server error.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// DELETE
/**
 * @openapi
 * /api/package/{id}:
 *   delete:
 *     description: Delete a Learning Package by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Learning Package to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted Learning Package
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningPackage'
 *       404:
 *         description: Learning Package not found
 */
app.delete('/api/package/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, packageToDelete, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = +req.params.id;
                return [4 /*yield*/, LearningPackage_1.default.findByPk(id)];
            case 1:
                packageToDelete = _a.sent();
                if (!packageToDelete) {
                    res.status(404).json({ error: 'Learning Package not found.' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, packageToDelete.destroy()];
            case 2:
                _a.sent();
                res.status(200).json(packageToDelete);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                console.error('Error deleting the package:', err_5);
                res.status(500).json({ error: 'Internal server error.' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
console.log('starting...');
app.listen(3000, function () {
    console.log('Ok, started port 3000, please open http://localhost:3000/swagger-ui');
});

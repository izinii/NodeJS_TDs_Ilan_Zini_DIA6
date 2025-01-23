import express = require('express');
import { Request, Response} from 'express';
import swaggerJsdoc = require('swagger-jsdoc');
import swaggerUi = require('swagger-ui-express');
import LearningPackage from "./models/LearningPackage";



const app = express();
app.use(express.json());


const jsDocOptions = {
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



const apiDoc = swaggerJsdoc(jsDocOptions);
console.log('api-doc json:', JSON.stringify(apiDoc, null,2));

app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(apiDoc));


app.get('/api/liveness', (req: Request, res: Response) => {
    res.send('OK !!!');
});




// TODOS PART

interface Todo {
    id?: number;
    title: string;
    description?: string;
    priority?: number;
}

let idGenerator = 1;
function newId() {
    return idGenerator++;
}

let todos : Todo[] = [
    {id: newId(), title: 'Learn TypeScript'},
    {id: newId(), title: 'Learn Angular'},
    {id: newId(), title: 'Learn NodeJs'},
    {id: newId(), title: 'Learn Express'},
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
app.get('/api/todos', (req: Request, res: Response) => {
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
app.post('/api/todos', (req: Request, res: Response) => {
    let item = <Todo> req.body;
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
app.put('/api/todos', (req: Request, res: Response) => {
    let item = <Todo> req.body;
    console.log('handle http PUT /api/todos', item);
    const id = item.id;
    const idx = todos.findIndex((x) => x.id === id);
    if (idx !== -1) {
        const found = todos[idx];
        if (item.title) {
            found.title = item.title;
        }
        if (item.description) {
            found.description = item.description;
        }
        res.send(found);
    } else {
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
app.delete('/api/todos/:id', (req, res) => {
    const id = +req.params['id']
    console.log('handle http DELETE /api/todos/:id', id);
    const idx = todos.findIndex((x) => x.id === id);
    if (idx !== -1) {
        const found = todos.splice(idx, 1)[0];
        res.send(found);
    } else {
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
app.get('/api/package', async (req: Request, res: Response) => {
    try {
        const packages = await LearningPackage.findAll();
        res.status(200).json(packages);
    } catch (err) {
        console.error('Erreur lors de la récupération des packages :', err);
        res.status(500).json({error: 'Erreur interne du serveur.'});
    }
});


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
app.get('/api/package/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const id = +req.params.id;

        const foundPackage = await LearningPackage.findByPk(id);
        if (!foundPackage) {
            res.status(404).json({ error: 'Learning Package not found.' });
            return;
        }

        res.status(200).json(foundPackage);
    } catch (err) {
        console.error('Error retrieving the package:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


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
app.post('/api/package', async (req: Request, res: Response) => {
    try {
        const { title, description, category, targetAudience, difficulty } = req.body;

        const newPackage = await LearningPackage.create({
            title,
            description,
            category,
            targetAudience,
            difficulty,
        });

        res.status(201).json(newPackage);
    } catch (err) {
        console.error('Error creating a new package:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


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
app.put('/api/package/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const id = +req.params.id;
        const updatedData = req.body;

        const packageToUpdate = await LearningPackage.findByPk(id);
        if (!packageToUpdate) {
            res.status(404).json({ error: 'Learning Package not found.' });
            return;
        }

        const updatedPackage = await packageToUpdate.update(updatedData);
        res.status(200).json(updatedPackage);
    } catch (err) {
        console.error('Error updating the package:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


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
app.delete('/api/package/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const id = +req.params.id;

        const packageToDelete = await LearningPackage.findByPk(id);
        if (!packageToDelete) {
            res.status(404).json({ error: 'Learning Package not found.' });
            return;
        }

        await packageToDelete.destroy();
        res.status(200).json(packageToDelete);
    } catch (err) {
        console.error('Error deleting the package:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});








console.log('starting...');
app.listen(3000, () => {
    console.log('Ok, started port 3000, please open http://localhost:3000/swagger-ui');
});
const express = require('express');
const router = express.Router();
// const galleryItems = require('../modules/gallery.data');
const pg = require('pg');
const Pool = pg.Pool;


// Database connection for weekend-to-do-app
const pool = new Pool({
    database: 'weekend-gallery',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 10000
});

// DO NOT MODIFY THIS FILE FOR BASE MODE

// POST Route
router.post('/', (req,res) => {
    let queryText = `INSERT INTO "gallery_items" ("path", "description", "likes") VALUES ($1, $2, 0);`;
    pool.query(queryText, [req.body.path, req.body.description]).then((result) => {
        // send a response of created back to the client
        res.sendStatus(201);
    }).catch((error) => {
        // console log and error message for POST error
        console.log(`Error in router POST: ${error}`);
        res.sendStatus(500);
    });
}); // end POST route

// GET Route
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "gallery_items" ORDER BY "likes" DESC, "id" ASC;`;
    pool.query(queryText).then((result) => {
        // send all the database items back to the client
        res.send(result.rows);
    }).catch((error) => {
        // console log and error message for GET error
        console.log(`Error in router GET: ${error}`);
        res.sendStatus(500);
    });
}); // END GET Route

// PUT Route
router.put('/like/:id/:likes', (req, res) => {
    // convert likes to a number and add 1
    let likes = Number(req.params.likes) + 1;
    let queryText = `UPDATE "gallery_items" SET "likes" = $1 WHERE "id" = $2;`;
    pool.query(queryText, [likes, req.params.id]).then((result) => {
        // send the created response back
        res.sendStatus(201);
    }).catch((error) => {
        // console log and error message for PUT error
        console.log(`Error in router PUT: ${error}`);
        res.sendStatus(500);
    });
}); // END PUT Route

// DELETE Route
router.delete('/delete/:id', (req,res) => {
    let queryText = `DELETE FROM "gallery_items" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then((result) => {
        // it seems wrong to use 201 - created for a delete request so I put OK
        res.sendStatus(200);
    }).catch((error) => {
        // console log and error message for DELETE error
        console.log(`Error in router DELETE: ${error}`);
        res.sendStatus(500);
    });
}); // end DELETE route

module.exports = router;
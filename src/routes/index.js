const express = require('express');
const router = express.Router();

//get databse => 
const pool = require('../database');

//rur ini

router.get('/', (req, res) => {
    res.send('bienvenido a la raiz del servidor');
})

//rut ini user
router.get('/home', (req, res) => {
    res.render('index', {
        title: 'Task'
    })
})

//rut /add-task
router.get('/add-task', (req, res) => {
    res.render('add-task', {
        title: 'Task'
    })
})

//rut post /add-task
router.post('/add-task', async (req, res) => {
    const {title, url, description} = req.body;
    const task = {
        title,
        url,
        description
    }
    //console.log(task);
    await pool.query('INSERT INTO task SET ?',[task]);
    req.flash('alert',' Registro exitoso ! ');
    res.redirect('view-task');
})


//rut get /view-task
router.get('/view-task', async (req, res) => {
    const tasks = await pool.query('SELECT * FROM task');
    res.render('view-task',{
        tasks,
        title: 'Task'
    });
})

//rut delete
router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await pool.query('DELETE FROM task WHERE id = ?',[id]);
    req.flash('alert', ' se elimino tarea correctamente ');
    res.redirect('/view-task');
})

//rut update
router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const task = await pool.query('SELECT * FROM task WHERE id = ?',[id]);
    res.render('edit.ejs',{
        task,
        title: 'Task'
    });
})

//rut update post
router.post('/edit', async (req, res) => {
    const {title, url, description} = req.body;
    const id = req.body.id;
    const update = {
        title,
        url,
        description
    }
    await pool.query('UPDATE task SET ? WHERE id = ?',[update, id]);
    req.flash('alert',' actualizacion finalizada ! ');
    res.redirect('/view-task');
})


module.exports = router;
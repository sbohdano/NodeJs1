const express = require('express');
const path = require('path');
const exhbs = require('express-handlebars');
const app = express();
const fs = require('fs');
const multer = require('multer');
const cors = require('cors')
const parseData = require('./scripts/parseData');

const hbs = exhbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

// Парсимо дані
const parsedData = parseData();

app.get('/', (req, res) => { 
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        }
        
        let users = [];
        if (data) {
            try {
                const parsedData = JSON.parse(data);
                users = parsedData.data || [];
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                return res.status(500).send('Error parsing JSON');
            }
        }
        
        res.render('main', {
            users: users // Передаємо актуальні дані користувачів
        });
    });
});

app.post('/api/submit', upload.single('file'), (req, res) => {
    const { name, age, bio } = req.body;
    const file = req.file;

    if (file) {
        console.log(`File uploaded: ${file.filename}`);
    } else {
        console.log('No file uploaded');
    }

    console.log(`Name: ${name}`);
    console.log(`Age: ${age}`);
    console.log(`Bio: ${bio}`);

    // Створення об'єкта для нового користувача
    const newUser = { Name: name, Age: age, Bio: bio };

    // Читання існуючого файлу data.json
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading file');
        }

        let users = [];

        // Якщо файл не порожній, парсимо його
        if (data) {
            try {
                const parsedData = JSON.parse(data);
                users = parsedData.data || []; // Беремо масив з існуючих даних
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                return res.status(500).send('Error parsing JSON');
            }
        }

        // Додаємо нового користувача
        users.push(newUser);

        // Записуємо оновлений масив назад у файл
        const updatedData = JSON.stringify({ data: users }, null, 2);
        fs.writeFile('data.json', updatedData, (writeErr) => {
            if (writeErr) {
                console.error('Error writing file:', writeErr);
                return res.status(500).send('Error writing file');
            }
            console.log('Saved!');
            res.status(200).send('User data saved successfully!');
        });
    });
});

app.get('/list',(req, res) => {
    fs.readFile('data.json', function(err,data){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        return res.end()
    })
})




let port = 3000;
app.listen(port, () => {
    console.log(`the server has just been started http://localhost:${port}`)
});
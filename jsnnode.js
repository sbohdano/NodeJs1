const express = require('express');
const path = require('path');
const exhbs = require('express-handlebars');
const app = express();
const fs = require('fs');
const multer = require('multer');
const cors = require('cors')

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


app.get('/', (req, res) => { 
     res.render('main');
})

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
    const info = `{"Name": "${name}" ,"Age": "${age}", "Bio": "${bio}"}*`;

    fs.appendFile('data.json', info, function (err) {
        if (err) throw err;
        console.log('Saved!');
    })

    
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
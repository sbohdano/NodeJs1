// parseData.js
const fs = require('fs');

function parseData() {
    // Читаємо файл data.json
    const jsonData = fs.readFileSync('data.json', 'utf-8');
    
    // Парсимо JSON-дані
    const parsedJson = JSON.parse(jsonData);
    
    // Повертаємо масив об'єктів
    console.log(parsedJson.data)
    return parsedJson.data;
}

module.exports = parseData;

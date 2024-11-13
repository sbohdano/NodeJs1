const addButton = document.querySelector('.addButton');
const closePage = document.querySelector('.close');
const nameofpet = document.querySelector('.nameinput');
const ageofpet = document.querySelector('.ageinput');
const biopet = document.querySelector('.biopet');
const sentBTN = document.querySelector('.sent');
const AddBlock = document.querySelector('.addblock');
const mainSection = document.querySelector('.mainsection');
const InputImg = document.querySelector('.inputac');

// Відкриваємо блок для додавання нових даних
addButton.addEventListener('click', function() {
    AddBlock.style.display = 'block';
    AddBlock.style.transform = 'translateY(650px)';
});

// Закриваємо блок без збереження
closePage.addEventListener('click', function() {
    AddBlock.style.display = 'none';
});

// Відправка даних на сервер
sentBTN.addEventListener('click', async function() {
    const formData = new FormData();
    AddBlock.style.transform = 'translateY(500px)';
    AddBlock.style.display = 'none';
    formData.append('name', nameofpet.value);
    formData.append('age', ageofpet.value);
    formData.append('bio', biopet.value);
    // // Додати файл, якщо потрібно
    formData.append('file', InputImg.files[0]);

    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        
        if (response.ok) {
            console.log(result.message);
            adding(); // Додаємо новий блок на сторінку
            // Очищуємо поля вводу після успішної відправки
            nameofpet.value = '';
            ageofpet.value = '';
            biopet.value = '';
            AddBlock.style.display = 'none';
        } else {
            console.error('Помилка:', result.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
    location.reload();
});


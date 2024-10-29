const addButton = document.querySelector('.addButton');
const closePage = document.querySelector('.close');
const nameofpet = document.querySelector('.nameinput');
const ageofpet = document.querySelector('.ageinput');
const biopet = document.querySelector('.biopet');
const sentBTN = document.querySelector('.sent');
const AddBlock = document.querySelector('.addblock');
const mainSection = document.querySelector('.mainsection');
const InputImg = document.querySelector('.inputac');

addButton.addEventListener('click', function() {
    AddBlock.style.display = 'block';
    AddBlock.style.transform = 'translateY(650px)';
});

closePage.addEventListener('click', function() {
    AddBlock.style.transform = 'translateY(-100px)';
    AddBlock.style.display = 'none';
});


sentBTN.addEventListener('click', async function() {
    const formData = new FormData();
    formData.append('name', nameofpet.value);
    formData.append('age', ageofpet.value);
    formData.append('bio', biopet.value);
    formData.append('file', InputImg.files[0]); // Загружаемый файл

    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error('Ошибка:', error);
    }
});

function adding() {
    let myObj = {name: nameofpet.value, age: ageofpet.value}
    let myJSON = JSON.stringify(myObj);
    localStorage.setItem('testJSON',myJSON);

    let text = localStorage.getItem('testJSON');
    let obj = JSON.parse(text);
    let newBlock = document.createElement('div');
    mainSection.appendChild(newBlock);

    newBlock.innerHTML = `
        <div class="petBlock">
            <div class="photo">
                <img  class="photoimg" src="img/logo.png" alt="">
            </div>
            <h2>${obj.name}</h2>
            <h3>${obj.age}</h3>
            <p>Біографія</p>
    </div>
    `
};

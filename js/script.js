//  Простая анимация при наведении на кнопку
const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)'; // Небольшое увеличение при наведении
        this.style.transition = 'transform 0.2s ease-in-out'; // Плавная анимация
    });

    button.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)'; // Возврат к исходному размеру
    });
});

document.addEventListener('DOMContentLoaded', function() {

    const categoriesGrid = document.querySelector('.categories-grid');
    const resourceList = document.getElementById('resource-list');

    // Данные о ресурсах
    const resourcesData = {
        tools: [
            { name: 'Figma', description: 'Инструмент для UI-дизайна.', link: '#' },
            { name: 'Adobe Photoshop', description: 'Редактор изображений.', link: '#' }
        ],
        inspiration: [
            { name: 'Dribbble', description: 'Платформа для поиска вдохновения.', link: '#' },
            { name: 'Behance', description: 'Платформа для демонстрации работ.', link: '#' }
        ],
        learning: [
            { name: 'Coursera', description: 'Онлайн-курсы по дизайну.', link: '#' },
            { name: 'Udemy', description: 'Платформа для обучения дизайну.', link: '#' }
        ],
        community: [
            { name: 'Discord Design Server', description: 'Сообщество дизайнеров в Discord.', link: '#' },
            { name: 'Reddit Design Subreddits', description: 'Сообщества дизайнеров на Reddit.', link: '#' }
        ]
    };

    categoriesGrid.addEventListener('click', function(event) {
        if (event.target.classList.contains('category-item') || event.target.closest('.category-item')) {
            const categoryItem = event.target.closest('.category-item');
            const category = categoryItem.dataset.category;

            // Очищаем список ресурсов
            resourceList.innerHTML = '';

            // Если есть данные для категории
            if (resourcesData[category]) {
                resourcesData[category].forEach(resource => {
                    const resourceItem = document.createElement('div');
                    resourceItem.classList.add('resource-item');
                    resourceItem.innerHTML = `
                        <h3>${resource.name}</h3>
                        <p>${resource.description}</p>
                        <a href="${resource.link}" target="_blank">Подробнее</a>
                    `;
                    resourceList.appendChild(resourceItem);
                });
            } else {
                resourceList.innerHTML = '<p>Нет ресурсов в этой категории.</p>';
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация карты (Leaflet)
    var map = L.map('map').setView([50.594150, 36.576930], 17); //  Координаты Белгород, масштаб 17

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([50.594150, 36.576930]).addTo(map) //  Маркер в Белгороде
        .bindPopup('Design Compass')
        .openPopup();
});

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

// Интерактивная игра «Угадай цвет»
document.addEventListener('DOMContentLoaded', function() {
    
    const colorDisplay = document.getElementById('color-display');
    const colorOptions = document.querySelectorAll('.color-option');
    const message = document.getElementById('message');
    const newColorsButton = document.getElementById('new-colors');

    let correctColor;
    let colors;

    function generateRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `RGB(${r}, ${g}, ${b})`;
    }

    function generateRandomColors(num) {
        const arr = [];
        for (let i = 0; i < num; i++) {
            arr.push(generateRandomColor());
        }
        return arr;
    }

    function pickCorrectColor() {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    function setupGame() {
        colors = generateRandomColors(3);
        correctColor = pickCorrectColor();
        colorDisplay.textContent = correctColor;

        for (let i = 0; i < colorOptions.length; i++) {
            colorOptions[i].style.backgroundColor = colors[i];
            colorOptions[i].dataset.color = colors[i];
        }

        message.textContent = "Начните игру!";
    }

    setupGame();

    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const clickedColor = this.dataset.color;

            if (clickedColor === correctColor) {
                message.textContent = "Правильно!";
                document.getElementById("interactive").style.backgroundColor = correctColor; // Изменяет цвет фона
                newColorsButton.textContent = "Играть снова?"; // Изменяем текст кнопки
            } else {
                message.textContent = "Попробуйте еще раз!";
                this.style.backgroundColor = '#f0f0f0'; // Делаем цвет неактивным
            }
        });
    });

    newColorsButton.addEventListener('click', function() {
        document.getElementById("interactive").style.backgroundColor = '#f5f5f5'; // Возвращаем исходный фон
        newColorsButton.textContent = "Новые цвета"; // Возвращаем исходный текст кнопки
        setupGame();
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // Rankings Tabs
    const rankingsTabButtons = document.querySelectorAll('.rankings-tab-button');
    const rankingsTabPanels = document.querySelectorAll('.rankings-tab-panel');

    rankingsTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'active' class from all buttons and panels
            rankingsTabButtons.forEach(btn => btn.classList.remove('active'));
            rankingsTabPanels.forEach(panel => panel.classList.remove('active'));

            // Add 'active' class to the clicked button
            this.classList.add('active');

            // Show the corresponding panel
            const targetTab = this.dataset.tab;
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // Toggle Auth
    const authToggle = document.querySelector('.auth-toggle');
    const floatingAuth = document.querySelector('.floating-auth');

    authToggle.addEventListener('click', function() {
        floatingAuth.classList.toggle('open');
    });
});
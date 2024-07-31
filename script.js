



document.addEventListener('DOMContentLoaded', () => {
    const bosses = [
        { name: "Циклоп-олень", imgSrc: "./img/ice.webp", url: "./cyklop.html" },
        { name: "Єнт", imgSrc: "./img/ent.webp" },
        { name: "Королева павуків", imgSrc: "./img/spider.webp" },
        { name: "Ведмідь-барсук", imgSrc: "./img/borsuk.webp", url: "./Borsuk.html" },
        { name: "Око Жаху", imgSrc: "./img/glaz.webp", url: "./glaz.html" },
        { name: "Пчелина матка", imgSrc: "./img/bee.webp" },
        { name: "Драконья муха", imgSrc: "./img/mucha.webp" },
        { name: "Лось/Гусь", imgSrc: "./img/losGus.webp" }
    ];

    const food = [
        { name: "Медові наггетси", imgSrc: "./img/nugets.webp", url: "./mednugets.html" },
        { name: "Вареники", imgSrc: "./img/vareniki.webp", url: "./Vareniki.html" },
        { name: "Яйця з беконом", imgSrc: "./img/jajca.webp" },
        { name: "Тефтелі", imgSrc: "./img/tefteli.webp" },
        { name: "Монстро-лазанья", imgSrc: "./img/lazania.webp" },
        { name: "Вафлі", imgSrc: "./img/wafels.webp" , url: "./vafli.html"},
        { name: "Звичайний омлет", imgSrc: "./img/amlet.webp" },
        { name: "Медовий рулет", imgSrc: "./img/medowyj.webp" }
    ];

    const gameplay = [
        { name: "Інструменти", imgSrc: "./img/instru.webp", url: "./instrument.html" },
        { name: "Освітлення", imgSrc: "./img/ogon.webp" ,url: "./swet.html"},
        { name: "Матеріали", imgSrc: "./img/materials.webp" ,url: "./material.html"},
        { name: "Наука", imgSrc: "./img/nauka.webp" },
        { name: "Бій", imgSrc: "./img/boj.webp" },
        { name: "Морське", imgSrc: "./img/more.webp" },
        { name: "Магія", imgSrc: "./img/magia.webp" ,url: "./magia.html"},
        { name: "Одяг", imgSrc: "./img/odezda.webp" }
    ];

    const characters = [
        { name: "Уилсон", imgSrc: "./img/цшдіщт.webp", url: "./wilson.html"},
        { name: "Уиллоу", imgSrc: "./img/wilow.webp",url: "./wilow.html" },
        { name: "Вольфганг", imgSrc: "./img/wolfgang.webp" },
        { name: "Венді", imgSrc: "./img/wendy.webp" , url: "./wendy.html"},
        { name: "WX-78", imgSrc: "./img/wx-78.webp" },
        { name: "Вуді", imgSrc: "./img/woody.webp" },
        { name: "Вєббер", imgSrc: "./img/webber.webp" },
        { name: "Вєс", imgSrc: "./img/wes.webp" }
    ];

    const items = [...bosses, ...food, ...gameplay, ...characters];

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    function createBox(item) {
        const box = document.createElement('div');
        box.classList.add('box');
    
        const img = document.createElement('img');
        img.classList.add('boxImg');
        img.src = item.imgSrc;
        img.alt = item.name;
    
        const p = document.createElement('p');
        p.classList.add('boxP');
        p.textContent = item.name;
    
        const link = document.createElement('a');
        link.href = item.url || "#";
    
        const heartIcon = document.createElement('span');
        heartIcon.classList.add('heart-icon', favorites.some(fav => fav.name === item.name) ? 'fas' : 'far', 'fa-heart');
    
        heartIcon.addEventListener('click', () => {
            if (heartIcon.classList.contains('far')) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                addToFavorites(item);
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                removeFromFavorites(item);
            }
        });
    
        link.appendChild(img);
        link.appendChild(p);
        box.appendChild(link);
        box.appendChild(heartIcon);
    
        return box;
    }

    function populateSection(sectionClass, data) {
        const section = document.querySelector(sectionClass);
        section.innerHTML = '';
        data.forEach(item => {
            const box = createBox(item);
            section.appendChild(box);
        });
    }

    function addToFavorites(item) {
        favorites.push(item);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        populateSection('.favorites-boxes', favorites);
    }

    function removeFromFavorites(item) {
        favorites = favorites.filter(fav => fav.name !== item.name);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        populateSection('.favorites-boxes', favorites);
    }

    populateSection('.bosses', bosses);
    populateSection('.food', food);
    populateSection('.gameplay', gameplay);
    populateSection('.characters', characters);
    populateSection('.favorites-boxes', favorites);

    const searchIcon = document.getElementById('search-icon');
    const modal = document.getElementById('search-modal');
    const closeModal = document.querySelector('.close');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchIcon.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    searchInput.addEventListener('keyup', function() {
        const query = searchInput.value.toLowerCase().trim();
        searchResults.innerHTML = '';
    
        if (query === '') {
            items.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('search-result-item');
                div.textContent = item.name;

                if (item.url) {
                    div.addEventListener('click', () => {
                        window.location.href = item.url;
                    });
                }

                searchResults.appendChild(div);
            });
        } else {
            const filteredItems = items.filter(item => item.name.toLowerCase().includes(query));
            filteredItems.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('search-result-item');
                div.textContent = item.name;

                if (item.url) {
                    div.addEventListener('click', () => {
                        window.location.href = item.url;
                    });
                }

                searchResults.appendChild(div);
            });
        }
    });

    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        const boxes = section.querySelector(".boxes");
        const pagination = section.querySelector(".pagination");

        let currentPage = 1;
        const cardsPerPage = 4;
        const totalCards = boxes.children.length;

        const totalPages = Math.ceil(totalCards / cardsPerPage);

        function showPage(page) {
            const startIndex = (page - 1) * cardsPerPage;
            const endIndex = startIndex + cardsPerPage;

            for (let i = 0; i < totalCards; i++) {
                if (i >= startIndex && i < endIndex) {
                    boxes.children[i].style.display = "block";
                } else {
                    boxes.children[i].style.display = "none";
                }
            }

            pagination.querySelectorAll("button").forEach(button => {
                button.classList.remove("active");
            });

            pagination.querySelector(`button[data-page="${page}"]`).classList.add("active");
        }

        function setupPagination() {
            pagination.innerHTML = "";

            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement("button");
                pageButton.innerText = i;
                pageButton.setAttribute("data-page", i); 
                pageButton.addEventListener("click", function() {
                    currentPage = i;
                    showPage(currentPage);
                });
                pagination.appendChild(pageButton);
            }

            showPage(currentPage);
        }

        setupPagination();
    });
});
function openModal() {
    const modal = document.getElementById('modal2');
    modal.style.display = 'block';
    setTimeout(function() {
        modal.style.width = '30%';
    }, 10); // Add a small delay to trigger the transition
}

function closeModal() {
    const modal = document.getElementById('modal2');
    modal.style.width = '0';
    setTimeout(function() {
        modal.style.display = 'none';
    }, 500); // Duration matches the CSS transition
}



    document.addEventListener('DOMContentLoaded', function() {
        const burgerMenu = document.getElementById('burger-menu');
        const nav = document.querySelector('nav');

        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('open');
            nav.classList.toggle('open');
        });
    });


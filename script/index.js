const apiUser = '15026491-72ae33916ee3ad02a9a7bc84b';
const filtersCategory = ['nature', 'places', 'animals', 'travel', 'backgrounds'];
const imgType = 'photo'

const container = document.querySelector('.container');
const select = document.querySelector('.categories');

select.addEventListener('click', () => {
    const selectValue = select.value
    container.innerHTML = ''
    buscarImagens(selectValue);
});

async function buscarImagens(caterogy) {
    const linkApi = `https://pixabay.com/api/?key=${apiUser}&q=${encodeURIComponent(caterogy)}&${encodeURIComponent(imgType)}`;
    
    try {
        const response = await fetch(linkApi);
        const data = await response.json();

        const imgsLink = data.hits.map( imagem => imagem.webformatURL)

        imgsLink.forEach(link => {
            container.appendChild(iterarLinks(link))
        });

    } catch(error) {
        console.error("Erro ao buscar imagens:", error);
        return [];
    }
}

function iterarLinks (link) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.setAttribute('src', link);

    div.classList.add('cardImg');
    div.appendChild(img)

    return div;
}

function filtros () {
    const categories = document.querySelector('.categories');
    for (const filtro of filtersCategory) {
        const option = document.createElement('option');

        option.setAttribute('value', filtro);
        option.innerHTML = filtro.toUpperCase();
        categories.appendChild(option);
    }
}
filtros()


const containerBackgroundImg = document.querySelector('.containerBackgroundImg');
containerBackgroundImg.addEventListener('click', e => {
    if(e.target.attributes['class'].value === "containerBackgroundImg") {
        e.target.style.display = "none";
    }
})

const largeImg = document.querySelector('.largeImg');
document.addEventListener('click', e => {
    if (e.target.tagName.toUpperCase() === 'IMG') {
        const link = e.target.attributes['src'].value

        containerBackgroundImg.style.display = "flex";
        aplicaBackground(link, largeImg)
    }
})

document.addEventListener('keydown', e => {
    if(e.key === "Escape") {
        containerBackgroundImg.style.display = "none";
    }
})

const buttonClose = document.querySelector('.buttonClose');
buttonClose.addEventListener('click', () => {
    containerBackgroundImg.style.display = "none"
})

function aplicaBackground(link, elemento) {
    elemento.style.background = '';
    elemento.style.background = `url(${link})`
    elemento.classList.add('backgroundAplication');
}
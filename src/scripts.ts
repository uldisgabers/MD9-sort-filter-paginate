import axios from 'axios';

const tableWrapper = document.querySelector<HTMLTableElement>('.table-wrapper');
const tableBody = document.querySelector<HTMLTableColElement>('.table-body');

type Country = {
  name: string;
  capital: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  language: {
    name: string;
  };
}

let maxItems = 20;
let sorter = '_sort=name&_order=asc';
let loadThisMuchMore = `&_start=${maxItems - 20}&_end=${maxItems}`;
let countryAPI = `http://localhost:3004/countries?${sorter}${loadThisMuchMore}`;

// Draw countries
const drawCountry = () => {
  axios.get<Country[]>(`http://localhost:3004/countries?${sorter}${loadThisMuchMore}`).then(({ data }) => {
    data.forEach((country) => {
      tableBody.innerHTML += `
        <tr>
          <td>${country.name}</th>
          <td>${country.capital}</td>
          <td>${country.currency.name}</td>
          <td>${country.language.name}</td>
        </tr>
      `;
    });
  });
};

// Get API length
const lengthOfAPI = (): Promise<number> => axios.get('http://localhost:3004/countries')
  .then((response) => response.data.length);

// Load more button
const loadMoreBtn = document.querySelector<HTMLButtonElement>('.load-more-button');

loadMoreBtn.addEventListener('click', () => {
  if (maxItems <= 233) {
    maxItems += 20;
    // countryAPI = `http://localhost:3004/countries?_start=${maxItems - 20}&_end=${maxItems}`;
    loadThisMuchMore = `&_start=${maxItems - 20}&_end=${maxItems}`;
    drawCountry();
  } else {
    loadMoreBtn.style.display = 'none';
  }
});

// DESC un ASC pogas priekš name
const sortNameDescButton = document.querySelector('.sort-name-desc');
const sortNameAscButton = document.querySelector('.sort-name-asc');

sortNameDescButton.addEventListener('click', () => {
  tableBody.innerHTML = '';
  // countryAPI = `http://localhost:3004/countries?_sort=name&_order=desc`;
  sorter = '_sort=name&_order=desc';
  // countryAPI += sorter;
  drawCountry();
});

sortNameAscButton.addEventListener('click', () => {
  tableBody.innerHTML = '';
  // countryAPI = 'http://localhost:3004/countries?_sort=name&_order=asc';
  sorter = '_sort=name&_order=asc';
  drawCountry();
});

// DESC un ASC priekš capital

const sortCapitalDescButton = document.querySelector('.sort-capital-desc');
const sortCapitalAscButton = document.querySelector('.sort-capital-asc');

sortCapitalDescButton.addEventListener('click', () => {
  tableBody.innerHTML = '';
  // countryAPI = 'http://localhost:3004/countries?_sort=capital&_order=desc';
  sorter = '_sort=capital&_order=desc';
  drawCountry();
});

sortCapitalAscButton.addEventListener('click', () => {
  tableBody.innerHTML = '';
  // countryAPI = 'http://localhost:3004/countries?_sort=capital&_order=asc';
  sorter = '_sort=capital&_order=asc';
  drawCountry();
});

// DESC un ASC priekš currency

const sortCurrencyDescButton = document.querySelector('.sort-currency-desc');
const sortCurrencyAscButton = document.querySelector('.sort-currency-asc');

sortCurrencyDescButton.addEventListener('click', () => {
  tableBody.innerHTML = '';
  // countryAPI = 'http://localhost:3004/countries?_sort=currency.name&_order=desc';
  sorter = '_sort=currency.name&_order=desc';
  drawCountry();
});

sortCurrencyAscButton.addEventListener('click', () => {
  tableBody.innerHTML = '';
  // countryAPI = 'http://localhost:3004/countries?_sort=currency.name&_order=asc';
  sorter = '_sort=currency.name&_order=asc';
  drawCountry();
});

// DESC un ASC priekš language

const sortLanguageDescButton = document.querySelector('.sort-language-desc');
const sortLanguageAscButton = document.querySelector('.sort-language-asc');

sortLanguageDescButton.addEventListener('click', () => {
  tableBody.innerHTML = '';
  // countryAPI = 'http://localhost:3004/countries?_sort=language.name&_order=desc';
  sorter = '_sort=language.name&_order=desc';
  drawCountry();
});

sortLanguageAscButton.addEventListener('click', () => {
  tableBody.innerHTML = '';
  // countryAPI = 'http://localhost:3004/countries?_sort=language.name&_order=asc';
  sorter = '_sort=language.name&_order=asc';
  drawCountry();
});

// Search by name

drawCountry();

import axios from 'axios';

const tableBody = document.querySelector<HTMLTableColElement>('.table-body-js');

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
let searchThisName = ``;

// Draw countries
const drawCountry = () => {
  axios.get<Country[]>(`http://localhost:3004/countries?${sorter}${loadThisMuchMore}${searchThisName}`).then(({ data }) => {
    data.forEach((country) => {
      let currencySymbol = country.currency.symbol;
      if (country.currency.symbol == null) {
        currencySymbol = '';
      }

      tableBody.innerHTML += `
        <tr>
          <td>${country.name}</th>
          <td>${country.capital}</td>
          <td>${currencySymbol} ${country.currency.name}</td>
          <td>${country.language.name}</td>
        </tr>
      `;
    });
  });
};

// Get API length
// const lengthOfAPI = (): Promise<number> => axios.get('http://localhost:3004/countries')
//   .then((response) => response.data.length);

// Load more button
const loadMoreBtn = document.querySelector<HTMLButtonElement>('.load-more-button-js');

loadMoreBtn.addEventListener('click', () => {
  if (maxItems <= 233) {
    maxItems += 20;
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
  sorter = '_sort=name&_order=desc';
  drawCountry();
});

sortNameAscButton.addEventListener('click', () => {
  tableBody.innerHTML = '';
  sorter = '_sort=name&_order=asc';
  drawCountry();
});

// DESC un ASC priekš capital
const sortCapitalDescButton = document.querySelector('.sort-capital-desc');
const sortCapitalAscButton = document.querySelector('.sort-capital-asc');

sortCapitalDescButton.addEventListener('click', () => {
  tableBody.innerHTML = '';
  sorter = '_sort=capital&_order=desc';
  drawCountry();
});

sortCapitalAscButton.addEventListener('click', () => {
  tableBody.innerHTML = '';
  sorter = '_sort=capital&_order=asc';
  drawCountry();
});

// DESC un ASC priekš currency
const sortCurrencyDescButton = document.querySelector('.sort-currency-desc');
const sortCurrencyAscButton = document.querySelector('.sort-currency-asc');

sortCurrencyDescButton.addEventListener('click', () => {
  tableBody.innerHTML = '';
  sorter = '_sort=currency.name&_order=desc';
  drawCountry();
});

sortCurrencyAscButton.addEventListener('click', () => {
  tableBody.innerHTML = '';
  sorter = '_sort=currency.name&_order=asc';
  drawCountry();
});

// DESC un ASC priekš language

const sortLanguageDescButton = document.querySelector('.sort-language-desc');
const sortLanguageAscButton = document.querySelector('.sort-language-asc');

sortLanguageDescButton.addEventListener('click', () => {
  tableBody.innerHTML = '';
  sorter = '_sort=language.name&_order=desc';
  drawCountry();
});

sortLanguageAscButton.addEventListener('click', () => {
  tableBody.innerHTML = '';
  sorter = '_sort=language.name&_order=asc';
  drawCountry();
});

// Search by name
const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  tableBody.innerHTML = '';

  // country name
  const nameSearch = document.querySelector<HTMLInputElement>('input[name="name"]');
  const nameSearchValue = nameSearch.value;

  if (nameSearchValue) {
    searchThisName = `&name_like=${nameSearchValue}`;
  }

  // capital name
  const capitalSearch = document.querySelector<HTMLInputElement>('input[name="capital"]');
  const capitalSearchValue = capitalSearch.value;

  if (capitalSearchValue) {
    searchThisName = `&capital_like=${capitalSearchValue}`;
  }

  // currency name
  const currencySearch = document.querySelector<HTMLInputElement>('input[name="currency"]');
  const currencySearchValue = currencySearch.value;

  if (currencySearchValue) {
    searchThisName = `&currency.name_like=${currencySearchValue}`;
  }

  // language name
  const languageSearch = document.querySelector<HTMLInputElement>('input[name="language"]');
  const languageSearchValue = languageSearch.value;

  if (languageSearchValue) {
    searchThisName = `&language.name_like=${languageSearchValue}`;
  }

  drawCountry();
});

drawCountry();

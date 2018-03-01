const fetchMovies = async e => {
  let response = await fetch(
    `http://www.omdbapi.com/?i=tt3896198&apikey=f33eeb6&s=${
      e.target.elements[0].value
    }`
  );
  let json = await response.json();

  return json;
};

const createMovieList = search => {
  let ul = document.querySelector('ul');

  search.map(movie => {
    let li = document.createElement('li');
    let a = document.createElement('a');
    let btn = document.createElement('button');

    a.setAttribute('href', `https://www.imdb.com/title/${movie.imdbID}`);
    a.text = movie.Title;
    btn.innerText = 'Favorite';
    li.appendChild(a);
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

const postFavorites = async e => {
  let data = {
    name: e.target.previousSibling.text,
    oid: e.target.previousSibling.href.split('/')[4]
  };
  let headers = new Headers({
    'Content-Type': 'application/json'
  });

  let response = await fetch('/favorites', {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  let json = response.json();
  return json;
};

const listenToPost = () => {
  let btns = document.querySelectorAll('button');

  for (let btn of btns) {
    btn.addEventListener('click', postFavorites);
  }
};

const onSubmit = event => {
  fetchMovies(event).then(json => {
    let search = json.Search;
    createMovieList(search);

    listenToPost();
  });
  event.preventDefault();
  event.target.reset();
};

const listenToSubmitForm = () => {
  let form = document.querySelector('form');
  form.addEventListener('submit', onSubmit);
};

listenToSubmitForm();

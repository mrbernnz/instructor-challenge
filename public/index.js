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
  let main = document.querySelector('main');
  let ul = document.createElement('ul');
  ul.setAttribute('class', 'movies collection');
  main.appendChild(ul);

  search.map(movie => {
    let li = document.createElement('li');
    let a = document.createElement('a');
    let img = document.createElement('img');
    let btn = document.createElement('button');
    let i = document.createElement('i');

    img.setAttribute('src', movie.Poster);
    img.setAttribute('alt', 'Movie Poster');
    img.setAttribute('class', 'circle');
    a.setAttribute('href', `https://www.imdb.com/title/${movie.imdbID}`);
    a.setAttribute('class', `title`);
    a.text = movie.Title;
    btn.setAttribute(
      'class',
      'btn-floating btn-large waves-effect waves-light blue secondary-content'
    );
    i.setAttribute('class', 'material-icons');
    i.innerText = 'grade';
    li.setAttribute('class', 'collection-item');

    btn.appendChild(i);
    li.appendChild(img);
    li.appendChild(a);
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

const postFavorites = async e => {
  console.log(e.target.parentElement);

  let data = {
    oid: e.target.parentElement.previousSibling.href.split('/')[4],
    name: e.target.parentElement.previousSibling.text
  };
  let headers = new Headers({
    'Content-Type': 'application/json'
  });

  let response = await fetch('/favorites', {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  let json = await response.json();
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

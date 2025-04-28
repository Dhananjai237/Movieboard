fetch('header.html')
    .then(response => {
        // console.log(response);
        return response.text();
    })
    .then(data => {
        // console.log(data);
        document.body.insertAdjacentHTML('afterbegin', data);

    })
    .catch(error => {
        alert(`can't fetch header file`);
    })

let infiniteMovies = function(page, films='Films', year='Year', genre_id='', Api_key = '9780d3ceee590a40bd3446da3f81171d') {
    console.log(page, films, year, genre_id);
    let promise;
    if (films !== 'Films' && year == 'Year' && genre_id == '') {
        promise = fetch(`https://api.themoviedb.org/3/movie/${films}?api_key=${Api_key}&region=IN&language=en-IN&page=${page}`);
    };
    if (films == 'Films' && year !== 'Year' && genre_id == '') {
        startYear = parseInt(year);
        endYear = startYear + 9;
        promise = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${Api_key}&language=en-IN&primary_release_date.gte=${parseInt(year)}-01-01&primary_release_date.lte=${endYear}-12-31&page=${page}`);
    };
    if (films == 'Films' && year == 'Year' && genre_id !== '') {
        promise = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${Api_key}&language=en-IN&region=IN&with_genres=${genre_id}&page=${page}`);
    };
    if (films == 'Films' && year !== 'Year' && genre_id !== '') {
        startYear = parseInt(year);
        endYear = startYear + 9;
        promise = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${Api_key}&language=en-IN&region=IN&with_genres=${genre_id}&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31&page=${page}`);
    }
    promise
        .then(function(response) {
            // console.log(response);
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            return data.results;
        })
        .then(function(movies) {
            space = document.querySelector('article');
            movies.forEach(movie => {
                const html = `
                <div id="${movie.id}" onClick="open_page(event)">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="movie">
                    <p class="title_caption">${movie.title}</p>
                </div>
                `;
                space.insertAdjacentHTML('beforeEnd', html);
            });
        })
        .catch(error => {
            alert(`check your internet`);
        });
};

let films = 'Films';
let genre_id = '';
let year = 'Year';
let startYear;
let endYear;
let page;

films = 'popular';
page = 1;
infiniteMovies(page, films);

document.querySelector('#load').addEventListener('click', () => {
    page = page + 1;
    infiniteMovies(page, films, year, genre_id);
});

let genreMap = {};

fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=9780d3ceee590a40bd3446da3f81171d&language=en-IN`)
    .then(function(response) {
        // console.log(response);
        return response.json();
    })
    .then(function(data) {
        // console.log(data);
        // console.log(data.genres);
        return data.genres;
    })
    .then(function(genres) {
        genres.forEach(genre => {
            genreMap[genre.name] = genre.id;
        })
    })

// console.log(genreMap);

document.querySelector('form button').addEventListener('click', () => {
    document.querySelector('#load').classList.remove('display');
    films = document.getElementById('films').value;
    let genre = document.getElementById('genre').value;
    year = document.getElementById('year').value;
    console.log(films, genre, year);
    if (films == 'Films' && genre == 'Genre' && year == 'Year') {
        alert('Select valid options for browsing')
    }
    else {
        if (genre == 'Genre' && year == 'Year') {
            document.querySelector('article').innerHTML = '';
            page = 1;
            infiniteMovies(page, films, year);   
        }
        else if (films == 'Films') {
            document.querySelector('article').innerHTML = '';
            page = 1;
            if (year == 'Year') {
                genre_id = genreMap[genre];
                infiniteMovies(page, films, year, genre_id);
            }
            else if (genre == 'Genre') {
                infiniteMovies(page, films, year);
            }
            else {
                genre_id = genreMap[genre];
                infiniteMovies(page, films, year, genre_id);
            }
        }
        else {
            alert('Selected filter is not available');
        };
    };
});

let getMovie = function(title, Api_key = '9780d3ceee590a40bd3446da3f81171d') {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&query=${encodeURIComponent(title)}&language=en-IN`)
        .then(function(response) {
            // console.log(response);
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            // console.log(data.results);
            if (data.results.length != 0) {
                document.querySelector('article').innerHTML = '';
                document.querySelector('#load').classList.add('display');
                return data.results;
            }
            else {
                throw new Error('Invalid input');
            }
            
        })
        .then(function(movies) {
            space = document.querySelector('article');
            movies.forEach(movie => {
                if (movie.poster_path !== null) {
                    const html = `
                    <div id="${movie.id}" onClick="open_page(event)">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="movie">
                        <p class="title_caption">${movie.title}</p>
                    </div>
                    `;
                    space.insertAdjacentHTML('beforeEnd', html);
                };
            });
        })
        .catch(error => {
            console.log(error);
            if (error.message === 'Invalid input') {
                alert('Invalid input');
            }
            else {
                alert(`check your internet`);
            }
        });
};

document.querySelector('form input').addEventListener('keypress', (event) => {
    event.preventDefault();
    // console.log(event);
    if (event.key == 'Enter') {
        let title = document.querySelector('form input').value;
        document.querySelector('form input').value = '';
        getMovie(title);
    }
    else {
        document.querySelector('form input').value += event.key;
    }
});

let open_page = function(event) {
    // console.log(event);
    // console.log(event.srcElement);
    // console.log(event.srcElement.id);
    let movie_id;
    if (event.srcElement.id == '') {
        console.log(event.srcElement.parentElement);
        movie_id = event.srcElement.parentElement.id;
        // console.log(movie_id);
    }
    else {
        movie_id = event.srcElement.id;
    }
    window.location.href=`details.html?id=${movie_id}`;
};
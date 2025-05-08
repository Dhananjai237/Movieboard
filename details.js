// extracting movie_id
const urlParams = new URLSearchParams(window.location.search);
const movie_id = urlParams.get('id');
// console.log(urlParams, movie_id);
Api_key = '9780d3ceee590a40bd3446da3f81171d';

// movie details
fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-IN`)
    .then(response => {
        // console.log(response);
        return response.json();
    })
    .then(data => {

        // console.log(data);
        // console.log(data.backdrop_path);
        // console.log(data.poster_path);
        // console.log(data.title);
        // console.log(data.release_date);
        // console.log(data.adult);
        // console.log(data.tagline);
        // console.log(data.overview);
        // console.log(data.runtime);
        // console.log(data.vote_average);          
        // console.log(data.genres);   
        // console.log(data.spoken_languages);

        // movie backdrop
        if (data.backdrop_path) {
            document.querySelector('#backdrop img').src = `https://image.tmdb.org/t/p/w500${data.backdrop_path}` ;
        }

        // movie poster
        document.querySelector('#details img').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;

        // movie title
        // console.log(data.title.length);
        let title;
        if (data.title.length > 40) {
            title = data.title.slice(0, 40) + '...';
        }
        else {
            title = data.title;
        }
        document.querySelector('#details article:first-of-type h1').textContent = title;

        // movie year
        document.querySelector('#details article:first-of-type div h4').textContent = data.release_date.split('-')[0];
        
        // movie 18+ rating
        document.querySelector('#details article:first-of-type div h5').textContent = data.adult?'A+':'UA';
        
        // movie tagline
        document.querySelector('#details article:first-of-type h6').textContent = data.tagline?data.tagline:'Just watch it';
        
        // movie overview
        // console.log(data.overview.length)
        let overview;
        if (data.overview.length > 220) {
            overview = data.overview.slice(0, 220) + '...';
        }
        else {
            overview = data.overview;
        }
        // console.log(overview);
        document.querySelector('#details article:first-of-type p').textContent = overview;
        
        // movie runtime
        document.querySelector('#runtime').textContent = data.runtime?`${Math.trunc(data.runtime/60)}h ${data.runtime%60}m`:'.....';
        
        // movie rating
        let rate;
        if (data.vote_average) {
            let rating = Math.trunc(data.vote_average/2);
            if (rating == 1) {
                rate = '★';
            }
            else if (rating == 2) {
                rate = '★★';
            }
            else if (rating == 3) {
                rate = '★★★';
            }
            else if (rating == 4) {
                rate = '★★★★';
            }
            else if (rating == 5) {
                rate = '★★★★★';
            }
        };
        document.querySelector('#rating').textContent = data.vote_average?rate:'.....';
        
        // movie genres
        let genres = '';
        if (data.genres) {
            data.genres.forEach(genre => {
                genres = genres + genre.name + ' ';
            });
        }
        document.querySelector('#genre').textContent = data.genres.length>0?genres:'.....';
        
        // movie languages
        let languages = '';
        data.spoken_languages.forEach(lang => {
            languages = languages + lang.english_name + ' ';
        });
        document.querySelector('#languages').textContent = data.spoken_languages>0?languages:'.....';
    })
    .catch(error => {
        alert(`check your internet`);
    });

// movie director
fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}`)
    .then(response => {
        // console.log(response);
        return response.json();
    })
    .then(data => {
        // console.log(data);
        // console.log(data.crew);
        return data.crew;
    })
    .then(crew => {
        let director = crew.find(credits => credits.job == 'Director');
        // console.log(director);
        document.querySelector('#director').textContent = director?director.name:'.....';
    })

// movie streaming platforms
fetch(`https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${Api_key}`)
    .then(response => {
        // console.log(response);
        return response.json();
    })
    .then(data => {
        // console.log(data);
        // console.log(data.results);
        // console.log(data.results['IN']);
        return data.results['IN']['flatrate'];
    })
    .then(platforms => {
        // console.log(platforms);
        let providers = '';
        platforms.forEach(platform => {
            // console.log(platform);
            // console.log(platform.provider_name);
            providers = providers + platform.provider_name + ' ';
        });
        document.querySelector('#streaming').textContent = providers;
    })
    .catch(error => {
        document.querySelector('#streaming').textContent = '.....';
    })

// movie trailer
document.querySelector('#details article:first-of-type button').addEventListener('click', () => {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${Api_key}&language=en-IN`)
    .then(response => {
        // console.log(response);
        return response.json();
    })
    .then(data => {
        // console.log(data);
        // console.log(data.results);
        let trailer = data.results.find(video => video.type == 'Trailer' && video.site == 'YouTube');
        // console.log(trailer);
        return trailer;
    })
    .then(trailer => {
        if (trailer) {
            // console.log(trailer.key);
            window.open(`https://www.youtube.com/watch?v=${trailer.key}`);
        }
        else {
            throw new Error('No Trailer Found');
        } 
    })
    .catch(error => {
        if (error.message === 'No Trailer Found') {
            alert(error);
        }
        else {
            alert(`check your internet`);
        }
    })
});

// opening wikipedia
let open_wikipedia = function(event) {
    // console.log(event);
    // console.log(event.srcElement);
    // console.log(event.srcElement.id);
    let name;
    if (event.srcElement.id == '') {
        // console.log(event.srcElement.parentElement);
        name = event.srcElement.parentElement.id;
    }
    else {
        name = event.srcElement.id;
    }
    // console.log(actor_name);
    window.open(`https://en.wikipedia.org/wiki/Special:Search?search=${name}`);      
}

// options for intersection Api
const lookOptions = {
    root: null,
    threshold: 0.05
};

// movie cast using intersection api
let movie_cast = function(entries) {
    // console.log(entries);
    let [entry] = entries;
    // console.log(entry);
    if (entry.isIntersecting === true) {
        fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}`)
            .then(response => {
                // console.log(response);
                return response.json();
            })
            .then(data => {
                // console.log(data);
                return data.cast;
            })
            .then(actors => {
                // console.log(actors);
                if (actors.length>0) {
                    actors.forEach(actor => {
                        // console.log(actor);
                        let html = `
                        <div id="${actor.name}" onclick="open_wikipedia(event)">
                            <img src="https://image.tmdb.org/t/p/w500${actor.profile_path}">
                            <h6>${actor.name}</h6>
                        </div>
                        `;
                        document.querySelector('#cast article').insertAdjacentHTML('beforeEnd', html);
                    })     
                    looking_cast.unobserve(cast_space);
                }
                else {
                    document.querySelector('#cast').style.display = 'none';
                };
            })
            .catch(error => {
                alert(`check your internet`)
            })
        
    };
};

// observing cast for movie cast details
const looking_cast = new IntersectionObserver(movie_cast, lookOptions);
let cast_space = document.querySelector('#cast h1');
looking_cast.observe(cast_space);

// movie crew using intersection api
let movie_crew = function(entries) {
    // console.log(entries);
    let [entry] = entries;
    // console.log(entry);
    if (entry.isIntersecting === true) {
        fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}`)
            .then(response => {
                // console.log(response);
                return response.json();
            })
            .then(data => {
                // console.log(data);
                return data.crew;
            })
            .then(crew => {
                // console.log(crew);
                if (crew.length>0) {
                    crew.forEach(person => {
                        // console.log(person);
                        let html = `
                        <div id="${person.name}" onclick="open_wikipedia(event)">
                            <img src="https://image.tmdb.org/t/p/w500${person.profile_path}">
                            <h6>${person.name}</h6>
                        </div>
                        `;
                        document.querySelector('#crew article').insertAdjacentHTML('beforeEnd', html);
                    })  
                    looking_crew.unobserve(crew_space); 
                }
                else {
                    document.querySelector('#crew').style.display = 'none';
                };
            })
            .catch(error => {
                alert(`check your internet`)
            })
    };
};

// observing cast for movie cast details
const looking_crew = new IntersectionObserver(movie_crew, lookOptions);
let crew_space = document.querySelector('#crew h1');
looking_crew.observe(crew_space);

// movie similar films using intersection Api
let movie_similar = function(entries) {
    // console.log(entries);
    [entry] = entries;
    // console.log(entry);
    if (entry.isIntersecting == true) {
        fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${Api_key}&language=en-IN`)
            .then(response => {
                // console.log(response);
                return response.json();
            })
            .then(data => {
                // console.log(data);
                // console.log(data.results);
                return data.results;
            })
            .then(movies => {
                if (movies.length>0) {
                    movies.forEach(movie => {
                        // console.log(movie);
                        let html = `
                        <div id="${movie.id}" onclick="open_page(event)">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                            <h6>${movie.title}</h6>
                        </div>
                        `;
                        document.querySelector('#similar article').insertAdjacentHTML('beforeEnd', html);
                    });
                    looking_similar.unobserve(similar_space);
                }
                else {
                    document.querySelector('#similar').style.display = 'none';
                }
            })
            .catch(error => {
                alert(`check your internet`)
            })
    };
};

// observing similar for movie similar films details
const looking_similar = new IntersectionObserver(movie_similar, lookOptions);
let similar_space = document.querySelector('#similar h1');
looking_similar.observe(similar_space);

// opening details page for similar films
let open_page = function(event) {
    // console.log(event);
    // console.log(event.srcElement);
    // console.log(event.srcElement.id);
    let similar_movie_id;
    if (event.srcElement.id == '') {
        // console.log(event.srcElement.parentElement);
        similar_movie_id = event.srcElement.parentElement.id;
        // console.log(movie_id);
    }
    else {
        similar_movie_id = event.srcElement.id;
    }
    window.location.href=`details.html?id=${similar_movie_id}`;
};

// adding movie to users_data table
let add_movie = function(state, button) {
    user_id = localStorage.getItem('user_id');
    if (user_id) {
        console.log(user_id, movie_id, state);
        fetch('http://localhost:8001/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_id, movie_id, state})
        })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.message === 'success') {
                    if (button.textContent === '🍿Watchlist') {
                        button.textContent = '❌Remove';
                    }
                    else if (button.textContent === '🎬Watch') {
                        button.textContent = '✔️watched';
                    }
                    button.classList.add('added');
                }
            })
            .catch(error => {
                alert('Unable to connect server');
            })
    }
    else {
        window.location.href = "login.html"
    };
};

// deleting movie from users_data
let delete_movie = function(state, button) {
    user_id = localStorage.getItem('user_id');
    if (user_id) {
        console.log(user_id, movie_id);
        fetch('http://localhost:8001/remove', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_id, movie_id, state})
        })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.message === 'success') {
                    if (button.textContent === '❌Remove') {
                        button.textContent = '🍿Watchlist';
                    }
                    else if (button.textContent === '✔️watched') {
                        button.textContent = '🎬Watch';
                    }
                    button.classList.remove('added');
                }
            })
            .catch(error => {
                alert('Unable to connect server');
            })
    }
    else {
        window.location.href = "login.html"
    };
}

watchlist_button = document.querySelector('#watchlist');
watchlist_button.addEventListener('click', () => {
    state = 'watchlisted';
    if (watchlist_button.textContent === '🍿Watchlist') {
        add_movie(state, watchlist_button);
    }
    else if (watchlist_button.textContent === '❌Remove') {
        delete_movie(state, watchlist_button);
    }
    
});

watch_button = document.querySelector('#watched')
watch_button.addEventListener('click', () => {
    state = 'watched';
    if (watch_button.textContent === '🎬Watch') {
        add_movie(state, watch_button);
    }
    else if (watch_button.textContent === '✔️watched') {
        delete_movie(state, watch_button);
    }
});

// setting buttons status
user_id = localStorage.getItem('user_id');
    if (user_id) {
        console.log(user_id, movie_id);
        fetch('http://localhost:8001/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user_id, movie_id})
        })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.message === 'success') {
                    if (data.result.length !== 0) {
                        for (let res of data.result) {
                            console.log(res[0]);
                            if (res == 'watchlisted') {
                                watchlist_button.textContent = '❌Remove';
                                watchlist_button.classList.add('added');
                            }
                            else if (res == 'watched') {
                                watch_button.textContent = '✔️watched';
                                watch_button.classList.add('added');
                            }
                        }
                    }
                }
            })
    }

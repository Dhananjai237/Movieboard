if (window.innerWidth < 1024) {
    document.open();
    document.write(`
        <body style="background-color: #14181c">
            <section 
                style="color: #9ab; font-size: 1rem; font-weight: 200; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    text-align: center; margin-top: 15rem;"
            >
                This site is best viewed on a desktop
            </section>
        </body>`
    );
    document.close();
    throw new Error('Stoped execution');
  }
fetch('header.html')
    .then((response) => {
        // console.log(response);
        return response.text();
    })
    .then((data) => {
        // console.log(data);
        document.body.insertAdjacentHTML('afterbegin', data);

    })
    .catch(error => {
        alert(`can't fetch header file`);
    })


let recommendedFilms = function(Api_key = '9780d3ceee590a40bd3446da3f81171d') {
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${Api_key}&language=en-IN&page=1`)
        .then(function(response) {
            // console.log(response);
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            // console.log(data.results);
            // console.log(data.results.slice(0,5));
            return data.results.slice(0,5);
        })
        .then(function(movies) {
            space = document.getElementById('recommended_container');
            movies.forEach(movie => {
                addCaption(movie, space);
            });
        })
        .catch(error => {
            alert(`check your internet`);
        })
}

let addCaption = function(movie, space, Api_key = '9780d3ceee590a40bd3446da3f81171d') {
    fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${Api_key}&language=en-IN`)
        .then(function(response) {
            // console.log(response);
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            let rating = Math.trunc(data.vote_average/2);
            let rate;
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
            // console.log(data.runtime);
            runTime = `${Math.trunc(data.runtime/60)}h ${data.runtime%60}m`;
            html = `
            <div id="${movie.id}" onClick="open_page(event)">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="movie">
                <p class="caption"><strong>${rate}</strong><span>${runTime}</span></p>
            </div>
            `;
            space.insertAdjacentHTML('beforeEnd', html);
        });
        
};

recommendedFilms();

let newReleases = function(Api_key = '9780d3ceee590a40bd3446da3f81171d') {
    const today = new Date().toISOString().split('T')[0];
    // console.log(today);
    const thirty_days_ago = new Date(new Date() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    // console.log(thirty_days_ago);
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${Api_key}&region=IN&language=en-IN&sort_by=primary_release_date.desc&with_release_type=3&release_date.lte=${today}&release_date.gte=${thirty_days_ago}`)
        .then(function(response) {
            // console.log(response);
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            // console.log(data.results);
            return data.results;
        })
        .then(function(movies) {
            movies.forEach(movie => {
                if (movie.poster_path != null) {
                    const html = `
                    <div id="${movie.id}" onClick="open_page(event)">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="movie">
                        <p class="title_caption">${movie.title}</p>
                    </div>
                    `;
                    document.getElementById('releases_container').insertAdjacentHTML('beforeEnd', html);
                };
            });
        })
};

newReleases();

let popular = function(Api_key = '9780d3ceee590a40bd3446da3f81171d') {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&region=IN&language=en-IN&page=1`)
        .then(function(response) {
            // console.log(response);
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            return data.results;
        })
        .then(function(movies) {
            space = document.getElementById('popular_container')
            movies.forEach(movie => {
                addCaption(movie, space);
            });
        })
};

popular();

left_buttons = document.querySelectorAll('.left');
// console.log(left_buttons);
left_buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        // console.log(event);
        // console.log(event.srcElement);
        space = event.srcElement.nextElementSibling;
        // console.log(space);
        space.scrollBy({left: -196, behaviour: 'smooth'});
    });
});

right_buttons = document.querySelectorAll('.right');
// console.log(right_buttons);
right_buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        // console.log(event);
        // console.log(event.srcElement);
        space = event.srcElement.previousElementSibling;
        // console.log(space);
        space.scrollBy({left:196, behaviour: 'smooth'});
    });
});

let open_page = function(event) {
    // console.log(event);
    // console.log(event.srcElement);
    // console.log(event.srcElement.id);
    let movie_id;
    if (event.srcElement.id == '') {
        console.log(event.srcElement.parentElement);
        movie_id = event.srcElement.parentElement.id;
    }
    else {
        movie_id = event.srcElement.id;
    }
    // console.log(movie_id);
    window.location.href=`details.html?id=${movie_id}`;
};
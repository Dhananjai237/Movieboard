let get_header = function() {
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
};

let watchlisted_movie = function(movie_id, Api_key = '9780d3ceee590a40bd3446da3f81171d') {
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-IN`)
        .then(response => {
            // console.log(response);
            return response.json();
        })
        .then(data => {
            // console.log(data);
            // console.log(data.title);
            // console.log(data.poster_path);
            // console.log(movie_id);
            space = document.querySelector('article');
            const html = `
                <div id="${movie_id}" onClick="open_page(event)">
                    <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="movie">
                    <p class="title_caption">${data.title}</p>
                </div>
                `;
            space.insertAdjacentHTML('beforeEnd', html);
        });
};

let get_watchlist = function(page) {
    fetch('http://localhost:8001/watchlisted', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id, page})
    })
        .then(response => {
            // console.log(response);
            return response.json();
        })
        .then(data => {
            // console.log(data);
            if (data.result.length === 0 && page === 1) {
                document.querySelector('footer').textContent = 'You have not added films to watchlist';
                document.querySelector('#load').classList.add('display');
            }
            else {
                if (data.result.length < 30) {
                    document.querySelector('#load').classList.add('display');
                };
                data.result.forEach(res => {
                    // console.log(res[0]);
                    watchlisted_movie(res[0]);
                });
            }
            
        })
        .catch(err => {
            alert('Unable to connect server')
        })
};

user_id = localStorage.getItem('user_id');
if (user_id) {
    console.log(user_id);
    get_header();
    page = 1;
    get_watchlist(page);
}
else {
    window.location.href = "login.html";
};

document.querySelector('#load').addEventListener('click', () => {
    page = page + 1;
    get_watchlist(page);
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

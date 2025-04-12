# Movieboard
A movie discovery platform with TMDB API integration

1. Technologies Used: HTML, CSS, JavaScript
2. TMDb Integration: Uses TMDb API to fetch real-time movie data.
3. Responsive Design: Optimized for laptop screens only
4. Header Component: A reusable header component is implemented and imported across pages.
5. Pages Implemented:
        1. Home Page: Includes a welcome banner, recommended movies, new releases, popular films that can be clicked to view their details, and a footer with a link to the                         Instagram page and a copyright notice.
        2. Films Page: Displays a wide selection of films that can be clicked to view their details and provides filtering options by genre, release year, top-rated, and                            popularity, along with a search feature to find movies by title. It also includes a "Load More" button to fetch and explore additional pages.
        3. Film Details: Presents comprehensive information about a selected movie, including its cast and crew (with links to their Wikipedia profiles) and a list of                                 similar films that can be clicked to view their details.
6. Pages To Be Implemented:
        1. Login Page: User authentication
        2. Profile Page: Personalize your experience and preferences.
        3. Watchlist Page: Save and manage your favorite movies.
7. Performance Optimization:
        1. Intersection Observer API: IS used to lazily load cast, crew, and similar films on the Film Details page, improving performance and reducing unnecessary API calls                                          until the content comes into view.
        2. Deferred JavaScript Loading: The defer attribute is used in the <script> tag to load JavaScript files asynchronously, ensuring the HTML is parsed first and                                                enhancing overall page load performance.
8. TMDb API Endpoints Used:
        1. Trending Movies (Daily) (Recommended): https://api.themoviedb.org/3/trending/movie/day?api_key=${Api_key}&language=en-IN&page=1
        2. Movie Details : https://api.themoviedb.org/3/movie/${movie.id}?api_key=${Api_key}&language=en-IN
        3. Movie Poster Image: https://image.tmdb.org/t/p/w500${movie.poster_path}
        4. New Releases (Last 30 Days): https://api.themoviedb.org/3/discover/movie?api_key=${Api_key}&region=IN&language=en-              
                                        IN&sort_by=primary_release_date.desc&with_release_type=3&release_date.lte=${today}&release_date.gte=${thirty_days_ago}
        5. Popular Movies: https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&region=IN&language=en-IN&page=1
        6. Paginated Film Lists (load more): https://api.themoviedb.org/3/movie/${films}?api_key=${Api_key}&region=IN&language=en-IN&page=${page}
        7. Filter by Year Range: https://api.themoviedb.org/3/discover/movie?api_key=${Api_key}&language=en-IN&primary_release_date.gte=${startYear}-01-        
                           01&primary_release_date.lte=${endYear}-12-31&page=${page}
        8. Filter by Genre: https://api.themoviedb.org/3/discover/movie?api_key=${Api_key}&language=en-IN&region=IN&with_genres=${genre_id}&page=${page}
        9. Filter by Genre + Year Range: https://api.themoviedb.org/3/discover/movie?api_key=${Api_key}&language=en-     
                                 IN&region=IN&with_genres=${genre_id}&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31&page=${page}
        10. Genre List: https://api.themoviedb.org/3/genre/movie/list?api_key=${Api_key}&language=en-IN
        11. Search by Title: https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&query=${encodeURIComponent(title)}&language=en-IN
        12. Movie Credits (Cast & Crew): https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}
        13. Watch Providers: https://api.themoviedb.org/3/movie/${movie_id}/watch/providers?api_key=${Api_key}
        14. Videos (Trailers): https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${Api_key}&language=en-IN
        15. YouTube Embed: https://www.youtube.com/watch?v=${trailer.key}
        16. Wikipedia Search for Cast/Crew: https://en.wikipedia.org/wiki/Special:Search?search=${name}
        17. Similar Movies: https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${Api_key}&language=en-IN
        18. Navigate to Similar Movie Details Page: Details.html?id=${similar_movie_id}
9. Error Handling:
        1. Handles API failures gracefully with fallback messages:
               1. If the internet is unavailable, an alert is shown: "Check your internet"
               2. When the header API fails due to offline local running, an alert is shown: "Can't fetch header file"
        2. Invalid Input Scenarios:
               1. Search by Title: On invalid or empty input, an alert is shown: "Invalid input"
               2. Filter Search without Selection: an alert is shown: "Select valid options for browsing"
               3. Unsupported Filter Combinations: If using filters like Top_Rated or Popular with other filters, shows alert: "Selected filter is not available"
        3. Displays appropriate messages when no data is available:
               1. No Trailer Found: an alert is shown: "No Trailer Found"
               2. Cast, Crew, or Similar Movies Not Found: Corresponding sections are hidden using display: none.
               3. No Backdrop, Poster, or Profile Image: The layout still renders with placeholders.
               4. Missing data in dataset (Director, Rating, Runtime, Genres, Languages, Streaming Info): Displays "....." in place of missing data.
               5. No Tagline: Displays a default message "Just watch it".
               6. Long Titles (over 40 characters): Trims the title to 40 characters and adds "....".
               7. Long Overviews (over 220 characters): Trims the overview to 220 characters and adds "....".
   

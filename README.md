# Movieboard
A movie discovery platform with TMDB API integration

1. Technologies Used: HTML, CSS, JavaScript, Python, MySQL
2. TMDb Integration: Uses TMDb API to fetch real-time movie data.
3. Responsive Design: Optimized for laptop screens only
4. Header Component: A reusable header component is implemented and imported across pages.
5. Pages Implemented:
       1. Home Page: Includes a welcome banner, recommended movies, new releases, popular films that can be clicked to view their details page, and a footer with
                     a link Instagram page and a copyright notice. 
       2. Films Page: Displays a wide selection of films that can be clicked to view their details page and provides filtering options by genre, release year, 
                     top-rated popularity, along with a search feature to find movies by title. It also includes a "Load More" button to fetch and explore        additional pages.
       3. Film Details: Presents comprehensive information about a selected movie, including its cast and crew (with links to their Wikipedia profiles) and a list
                     of similar films that can be clicked to view their details page. Allows users to add and remove from watchlist and watched films.
       4. Login Page: Redirects users to the Home Page after successful login allowing them to customize their experience.
              1. Sign Up:
                     1. Collects user details -> Email ending with @gmail.com, Username with at least 4 characters and no special symbols, Password with a minimum
                                                 of 8 characters, including at least 1 number and 1 symbol.
                     2. User must agree that they are above 18 and accept the terms and conditions.
                     3. On successful validation, stores the user data in the database via the server and alerts Registered successfully.
              2. Login:
                     1. Collects user details -> Email ending with @gmail.com, Password with at least 8 characters.
                     2. Authenticates user credentials against the database.
                     3. On successful authentication, alerts Login is successful.
       5. Profile Page:
              1. Displays a default user photo, user details including username, email, watchlist count, watched count.
              2. Provides a "logout" button for users to log out.
              3. Displays a list of watched films that can be clicked to view their details page.
              4. Users can click the "Load More" button to view additional watched films.
              5. If accessed without login, the user is redirected to the Login Page.
       6. Watchlist Page: Displays the user's watchlisted films, which can be clicked to view their details page. Users can click the "Load More" button to view
                            additional watchlisted films. If accessed without login, the user is redirected to the Login Page.
6. Performance Optimization:
       1. Intersection Observer API: IS used to lazily load cast, crew, and similar films on the Film Details page, improving performance and reducing unnecessary API
                                   calls until the content comes into view.
       2. Deferred JavaScript Loading: The defer attribute is used in the `<script>` tag to load JavaScript files asynchronously, ensuring the HTML is parsed first
                                   and enhancing overall page load performance.
7. TMDb API Endpoints Used:
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
8. Error Handling:
       1. Handles API failures gracefully with fallback messages:
              1. If the internet is unavailable, an alert is shown: "Check your internet"
              2. When the header API fails due to offline local running, an alert is shown: "Can't fetch header file"
              3. While connecting to server fails, an alert is shown: "Unable to connect server"
       2. Invalid Input Scenarios:
              1. Search by Title: On invalid or empty input, an alert is shown: "Invalid input"
              2. Filter Search without Selection: an alert is shown: "Select valid options for browsing"
              3. Unsupported Filter Combinations: If using filters like Top_Rated or Popular with other filters, shows alert: "Selected filter is not available"
              4. Signup Details: If signup conditions are not met or already a user, shows appropriate alerts.
              5. Login Details: If Login Conditions are not met or user does not exist, shows appropriate alerts.
       3. Displays appropriate messages when no data is available:
              1. No Trailer Found: an alert is shown: "No Trailer Found"
              2. Cast, Crew, or Similar Movies Not Found: Corresponding sections are hidden using display: none.
              3. No Backdrop, Poster, or Profile Image: The layout still renders with placeholders.
              4. Missing data in dataset (Director, Rating, Runtime, Genres, Languages, Streaming Info): Displays "....." in place of missing data.
              5. No Tagline: Displays a default message "Just watch it".
              6. Long Titles (over 40 characters): Trims the title to 40 characters and adds "....".
              7. Long Overviews (over 220 characters): Trims the overview to 220 characters and adds "....".
9. Database: Uses database named Movieboard which has 2 tables users table, users_data table.
              1. users table: Stores user_id (auto increment, primary key), email (unique), username, and user_password.
              2. users table is used for signup and login.
              3. users_data table: Stores user_id, movie_id, and state (watched or watchlisted).
              4. users_data table is used for watched and watchlist.
10. Local Storage: Stores user_id after successful login or signup for session persistence.
11. Session Management:
       1. Local Storage is cleared on Logout to avoid unauthorized access.
       2. Redirection to login page if session user_id is not found
12. Server Response: 
       1. Connecting to Database
              1. Uses mysql.connector to connect with database
              2. Sends response 500, if connection fails.
       2. Signup: Used in Login Page
              1. Path = '/signup'
              2. Server gets signup details from site and stores data in users table. Sends response 200. Also sends user_id.
              3. If duplicate signup, sends response 409.
              4. If fails due to any other error, sends response 500.
       3. Login: Used in Login Page
              1. Path = '/login'
              2. Server gets login details from site and verifies with signup details in users table. Sends response 200. Also sends user_id.
              3. If signup details not found, sends response 400.
              4. If incorrect password, sends response 401.
              5. If fails due to any other error, sends response 500.
       4. Add to Watchlist or watched: Used in Details Page
              1. Path = '/add'
              2. Server gets user_id, movie_id, state(watched or watchlisted) from site and stores in users_data table. Sends response 200.
              3. If fails due to any other error, sends response 500.
       5. Remove from Watchlist or watched: Used in Details Page
              1. Path = '/remove'
              2. Server gets user_id, movie_id, state(watched or watchlisted) from site and deletes that row from users_data table. Sends response 200.
              3. If fails due to any other error, sends response 500.
       6. Button Status:  Used in Details Page
              1. Path = '/check'
              2. Server gets user_id, movie_id from site and gets state(watched or watchlisted) from users_data table. Sends response 200. Also Sends state.
              3. If fails due to any other error, sends response 500.
       7. Profile: Used in Profile Page
              1. Path = '/profile'
              2. Server gets user_id from site and gets username, email, watchlist count, watched count from users and users_data table. Sends response 200.
              3. Also Sends username, email, watchlist count, watched count.
              4. If fails due to any other error, sends response 500.
       8. Show Watched: Used in Profile Page
              1. Path = '/watched'
              2. Server gets user_id from site and gets 30 movie_id's whose state is watched from users_data table. Sends response 200.
              3. Also Sends movie_id's.
              4. If fails due to any other error, sends response 500.
       9. Show Watchlist: Used in Watchlist Page
              1. Path = '/watchlist'
              2. Server gets user_id from site and gets 30 movie_id's whose state is watchlist from users_data table. Sends response 200.
              3. Also Sends movie_id's.
              4. If fails due to any other error, sends response 500.
13. Movieboard API Endpoints Used:
       1. Signup: http://localhost:8001/signup
       3. Login: http://localhost:8001/login
       4. Add to Watchlist or watched: http://localhost:8001/add.
       5. Remove from Watchlist or watched: http://localhost:8001/remove
       6. Button Status:  http://localhost:8001/check
       7. Profile: http://localhost:8001/profile
       8. Show Watched: http://localhost:8001/watched
       9. Show Watchlist: http://localhost:8001/watchlisted
14. Security:
       1. Hashed Password: Used bcrypt passwords for hashed passwords. And these hashed passwords are stored in database.
       2. Preventing SQL Injection: Used Query parameter(%s placeholders) instead of direct variables.
15. Services by Website:
       1. Allows users to explore a wide range of films.
       2. Home, Films, and Details pages are accessible without login.
       3. Login is required to access Profile, Watchlist, and to add films to Watchlist or Watched.
       4. Logged-in users can view their profile, manage Watchlist and Watched films.
16. Limitations or Future Enhancements:
       1. Default Profile Photo: All users currently have the same default profile picture.
       2. Not a Single Page Application (SPA): Full page reload happens on every navigation instead of smooth SPA experience.
       3. Screen Size Optimization: Website is only optimized for laptop/desktop screens; shows a message and stops execution on smaller screens.
       4. Internet Requirement: Website requires an active internet connection for API calls, database access.
17. What I have learnt:
       1. Frontend design
       2. Third-party API usage
       3. Backend API handling
       4. Database management
       5. Session handling
       6. Authentication and authorization
       7. Handling errors gracefully (network, API, and user input errors)
       8. Intersection Observer API
       9. Password hashing and security measures (bcrypt)
       10. Preventing SQL injection using query parameters
       11. Behaviour of asynchronous JavaScript
       12. Building reusable components (Header)
       13. Data pagination and loading more content dynamically
       14. Handling missing or incomplete data in API responses
       15. HTTP responses (500, 409, 401, etc.)
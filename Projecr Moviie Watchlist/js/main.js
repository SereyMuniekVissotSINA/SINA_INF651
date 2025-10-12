let movies = [];

function addMovie() {
    const movieInput = document.getElementById("movie-name").value.trim();

    if (movieInput !== ""){
        movies.push({ name: movieInput, watched: false });
        document.getElementById("movie-name").value = "";
        displayMovies();
    } else{
        alert("Please enter a movie name.");
    }
}

function removeMovie(index) {
    movies.splice(index, 1);
    displayMovies();
}

function watchMovie(index) {
    movies[index].watched = !movies[index].watched;
    displayMovies();
}

function displayMovies() {
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";

    movies.forEach((movie, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span style="text-decoration: ${movie.watched ? 'line-through' : 'none'}">
                ${movie.name}
            </span>
            <button onclick="watchMovie(${index})">
                ${movie.watched ? 'Unwatch' : 'Watch'}
            </button>
            <button onclick="removeMovie(${index})">Remove</button>
        `;
        movieList.appendChild(listItem);
    });
}
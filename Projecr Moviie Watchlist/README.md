##  How to Use

1. **Open the HTML file** in your browser.
   (Example: `index.html`)

2. You’ll see an input box and an “Add Movie” button.

3. **Add a movie:**

   * Type the movie name in the input box.
   * Click the **“Add Movie”** button (or press Enter).
   * The movie will appear in your list below.

4. **Mark as watched/unwatched:**

   * Click the **“Watch”** button next to a movie.
   * The movie name will appear with a **line-through** style if watched.
   * Click again to toggle back to unwatched.

5. **Remove a movie:**

   * Click the **“Remove”** button next to any movie.
   * It will be permanently removed from the list.


## Example UI

```
+-------------------------------------+
| [Enter movie name here] [Add Movie] |
+-------------------------------------+

1. Inception          [Watch] [Remove]
2. Avengers: Endgame  [Unwatch] [Remove]
```


## Code Explanation

* **`let movies = [];`**
  Stores all movie objects in an array. Each movie has a `name` and a `watched` property.

* **`addMovie()`**
  Adds a new movie to the array after checking that the input is not empty.

* **`removeMovie(index)`**
  Deletes a movie from the array by its index.

* **`watchMovie(index)`**
  Toggles the `watched` status of a movie and updates its display style.

* **`displayMovies()`**
  Refreshes the list of movies displayed on the page by dynamically creating HTML elements.


## 🚀 Future Improvements

* 🎨 Add CSS for better styling.
* 💾 Save movies to **localStorage** so they persist after refreshing.
* 🔍 Add a search or filter feature for movies.



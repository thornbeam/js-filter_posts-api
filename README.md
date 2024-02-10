# Category filter: Prototype
for use with an api endpoint

## Example
index.html: 
```
...
<body>
  <section class="post-filter">
    <form>
        <label for="selection">Choose a category id:</label>
        <select id="selection">
          <option value="all" selected>Show all posts</option>
          <option value="CATEGORY_ID">CATEGORY_NAME</option>
          <option value="CATEGORY_ID">CATEGORY_NAME</option>
          <option value="CATEGORY_ID">CATEGORY_NAME</option>
          ...
        </select>
        <button class="submit-button">submit</button>
    </form>
    <div class="result-container"></div>
  </section>
  <script type="module" src="index.js"></script>
</body>
...
```

index.js:
```
import { main as fetchMain } from "./fetch_posts.js";
import { main as filterMain } from "./filter_posts.js";

const fetchPosts = new fetchMain(
  "https://example.com/wp-json/wp/v2",
  "post_type",
  "per_page=100"
);

const filterPosts = new filterMain(
  fetchPosts.fetch(),
  document.querySelector("select#selection"),
  document.querySelector("button.submit-button"),
  document.querySelector("div.result-container")
);

filterPosts.init();
```

export class main {
  constructor(
    posts,
    select_element,
    button_element,
    result_container
  ) {
    this.posts = posts;
    this.selection = select_element;
    this.button = button_element;
    this.result_container = result_container;
  }

  async init() {
    let lastSelection = this.selection.value;
    let result = await this.posts;
    this.updateDisplay(result);
    result = [];

    // insert query directly into url
    const curQuery = document.location.search;
    const params = new URLSearchParams(curQuery);

    const curSelection = params.get("id");
    if (curQuery === "") {
      result = await this.posts;
    } else {
      result = await this.posts
      result = result.filter((post) =>
        post.categories.includes(Number(curSelection))
      );
    }
    this.updateDisplay(result);

    // select per click
    this.button.onclick = async (e) => {
      e.preventDefault();
      result = [];

      if (this.selection.value === lastSelection) {
        return;
      } else {
        lastSelection = this.selection.value;

        if (lastSelection === "all") {
          result = await this.posts;
          window.history.pushState(lastSelection, "", "/");
        } else {
          result = await this.posts;
          result = result.filter((post) =>
            post.categories.includes(Number(lastSelection))
          );
          window.history.pushState(lastSelection, "", "/?id=" + lastSelection);
        }
      }
      this.updateDisplay(result);
    };
  }

  updateDisplay(result) {
    while (this.result_container.firstChild) {
      this.result_container.removeChild(this.result_container.lastChild);
    }

    if (result.length === 0) {
      const errorMessage = document.createElement("div");
      errorMessage.textContent = "No posts match your selection.";
      this.result_container.appendChild(errorMessage);
    } else {
      for (const post of result) {
        this.showPost(post);
      }
    }
  }

  showPost(post) {
    const section = document.createElement("section");
    const heading = document.createElement("h2");
    const text = document.createElement("div");

    section.setAttribute("class", "post" + post.id);
    heading.textContent = post.title.rendered;
    text.textContent =
      "category id: " + post.categories + ", post id: " + post.id;

    this.result_container.appendChild(section);
    section.appendChild(heading);
    section.appendChild(text);
  }
}

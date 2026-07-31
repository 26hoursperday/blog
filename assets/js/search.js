/**
 * Client-side search powered by Lunr.js.
 *
 * How it works:
 * 1. Fetches /search.json, a Jekyll-generated index of every post
 *    (title, url, categories, tags, and stripped content).
 * 2. Builds an in-memory Lunr index from that data.
 * 3. Listens for input on #search-input and renders matches into
 *    #search-results as the user types.
 *
 * No server or third-party service required — everything runs in
 * the browser after the static search.json is downloaded once.
 */
(function () {
  var input = document.getElementById("search-input");
  var resultsList = document.getElementById("search-results");

  if (!input || !resultsList) return;

  var documents = [];
  var idx = null;

  function loadIndex() {
    // baseurl-aware path so this works whether the site is served
    // at the domain root or under a subpath (project pages).
    var searchJsonUrl = input.dataset.searchUrl || "/search.json";

    fetch(searchJsonUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        documents = data;
        idx = lunr(function () {
          this.ref("url");
          this.field("title", { boost: 10 });
          this.field("tags", { boost: 5 });
          this.field("categories", { boost: 5 });
          this.field("content");

          documents.forEach(function (doc, i) {
            this.add({
              url: doc.url,
              title: doc.title,
              tags: (doc.tags || []).join(" "),
              categories: (doc.categories || []).join(" "),
              content: doc.content,
              id: i,
            });
          }, this);
        });
      })
      .catch(function (err) {
        console.error("Failed to load search index:", err);
      });
  }

  function renderResults(matches) {
    resultsList.innerHTML = "";

    if (matches.length === 0) {
      resultsList.classList.remove("is-open");
      return;
    }

    matches.slice(0, 8).forEach(function (match) {
      var doc = documents.find(function (d) {
        return d.url === match.ref;
      });
      if (!doc) return;

      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = doc.url;
      a.innerHTML =
        "<strong>" + doc.title + "</strong><span>" + doc.date + "</span>";
      li.appendChild(a);
      resultsList.appendChild(li);
    });

    resultsList.classList.add("is-open");
  }

  input.addEventListener("input", function () {
    var query = input.value.trim();

    if (!idx || query.length < 2) {
      renderResults([]);
      return;
    }

    try {
      var matches = idx.search(query + "*"); // simple prefix search
      renderResults(matches);
    } catch (e) {
      // Lunr throws on certain special-character queries; fail quietly.
      renderResults([]);
    }
  });

  document.addEventListener("click", function (e) {
    if (!resultsList.contains(e.target) && e.target !== input) {
      resultsList.classList.remove("is-open");
    }
  });

  loadIndex();
})();

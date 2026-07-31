/**
 * Dark mode toggle.
 *
 * - The initial theme (if the user has one saved) is already applied by an
 *   inline script in the <head> of _layouts/default.html, before this file
 *   loads, to avoid a flash of the wrong theme.
 * - This script only wires up the toggle button: clicking it flips between
 *   light and dark, and saves the choice to localStorage so it persists
 *   across visits.
 * - If the user has never chosen a theme, the site follows the OS-level
 *   `prefers-color-scheme` automatically (handled purely in CSS — see
 *   assets/css/main.css). Clicking the toggle creates an explicit override.
 */
(function () {
  var toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  function currentTheme() {
    var explicit = document.documentElement.getAttribute("data-theme");
    if (explicit) return explicit;
    // No explicit choice yet — infer from system preference so the
    // first click flips to the opposite of what's currently showing.
    var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return systemDark ? "dark" : "light";
  }

  toggle.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      // localStorage may be unavailable (e.g. private browsing); the
      // toggle still works for the current page view either way.
    }
  });
})();

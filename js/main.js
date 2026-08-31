document.addEventListener("DOMContentLoaded", function () {
  initNavToggle();
  initScrollSpy();
  initPubPanels();
  initCopyButtons();
  initPubFilters();
  initEmailCopy();
});

function initNavToggle() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initEmailCopy() {
  document.querySelectorAll("[data-email]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var email = btn.getAttribute("data-email");
      var tooltip = btn.querySelector(".icon-tooltip");
      var original = tooltip ? tooltip.textContent : null;

      var showCopied = function () {
        if (!tooltip) return;
        tooltip.textContent = "Copied!";
        btn.classList.add("show-tooltip");
        setTimeout(function () {
          tooltip.textContent = original;
          btn.classList.remove("show-tooltip");
        }, 1500);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(showCopied).catch(function () { fallbackCopy(email, showCopied); });
      } else {
        fallbackCopy(email, showCopied);
      }
    });
  });
}

function initScrollSpy() {
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".site-nav a[data-nav]");
  if (!sections.length || !navLinks.length) return;

  var map = {};
  navLinks.forEach(function (link) {
    map[link.getAttribute("data-nav")] = link;
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove("is-active"); });
          var match = map[entry.target.id];
          if (match) match.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach(function (s) { observer.observe(s); });
}

function initPubPanels() {
  document.querySelectorAll(".pill[data-target]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = document.getElementById(btn.getAttribute("data-target"));
      if (!panel) return;
      var isOpen = panel.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });
}

function initCopyButtons() {
  document.querySelectorAll(".pub-panel-copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var pre = btn.parentElement.querySelector("pre");
      if (!pre) return;
      var text = pre.textContent;
      var done = function () {
        var original = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = original; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
      } else {
        fallbackCopy(text, done);
      }
    });
  });
}

function fallbackCopy(text, cb) {
  var ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); } catch (e) {  }
  document.body.removeChild(ta);
  if (cb) cb();
}

function initPubFilters() {
  var filterBar = document.querySelector(".pub-filters");
  if (!filterBar) return;
  var buttons = filterBar.querySelectorAll(".pub-filter");
  var items = document.querySelectorAll(".pub-item, .talk-item");

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var topic = btn.getAttribute("data-topic");

      items.forEach(function (item) {
        var topics = item.getAttribute("data-topics") || "";
        if (topic === "all" || topics.indexOf(topic) !== -1) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

const filters = document.querySelectorAll('.pub-filter');
const projects = document.querySelectorAll('.project-card');

filters.forEach(filter => {
    filter.addEventListener('click', () => {

        filters.forEach(f => f.classList.remove('is-active'));
        filter.classList.add('is-active');

        const topic = filter.dataset.filter;

        projects.forEach(project => {

            if (
                topic === 'all' ||
                project.dataset.topics.includes(topic)
            ) {
                project.style.display = '';
            } else {
                project.style.display = 'none';
            }
        });
    });
});

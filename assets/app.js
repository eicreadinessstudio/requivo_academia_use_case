(function () {
  function pathName() {
    return window.location.pathname.split("/").pop();
  }

  function isLanding() {
    return document.body.dataset.page === "landing";
  }

  function createSidebar(trackName) {
    const data = window.DEMO_DATA && window.DEMO_DATA[trackName];
    if (!data) return "";

    const current = pathName();

    const links = data.nav
      .map((item, index) => {
        const itemFile = item.href.split("/").pop();
        const active = itemFile === current ? "active" : "";
        const label = index === 0 ? "Intro" : `Step ${index}`;
        return `
          <a href="${item.href}" class="nav-link ${active}">
            <small>${label}</small>
            <strong>${item.label}</strong>
          </a>
        `;
      })
      .join("");

    return `
      <aside class="sidebar">
        <h2>Demo pages</h2>
        <nav class="nav-list">${links}</nav>
        <div class="sidebar-note">
          <strong>Track context</strong>
          ${data.note}
        </div>
      </aside>
    `;
  }

  function bootTrackedPage() {
    const page = document.body.dataset.page;
    if (!page || page === "landing") return;

    const sidebarHost = document.getElementById("sidebarHost");
    if (!sidebarHost) return;

    sidebarHost.innerHTML = createSidebar(page);
  }

  function bindRevealButtons() {
    const buttons = document.querySelectorAll("[data-reveal-target]");
    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const targetId = btn.getAttribute("data-reveal-target");
        const target = document.getElementById(targetId);
        if (!target) return;

        target.classList.remove("hidden");
        target.classList.add("flash");
        btn.disabled = true;
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!isLanding()) {
      bootTrackedPage();
    }
    bindRevealButtons();
  });
})();

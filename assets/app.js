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

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function renderSourceRow(item) {
    return `
      <div class="source-row">
        <div class="source-icon ${item.icon}">${item.code}</div>
        <div>
          <strong style="display:block;margin-bottom:2px;">${item.title}</strong>
          <span class="text-muted">${item.meta}</span>
        </div>
        <div class="source-tag">${item.tag}</div>
      </div>
    `;
  }

  async function runStagedRows(button, container, items, summaryEl) {
    button.disabled = true;
    container.innerHTML = "";

    for (let i = 0; i < items.length; i++) {
      container.insertAdjacentHTML("beforeend", renderSourceRow(items[i]));
      const last = container.lastElementChild;
      if (last) last.classList.add("flash");
      await wait(240);
    }

    if (summaryEl) {
      summaryEl.classList.remove("hidden");
      summaryEl.classList.add("flash");
    }
  }

  async function typeText(outputEl, text, speed = 10) {
    outputEl.textContent = "";
    outputEl.classList.add("typing-cursor");

    for (let i = 0; i < text.length; i++) {
      outputEl.textContent += text[i];
      if (i % 2 === 0) {
        await wait(speed);
      }
      outputEl.scrollTop = outputEl.scrollHeight;
    }

    outputEl.classList.remove("typing-cursor");
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

  function bindIngestionPage() {
    const button = document.getElementById("connectNormalizeBtn");
    const rowsHost = document.getElementById("sourceRows");
    const summary = document.getElementById("ingestionSummary");
    const track = document.body.dataset.page;

    if (!button || !rowsHost || !summary || !track) return;
    if (!window.DEMO_DATA || !window.DEMO_DATA[track]) return;

    button.addEventListener("click", async function () {
      await runStagedRows(button, rowsHost, window.DEMO_DATA[track].sources, summary);
    });
  }

  function bindWriterPage() {
    const track = document.body.dataset.page;
    const button = document.getElementById("writerActionBtn");
    const output = document.getElementById("writerOutput");
    const summary = document.getElementById("writerSummary");

    if (!track || !button || !output || !summary) return;
    if (!window.DEMO_DATA || !window.DEMO_DATA[track]) return;

    const text =
      track === "institutional"
        ? window.DEMO_DATA.institutional.articleText
        : window.DEMO_DATA.professor.lessonText;

    button.addEventListener("click", async function () {
      button.disabled = true;
      await typeText(output, text, 10);
      summary.classList.remove("hidden");
      summary.classList.add("flash");
    });
  }

  function bindAnalysisPage() {
    const button = document.getElementById("runAnalysisBtn");
    const status = document.getElementById("analysisStatus");
    const findings = document.getElementById("analysisFindings");
    const summary = document.getElementById("analysisSummary");

    if (!button || !status || !findings || !summary) return;

    button.addEventListener("click", async function () {
      button.disabled = true;
      status.textContent = "Scanning linked evidence...";
      status.classList.add("flash");
      await wait(500);

      status.textContent = "Comparing versions and role logic...";
      await wait(650);

      status.textContent = "Flagging unresolved issues...";
      await wait(650);

      findings.classList.remove("hidden");
      findings.classList.add("flash");
      await wait(180);

      summary.classList.remove("hidden");
      summary.classList.add("flash");

      status.textContent = "Analysis complete";
    });
  }

  function bindThreadPage() {
    const button = document.getElementById("threadActionBtn");
    const threadParts = document.querySelectorAll("[data-thread-part]");
    const summary = document.getElementById("threadSummary");

    if (!button || !threadParts.length || !summary) return;

    button.addEventListener("click", async function () {
      button.disabled = true;

      for (let i = 0; i < threadParts.length; i++) {
        threadParts[i].classList.remove("hidden");
        threadParts[i].classList.add("flash");
        await wait(520);
      }

      summary.classList.remove("hidden");
      summary.classList.add("flash");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!isLanding()) {
      bootTrackedPage();
    }

    bindRevealButtons();
    bindIngestionPage();
    bindWriterPage();
    bindAnalysisPage();
    bindThreadPage();
  });
})();

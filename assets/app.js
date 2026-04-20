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
        <div class="source-main">
          <strong style="display:block;margin-bottom:2px;">${item.title}</strong>
          <span class="text-muted">${item.meta}</span>
          <div class="source-progress">
            <div class="source-progress-track">
              <div class="source-progress-fill"></div>
            </div>
            <div class="source-progress-number">0%</div>
          </div>
        </div>
        <div class="source-status">·</div>
      </div>
    `;
  }

  async function animateRowProgress(row) {
    const fill = row.querySelector(".source-progress-fill");
    const number = row.querySelector(".source-progress-number");
    const status = row.querySelector(".source-status");

    if (!fill || !number || !status) return;

    const duration = 900 + Math.floor(Math.random() * 500);
    const start = performance.now();

    return new Promise((resolve) => {
      function frame(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const percent = Math.round(progress * 100);

        fill.style.width = percent + "%";
        number.textContent = percent + "%";

        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          status.textContent = "✓";
          status.classList.add("done");
          row.classList.add("done");
          number.textContent = "100%";
          resolve();
        }
      }

      requestAnimationFrame(frame);
    });
  }

  async function runStagedRows(button, container, items, summaryEl) {
    button.disabled = true;
    container.innerHTML = "";

    // Render all rows at once
    items.forEach((item) => {
      container.insertAdjacentHTML("beforeend", renderSourceRow(item));
    });

    const rows = Array.from(container.querySelectorAll(".source-row"));

    // Animate all rows in parallel with a small stagger for visual polish
    await Promise.all(
      rows.map((row, i) =>
        wait(i * 55).then(() => {
          row.classList.add("flash");
          return animateRowProgress(row);
        })
      )
    );

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

  function injectSourcePills() {
    const pillsHost = document.getElementById("sourcePillsRow");
    if (!pillsHost) return;

    const track = document.body.dataset.page;
    if (!track || !window.DEMO_DATA || !window.DEMO_DATA[track]) return;

    const sources = window.DEMO_DATA[track].sources;
    sources.forEach((s) => {
      const maxLen = 30;
      const label = s.title.length > maxLen ? s.title.substring(0, maxLen) + "…" : s.title;
      const pill = document.createElement("span");
      pill.className = "source-pill";
      pill.innerHTML = `<span class="source-pill-badge ${s.icon}">${s.code}</span>${label}`;
      pillsHost.appendChild(pill);
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

  function bindVerifierPage() {
    const confirmBtn = document.getElementById("elenaConfirmBtn");
    if (!confirmBtn) return;

    confirmBtn.addEventListener("click", async function () {
      confirmBtn.disabled = true;
      confirmBtn.textContent = "Sending...";
      await wait(700);

      // Hide button, show phone confirmation
      const phoneResult = document.getElementById("elenaPhoneResult");
      if (phoneResult) {
        confirmBtn.style.display = "none";
        phoneResult.classList.remove("hidden");
        phoneResult.classList.add("flash");
      }

      // Show Elena confirmed result on left
      await wait(900);
      const elenaResult = document.getElementById("elenaResult");
      if (elenaResult) {
        elenaResult.classList.remove("hidden");
        elenaResult.classList.add("flash");
      }

      // Show summary banner
      await wait(500);
      const summary = document.getElementById("threadSummary");
      if (summary) {
        summary.classList.remove("hidden");
        summary.classList.add("flash");
      }
    });
  }

  function bindGovernedPage() {
    const activateBtn = document.getElementById("governedActivateBtn");
    if (!activateBtn) return;

    activateBtn.addEventListener("click", async function () {
      activateBtn.disabled = true;

      const items = document.querySelectorAll(".procedure-item");
      for (let i = 0; i < items.length; i++) {
        await wait(380);
        const statusEl = items[i].querySelector(".procedure-status");
        if (statusEl) {
          statusEl.textContent = "Verified";
          statusEl.classList.remove("pending");
          statusEl.classList.add("verified");
          items[i].classList.add("verified-row");
          items[i].classList.add("flash");
        }
      }

      await wait(280);
      const summary = document.getElementById("governedSummary");
      if (summary) {
        summary.classList.remove("hidden");
        summary.classList.add("flash");
      }
    });
  }

  function bindApplicationPage() {
    const activateBtn = document.getElementById("appLayerBtn");
    if (!activateBtn) return;

    activateBtn.addEventListener("click", async function () {
      activateBtn.disabled = true;

      const tiles = document.querySelectorAll(".app-tile");
      for (let i = 0; i < tiles.length; i++) {
        await wait(260);
        tiles[i].classList.add("active");
      }

      // Show coverage section
      await wait(380);
      const coverageSection = document.getElementById("coverageSection");
      if (coverageSection) {
        coverageSection.classList.add("active");

        await wait(80);
        const fill = coverageSection.querySelector(".coverage-fill");
        if (fill) fill.style.width = "87%";

        const valueEl = document.getElementById("coverageValue");
        if (valueEl) {
          let count = 0;
          const target = 87;
          const tick = () => {
            if (count < target) {
              count = Math.min(count + 2, target);
              valueEl.textContent = count + "%";
              setTimeout(tick, 28);
            }
          };
          tick();
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!isLanding()) {
      bootTrackedPage();
    }

    bindRevealButtons();
    bindIngestionPage();
    injectSourcePills();
    bindWriterPage();
    bindAnalysisPage();
    bindThreadPage();
    bindVerifierPage();
    bindGovernedPage();
    bindApplicationPage();
  });
})();

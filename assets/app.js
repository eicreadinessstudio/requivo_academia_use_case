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

    items.forEach((item) => {
      container.insertAdjacentHTML("beforeend", renderSourceRow(item));
    });

    const rows = Array.from(container.querySelectorAll(".source-row"));

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

  async function typeIntoElement(el, text, speed = 28) {
    el.textContent = "";
    for (let i = 0; i < text.length; i++) {
      el.textContent += text[i];
      if (i % 3 === 0) await wait(speed);
    }
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

  async function highlightSourcePillsSequence() {
    const pills = document.querySelectorAll("#sourcePillsRow .source-pill");
    if (!pills.length) return;

    for (let i = 0; i < pills.length; i++) {
      await wait(190);
      pills[i].classList.add("pill-active");
    }

    await wait(260);
  }

  function bindWriterPage() {
    const track = document.body.dataset.page;
    const button = document.getElementById("writerActionBtn");
    const output = document.getElementById("writerOutput");
    const summaryHost = document.getElementById("writerSummary");

    if (!track || !button || !output || !summaryHost) return;
    if (!window.DEMO_DATA || !window.DEMO_DATA[track]) return;

    const text =
      track === "institutional"
        ? window.DEMO_DATA.institutional.articleText
        : window.DEMO_DATA.professor.lessonText;

    button.addEventListener("click", async function () {
      button.disabled = true;

      // 1. Highlight source pills one by one
      await highlightSourcePillsSequence();

      // 2. Then type the article
      await typeText(output, text, 10);

      // 3. Show confirmation
      summaryHost.classList.remove("hidden");
      summaryHost.classList.add("flash");
    });
  }

  function bindAnalysisPage() {
    const button = document.getElementById("runAnalysisBtn");
    const status = document.getElementById("analysisStatus");
    const conflictCard = document.getElementById("conflictCard");
    const gapCard = document.getElementById("gapCard");
    const summary = document.getElementById("analysisSummary");

    if (!button || !status) return;

    button.addEventListener("click", async function () {
      button.disabled = true;

      status.textContent = "Scanning linked evidence…";
      await wait(480);

      status.textContent = "Comparing versions and role logic…";
      await wait(620);

      status.textContent = "Flagging unresolved issues…";
      await wait(580);

      // Conflict card enters first (left to right)
      if (conflictCard) {
        conflictCard.classList.add("visible");
        await wait(380);
      }

      // Gap card enters second
      if (gapCard) {
        gapCard.classList.add("visible");
        await wait(360);
      }

      // Summary last
      if (summary) {
        summary.classList.remove("hidden");
        summary.classList.add("flash");
      }

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

      const typingDots = document.getElementById("phoneTypingDots");
      const pendingPill = document.getElementById("pendingPill");

      if (pendingPill) pendingPill.textContent = "Responding…";

      if (typingDots) {
        typingDots.classList.remove("hidden");
        typingDots.classList.add("active");
      }

      await wait(1500);

      if (typingDots) typingDots.classList.add("hidden");

      // Show reply bubble and type text character by character
      const replyMsg = document.getElementById("phoneReplyMsg");
      const replyText =
        "Pre-screening after funding confirmation unless patient data category A. Register opens day 1, assigned to project office.";

      if (replyMsg) {
        replyMsg.classList.remove("hidden");
        await typeIntoElement(replyMsg, replyText, 26);
      }

      await wait(420);

      // Show verified area
      const verifiedArea = document.getElementById("phoneVerifiedPill");
      if (verifiedArea) {
        verifiedArea.classList.remove("hidden");
        verifiedArea.classList.add("flash");
      }

      if (pendingPill) {
        pendingPill.textContent = "Confirmed";
        pendingPill.classList.remove("pending");
        pendingPill.classList.add("verified");
      }

      await wait(600);

      const elenaResult = document.getElementById("elenaResult");
      if (elenaResult) {
        elenaResult.classList.remove("hidden");
        elenaResult.classList.add("flash");
      }

      await wait(500);

      const summary = document.getElementById("threadSummary");
      if (summary) {
        summary.classList.remove("hidden");
        summary.classList.add("flash");
      }
    });
  }

  async function verifyProcedureRow(item) {
    const membersEl = item.querySelector(".procedure-members");
    const statusEl = item.querySelector(".procedure-status");
    const countEl = item.querySelector(".procedure-count");
    if (!membersEl || !statusEl) return;

    const members = (item.dataset.members || "").split(",").filter(Boolean);

    // 1. Blue circles appear
    members.forEach((m) => {
      const circle = document.createElement("div");
      circle.className = "member-circle neutral";
      circle.textContent = m;
      membersEl.appendChild(circle);
    });
    membersEl.classList.add("visible");

    await wait(380);

    const circles = membersEl.querySelectorAll(".member-circle");

    // 2. First circle goes green
    if (circles[0]) {
      circles[0].classList.remove("neutral");
      circles[0].classList.add("verified-member");
    }
    if (countEl) countEl.textContent = "1 of 2";
    await wait(420);

    // 3. Second circle goes green
    if (circles[1]) {
      circles[1].classList.remove("neutral");
      circles[1].classList.add("verified-member");
    }
    if (countEl) countEl.textContent = "2 of 2";
    await wait(320);

    // 4. Row goes verified
    statusEl.textContent = "Verified";
    statusEl.classList.remove("pending");
    statusEl.classList.add("verified");
    item.classList.add("verified-row");
  }

  function bindGovernedPage() {
    const activateBtn = document.getElementById("governedActivateBtn");
    if (!activateBtn) return;

    activateBtn.addEventListener("click", async function () {
      activateBtn.disabled = true;

      const items = document.querySelectorAll(".procedure-item");

      for (let i = 0; i < items.length; i++) {
        await verifyProcedureRow(items[i]);
        await wait(180);
      }

      // Blue banner slides in at the end
      await wait(300);
      const blueBanner = document.getElementById("governedBlueBanner");
      if (blueBanner) blueBanner.classList.add("visible");
    });
  }

  function bindApplicationPage() {
    const activateBtn = document.getElementById("appLayerBtn");
    if (!activateBtn) return;

    activateBtn.addEventListener("click", async function () {
      activateBtn.disabled = true;

      // Tiles slide in one by one (horizontal)
      const tiles = document.querySelectorAll(".app-tile");
      for (let i = 0; i < tiles.length; i++) {
        await wait(240);
        tiles[i].classList.add("active");
      }

      // Show coverage section
      await wait(380);
      const coverageSection = document.getElementById("coverageSection");
      if (coverageSection) coverageSection.classList.add("active");

      // Green loading line
      await wait(80);
      const loadingLine = document.getElementById("coverageLoadingLine");
      if (loadingLine) loadingLine.classList.add("running");

      // After line completes, show metrics
      await wait(1500);
      const metrics = document.getElementById("coverageMetrics");
      if (metrics) metrics.classList.add("visible");

      // Animate coverage value
      const valueEl = document.getElementById("coverageValue");
      if (valueEl) {
        valueEl.textContent = "0%";
        let count = 0;
        const target = 87;
        const tick = () => {
          if (count < target) {
            count = Math.min(count + 2, target);
            valueEl.textContent = count + "%";
            setTimeout(tick, 26);
          }
        };
        tick();
      }

      // Healthy banner slides in
      await wait(1600);
      const healthyBanner = document.getElementById("healthyBanner");
      if (healthyBanner) healthyBanner.classList.add("visible");
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

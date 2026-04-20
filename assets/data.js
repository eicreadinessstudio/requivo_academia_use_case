window.DEMO_DATA = {
  institutional: {
    nav: [
      { href: "../institutional/01-meet-the-customer.html", label: "Meet the customer" },
      { href: "../institutional/02-ingestion.html", label: "Ingestion" },
      { href: "../institutional/03-writer.html", label: "Knowledge Writer" },
      { href: "../institutional/04-conflicts.html", label: "Conflict & gap detection" },
      { href: "../institutional/05-verifier.html", label: "Knowledge Verifier" },
      { href: "../institutional/06-governed.html", label: "Governed knowledge" },
      { href: "../institutional/07-application-layer.html", label: "Application Layer" },
      { href: "../institutional/08-get-started.html", label: "Get started" }
    ],
    note: "Institutional track: research operations, grant preparation, ethics routing, and project initiation.",
    sources: [
      {
        icon: "doc",
        code: "DOC",
        title: "Grant initiation checklist v2",
        meta: "Research Office · 2024",
        tag: "Procedure"
      },
      {
        icon: "pdf",
        code: "PDF",
        title: "Ethics_screening_SOP.pdf",
        meta: "Ethics Office · 2023",
        tag: "SOP"
      },
      {
        icon: "wiki",
        code: "WKI",
        title: "Project initiation FAQ (wiki)",
        meta: "Last edited 2024",
        tag: "Wiki"
      },
      {
        icon: "mail",
        code: "EML",
        title: "Re: ethics timing for patient-data studies",
        meta: "E. Messina · Jan 2026",
        tag: "Email decision"
      },
      {
        icon: "xls",
        code: "XLS",
        title: "Project_Register_v3.xlsx",
        meta: "Projects team archive",
        tag: "Template"
      },
      {
        icon: "pdf",
        code: "PDF",
        title: "Archived Horizon Europe package",
        meta: "Faculty repository",
        tag: "Proposal archive"
      },
      {
        icon: "doc",
        code: "DOC",
        title: "Internal onboarding note set",
        meta: "Project office",
        tag: "Onboarding"
      }
    ],
    articleText: `Title: Externally Funded Research Project Initiation Procedure

Purpose
This procedure describes the operational sequence from near-final grant application to formal project launch for externally funded research projects at the university.

Draft process steps
1. Confirm the funder deadline, internal pre-review deadline, and faculty sign-off route.
   Cited: Grant initiation checklist v2 §1 + project initiation FAQ

2. Determine whether ethics pre-screening is needed before submission based on study type and data category.
   Cited: Ethics_screening_SOP.pdf + email clarification (pending verification)

3. Prepare internal budget and annex package using the current institutional template set.
   Cited: Research Office template folder + archived Horizon Europe package

4. After award, open the project document register and assign operational ownership.
   Cited: Project_Register_v3.xlsx (gap — authoritative version unclear)

5. Initiate the project checklist: ethics package, DMP baseline, financial code, and kickoff meeting.
   Cited: project initiation FAQ + internal onboarding note set

Status
Draft generated from fragmented institutional evidence. Awaiting expert verification on ethics timing and project register ownership.`
  },

  professor: {
    nav: [
      { href: "../professor/01-meet-the-professor.html", label: "Meet the professor" },
      { href: "../professor/02-ingestion.html", label: "Ingestion" },
      { href: "../professor/03-lesson-writer.html", label: "Lesson Writer" },
      { href: "../professor/04-conflicts.html", label: "Conflict & gap detection" },
      { href: "../professor/05-review.html", label: "Review" },
      { href: "../professor/06-governed-teaching.html", label: "Governed teaching knowledge" },
      { href: "../professor/07-application-layer.html", label: "Application Layer" },
      { href: "../professor/08-get-started.html", label: "Get started" }
    ],
    note: "Professor track: lesson preparation, teaching continuity, structured course knowledge, and faculty-side reuse.",
    sources: [
      {
        icon: "doc",
        code: "SLD",
        title: "Clinical Research Methods — slides 2025",
        meta: "Prior-year slide deck",
        tag: "Slides"
      },
      {
        icon: "doc",
        code: "DOC",
        title: "Lecture_notes_raw.docx",
        meta: "Professor notes",
        tag: "Notes"
      },
      {
        icon: "pdf",
        code: "PDF",
        title: "Syllabus_fragment.pdf",
        meta: "Course outline excerpt",
        tag: "Syllabus"
      },
      {
        icon: "pdf",
        code: "PDF",
        title: "Selected paper pack",
        meta: "Teaching paper bundle",
        tag: "Papers"
      },
      {
        icon: "doc",
        code: "CAS",
        title: "Clinical case note set",
        meta: "Example scenarios",
        tag: "Case set"
      },
      {
        icon: "xls",
        code: "EXM",
        title: "Exam topics list",
        meta: "Student assessment cues",
        tag: "Assessment"
      }
    ],
    lessonText: `Lesson package: Clinical Research Methods — Ethics, Data Governance, and Study Initiation

Learning objectives
- Explain the difference between grant submission readiness and project launch readiness
- Distinguish ethics pre-screening, formal ethics review, and operational initiation activities
- Understand why fragmented institutional knowledge creates delays in real research environments

Suggested lecture structure
1. Opening scenario: a funded medical research project fails to start on time because process knowledge is split across documents and people
2. Core concepts: ethics timing, project ownership, DMP baseline, and institutional sign-off
3. Case discussion: compare written SOP logic with operational reality
4. Student exercise: reconstruct the correct initiation sequence from fragmented evidence
5. Closing synthesis: why governed academic knowledge matters

Recommended evidence basis
Prior-year slides, professor notes, policy excerpts, selected case-study materials, and syllabus fragments.

Status
Draft lesson package generated from fragmented teaching material. Ready for professor review and refinement.`
  }
};

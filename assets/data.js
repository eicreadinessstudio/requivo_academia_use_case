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
      { href: "../professor/03-lesson-writer.html", label: "Knowledge Writer" },
      { href: "../professor/04-conflicts.html", label: "Conflict & gap detection" },
      { href: "../professor/05-review.html", label: "Knowledge Verifier" },
      { href: "../professor/06-governed-teaching.html", label: "Governed knowledge" },
      { href: "../professor/07-application-layer.html", label: "Application Layer" },
      { href: "../professor/08-get-started.html", label: "Get started" }
    ],
    note: "Professor track: teaching continuity, academic methodology, structured course knowledge, and faculty-side delegation.",
    sources: [
      {
        icon: "doc",
        code: "PPT",
        title: "COPD_Lecture_2024.pptx",
        meta: "Core lecture deck · 2024",
        tag: "Slides"
      },
      {
        icon: "doc",
        code: "DOC",
        title: "Seminar_outline_smoking_harm_reduction.docx",
        meta: "Seminar notes",
        tag: "Seminar"
      },
      {
        icon: "pdf",
        code: "PDF",
        title: "Core_readings_respiratory_medicine.pdf",
        meta: "Reading list",
        tag: "Readings"
      },
      {
        icon: "doc",
        code: "MD",
        title: "Lecture_notes_private.md",
        meta: "Professor working notes",
        tag: "Notes"
      },
      {
        icon: "doc",
        code: "PPT",
        title: "Slides_legacy_module_B.pptx",
        meta: "Archive · Module B",
        tag: "Archive"
      },
      {
        icon: "doc",
        code: "DOC",
        title: "Assistant_annotations_Q1.docx",
        meta: "Teaching assistant notes",
        tag: "Annotations"
      },
      {
        icon: "xls",
        code: "XLS",
        title: "Exam_topics_master_list.xlsx",
        meta: "Assessment cues",
        tag: "Assessment"
      }
    ],
    lessonText: `Title: Smoking Harm Reduction — lecture sequence and teaching structure

Teaching context
This teaching article captures the intended lecture sequence and explanatory logic for the topic of smoking harm reduction in a clinical medicine context. It reflects the professor's preferred conceptual order and source logic.

Teaching structure
1. Why the topic matters in clinical teaching
   The harm reduction framework is clinically relevant and academically contested. Students must understand why it exists before evaluating its evidence.
   Source: COPD lecture 2024 + seminar outline

2. Distinguish cessation from harm reduction
   Cessation and harm reduction operate on different evidence timelines, clinical rationales, and patient communication strategies. This distinction is foundational and must be established before evidence is introduced.
   Source: Private lecture notes + legacy module B slides

3. Evidence base and common objections
   Introduce primary evidence sources. Acknowledge the main academic objections. Prepare students for contested clinical territory.
   Source: Core readings + seminar outline (framing conflict — pending verification)

4. Patient case framing for discussion
   Use a structured patient case to show how the distinction between cessation and harm reduction plays out in a clinical consultation. Surfaces student assumptions before correction.
   Source: Seminar outline + assistant annotations Q1

5. Recommended reading and teaching sequence
   Primary evidence first, then policy implications, then patient communication literature. The sequence reflects the professor's intended conceptual order, not just topic relevance.
   Source: Exam topics master list + professor working notes

Status
Draft generated from professor's teaching material. Awaiting professor verification on concept order and framing emphasis.`
  }
};

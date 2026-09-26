(function () {
  "use strict";

  const storageKey = "sat-mistake-notebook";
  const dayMs = 24 * 60 * 60 * 1000;
  const subjects = new Set(["math", "reading", "writing"]);
  let items = [];
  let writesAllowed = true;

  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, character => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  })[character]);
  const isDate = value => typeof value === "string" && Number.isFinite(Date.parse(value));
  const makeId = () => window.crypto && typeof window.crypto.randomUUID === "function"
    ? window.crypto.randomUUID()
    : `mistake-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const normalizedTags = values => [...new Set((Array.isArray(values) ? values : [])
    .map(tag => String(tag).trim().slice(0, 40)).filter(Boolean))].slice(0, 10);
  const validItem = item => item && typeof item === "object" && !Array.isArray(item)
    && typeof item.id === "string" && item.id.length > 0 && item.id.length <= 100
    && (item.sourceKey === null || (typeof item.sourceKey === "string" && item.sourceKey.length <= 300))
    && typeof item.question === "string" && item.question.trim() && item.question.length <= 2000
    && subjects.has(item.subject)
    && typeof item.topic === "string" && item.topic.trim() && item.topic.length <= 120
    && typeof item.userAnswer === "string" && item.userAnswer.length <= 500
    && typeof item.correctAnswer === "string" && item.correctAnswer.length <= 500
    && typeof item.explanation === "string" && item.explanation.length <= 2000
    && typeof item.source === "string" && item.source.length <= 120
    && (item.status === "incorrect" || item.status === "skipped")
    && Array.isArray(item.options) && item.options.length <= 4 && item.options.every(option => typeof option === "string" && option.length <= 500)
    && Array.isArray(item.tags) && item.tags.length <= 10 && item.tags.every(tag => typeof tag === "string" && tag.length <= 40)
    && isDate(item.createdAt) && isDate(item.dueAt)
    && (item.reviewedAt === null || isDate(item.reviewedAt))
    && Number.isFinite(item.intervalDays) && item.intervalDays >= 1
    && Number.isInteger(item.reviewCount) && item.reviewCount >= 0
    && Number.isInteger(item.streak) && item.streak >= 0
    && typeof item.mastered === "boolean"
    && (item.masteredAt === null || isDate(item.masteredAt));

  function setStatus(message, error = false) {
    const element = document.querySelector("#notebookStatus");
    if (!element) return;
    element.textContent = message;
    element.classList.toggle("is-error", error);
    element.hidden = !message;
  }

  function readItems() {
    let raw;
    try {
      raw = localStorage.getItem(storageKey);
    } catch (error) {
      writesAllowed = false;
      console.warn("Unable to read the mistake notebook from local storage.", error);
      setStatus("Notebook storage is unavailable in this browser. Changes cannot be saved.", true);
      return;
    }
    if (!raw) return;
    let saved;
    try {
      saved = JSON.parse(raw);
    } catch (error) {
      writesAllowed = false;
      console.warn("The saved mistake notebook is not valid JSON.", error);
      setStatus("Notebook data could not be read. Your saved data was left untouched; back it up and repair or remove the sat-mistake-notebook entry in local storage before saving again.", true);
      return;
    }
    const ids = new Set();
    const validSavedItems = saved && Array.isArray(saved.items) && saved.items.every(item => {
      if (!validItem(item) || ids.has(item.id)) return false;
      ids.add(item.id);
      return true;
    });
    if (!saved || saved.version !== 1 || !validSavedItems) {
      writesAllowed = false;
      setStatus("Notebook data has an unsupported or damaged format. Your saved data was left untouched; back it up before repairing or removing the sat-mistake-notebook entry in local storage.", true);
      return;
    }
    items = saved.items.map(item => ({...item, tags:normalizedTags(item.tags)}));
  }

  function commit(nextItems, message) {
    if (!writesAllowed) {
      setStatus("This change was not saved because the existing notebook data could not be safely read.", true);
      return false;
    }
    try {
      localStorage.setItem(storageKey, JSON.stringify({version:1, items:nextItems}));
    } catch (error) {
      console.warn("Unable to save the mistake notebook.", error);
      setStatus("Notebook changes could not be saved. Check available browser storage and try again.", true);
      return false;
    }
    items = nextItems;
    setStatus(message);
    render();
    return true;
  }

  function dueItems() {
    const now = Date.now();
    return items.filter(item => !item.mastered && Date.parse(item.dueAt) <= now)
      .sort((left, right) => Date.parse(left.dueAt) - Date.parse(right.dueAt));
  }

  function dateLabel(value) {
    return new Intl.DateTimeFormat("en-US", {month:"short", day:"numeric", year:"numeric"}).format(new Date(value));
  }

  function renderCard(item, isDueCard) {
    const tags = item.tags.map(tag => `<span class="notebook-tag">${escapeHtml(tag)}</span>`).join("");
    const choiceMarkup = item.options.length
      ? `<details class="notebook-options"><summary>Show answer choices</summary><ol>${item.options.map(option => `<li>${escapeHtml(option)}</li>`).join("")}</ol></details>`
      : "";
    const reviewButtons = isDueCard ? `<div class="notebook-review-actions" aria-label="Choose your review rating">
      <button type="button" data-action="rate" data-rating="again" data-id="${escapeHtml(item.id)}" aria-label="Rate again; review in 1 day">Again</button>
      <button type="button" data-action="rate" data-rating="hard" data-id="${escapeHtml(item.id)}" aria-label="Rate hard; review in 2 days">Hard</button>
      <button type="button" data-action="rate" data-rating="good" data-id="${escapeHtml(item.id)}" aria-label="Rate good; review in 2 days or more">Good</button>
      <button type="button" data-action="rate" data-rating="easy" data-id="${escapeHtml(item.id)}" aria-label="Rate easy; review in 4 days or more">Easy</button>
    </div>` : "";
    return `<article class="notebook-card">
      <div class="notebook-card-heading"><div><span class="notebook-subject">${escapeHtml(item.subject)} · ${escapeHtml(item.topic)}</span><span class="notebook-reason">${item.status === "skipped" ? "Skipped" : "Missed"}</span></div><span class="notebook-due">${item.mastered ? "Mastered" : `Due ${escapeHtml(dateLabel(item.dueAt))}`}</span></div>
      <h3>${escapeHtml(item.question)}</h3>
      <div class="notebook-answer-grid"><p><b>Your answer</b><span>${escapeHtml(item.userAnswer || "Not answered")}</span></p><p><b>Correct answer</b><span>${escapeHtml(item.correctAnswer || "Not provided")}</span></p></div>
      ${item.explanation ? `<p class="notebook-explanation">${escapeHtml(item.explanation)}</p>` : ""}
      ${choiceMarkup}
      <div class="notebook-tags" aria-label="Question tags">${tags || '<span class="notebook-no-tags">No tags</span>'}</div>
      <form class="notebook-tag-editor" data-id="${escapeHtml(item.id)}"><label>Tags<input name="tags" value="${escapeHtml(item.tags.join(", "))}" maxlength="300" aria-label="Edit tags for this question"></label><button type="submit">Save tags</button></form>
      <div class="notebook-card-footer"><span>${escapeHtml(item.source)} · ${item.reviewCount} review${item.reviewCount === 1 ? "" : "s"}</span><div class="notebook-card-actions">
        <button type="button" data-action="master" data-id="${escapeHtml(item.id)}" ${item.mastered ? "disabled" : ""}>${item.mastered ? "Mastered" : "Mark mastered"}</button>
        <button type="button" class="notebook-delete" data-action="delete" data-id="${escapeHtml(item.id)}">Delete</button>
      </div></div>
      ${reviewButtons}
    </article>`;
  }

  function render() {
    const total = document.querySelector("#notebookTotal");
    if (!total) return;
    const due = dueItems();
    const mastered = items.filter(item => item.mastered).length;
    document.querySelector("#notebookTotal").textContent = String(items.length);
    document.querySelector("#notebookDueCount").textContent = String(due.length);
    document.querySelector("#notebookMasteredCount").textContent = String(mastered);
    document.querySelector("#notebookReviewCount").textContent = String(items.reduce((sum, item) => sum + item.reviewCount, 0));
    document.querySelector("#notebookQueueLabel").textContent = `${due.length} due`;
    document.querySelector("#notebookDueQueue").innerHTML = due.length
      ? due.map(item => renderCard(item, true)).join("")
      : '<p class="notebook-empty">You’re all caught up. Missed or skipped questions will appear here when they’re ready to review.</p>';

    const query = document.querySelector("#notebookSearch").value.trim().toLocaleLowerCase();
    const subject = document.querySelector("#notebookSubjectFilter").value;
    const status = document.querySelector("#notebookStatusFilter").value;
    const tag = document.querySelector("#notebookTagFilter").value.trim().toLocaleLowerCase();
    const filtered = items.filter(item => {
      const content = [item.question, item.topic, item.subject, item.userAnswer, item.correctAnswer, item.explanation, item.source, ...item.tags].join(" ").toLocaleLowerCase();
      return (!query || content.includes(query))
        && (subject === "all" || item.subject === subject)
        && (status === "all" || (status === "due" ? due.includes(item) : status === "mastered" ? item.mastered : !item.mastered))
        && (!tag || item.tags.some(value => value.toLocaleLowerCase().includes(tag)));
    });
    document.querySelector("#notebookFilteredCount").textContent = `${filtered.length} question${filtered.length === 1 ? "" : "s"}`;
    document.querySelector("#notebookCards").innerHTML = filtered.length
      ? filtered.map(item => renderCard(item, !item.mastered && Date.parse(item.dueAt) <= Date.now())).join("")
      : '<p class="notebook-empty">No notebook questions match these filters yet.</p>';
    document.querySelectorAll("#notebookView [data-action], #notebookView .notebook-tag-editor button").forEach(button => {
      button.disabled = !writesAllowed;
    });
    document.querySelectorAll("#notebookAddForm input, #notebookAddForm textarea, #notebookAddForm select, #notebookAddForm button").forEach(control => {
      control.disabled = !writesAllowed;
    });
  }

  function createItem(data) {
    const now = new Date();
    return {
      id:makeId(),
      sourceKey:typeof data.sourceKey === "string" && data.sourceKey ? data.sourceKey.slice(0, 300) : null,
      question:String(data.question || "").trim().slice(0, 2000),
      subject:subjects.has(data.subject) ? data.subject : "",
      topic:String(data.topic || "").trim().slice(0, 120),
      userAnswer:String(data.userAnswer || "").trim().slice(0, 500),
      correctAnswer:String(data.correctAnswer || "").trim().slice(0, 500),
      explanation:String(data.explanation || "").trim().slice(0, 2000),
      source:String(data.source || "Study session").trim().slice(0, 120),
      options:Array.isArray(data.options) ? data.options.slice(0, 4).map(option => String(option).slice(0, 500)) : [],
      status:data.status === "skipped" ? "skipped" : "incorrect",
      tags:normalizedTags(data.tags),
      createdAt:now.toISOString(),
      dueAt:new Date(now.getTime() + dayMs).toISOString(),
      reviewedAt:null,
      intervalDays:1,
      reviewCount:0,
      streak:0,
      mastered:false,
      masteredAt:null
    };
  }

  function recordMistake(data) {
    if (!data || !String(data.question || "").trim() || !subjects.has(data.subject) || !String(data.topic || "").trim()) {
      setStatus("The missed question could not be added because its question, topic, or subject is missing.", true);
      return false;
    }
    const item = createItem(data);
    if (item.sourceKey && items.some(existing => existing.sourceKey === item.sourceKey)) return false;
    return commit([item, ...items], "Question added to your mistake notebook. It will be ready to review tomorrow.");
  }

  function rateItem(item, rating) {
    const next = {...item};
    const intervals = {
      again:1,
      hard:Math.max(1, Math.ceil(item.intervalDays * 1.2)),
      good:Math.max(2, Math.ceil(item.intervalDays * 2)),
      easy:Math.max(4, Math.ceil(item.intervalDays * 3))
    };
    if (!Object.hasOwn(intervals, rating)) return false;
    next.intervalDays = intervals[rating];
    next.streak = rating === "again" ? 0 : item.streak + 1;
    next.reviewCount = item.reviewCount + 1;
    next.reviewedAt = new Date().toISOString();
    next.dueAt = new Date(Date.now() + next.intervalDays * dayMs).toISOString();
    return commit(items.map(entry => entry.id === item.id ? next : entry), `Review saved. This question is due again in ${next.intervalDays} day${next.intervalDays === 1 ? "" : "s"}.`);
  }

  function parseTags(value) {
    return normalizedTags(String(value).split(","));
  }

  function bind() {
    const root = document.querySelector("#notebookView");
    root.addEventListener("input", event => {
      if (event.target.matches("#notebookSearch, #notebookTagFilter")) render();
    });
    root.addEventListener("change", event => {
      if (event.target.matches("#notebookSubjectFilter, #notebookStatusFilter")) render();
    });
    root.addEventListener("submit", event => {
      const form = event.target;
      if (form.matches("#notebookAddForm")) {
        event.preventDefault();
        const fields = new FormData(form);
        const question = String(fields.get("question") || "").trim();
        const correctAnswer = String(fields.get("correctAnswer") || "").trim();
        if (!question || !correctAnswer) return;
        if (recordMistake({
          question,
          subject:String(fields.get("subject")),
          topic:String(fields.get("topic") || "").trim() || "General",
          userAnswer:String(fields.get("userAnswer") || ""),
          correctAnswer,
          explanation:String(fields.get("explanation") || ""),
          source:"Manual entry",
          tags:parseTags(fields.get("tags"))
        })) form.reset();
        return;
      }
      if (form.matches(".notebook-tag-editor")) {
        event.preventDefault();
        const item = items.find(entry => entry.id === form.dataset.id);
        if (!item) return;
        const tags = parseTags(new FormData(form).get("tags"));
        commit(items.map(entry => entry.id === item.id ? {...entry, tags} : entry), "Tags updated.");
      }
    });
    root.addEventListener("click", event => {
      const button = event.target.closest("button[data-action]");
      if (!button || button.disabled) return;
      const item = items.find(entry => entry.id === button.dataset.id);
      if (!item) return;
      if (button.dataset.action === "rate") {
        rateItem(item, button.dataset.rating);
      } else if (button.dataset.action === "master") {
        const mastered = !item.mastered;
        commit(items.map(entry => entry.id === item.id ? {...entry, mastered, masteredAt:mastered ? new Date().toISOString() : null} : entry), mastered ? "Question marked as mastered." : "Question returned to active reviews.");
      } else if (button.dataset.action === "delete") {
        if (!window.confirm("Delete this question from your mistake notebook? This cannot be undone.")) return;
        commit(items.filter(entry => entry.id !== item.id), "Question deleted from your notebook.");
      }
    });
  }

  function init() {
    readItems();
    bind();
    render();
  }

  window.SAT_MISTAKE_NOTEBOOK = {init, recordMistake};
})();

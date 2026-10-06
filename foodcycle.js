(() => {
  "use strict";

  const storageKey = "foodcycle-nc-demo-v1";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);

  const dateOffset = days => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + days);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const makeInitialState = () => ({
    inventory: [
      { id: "item-tomatoes", name: "Heirloom tomatoes", quantity: 3, unit: "lb", storage: "Fridge", bestBy: dateOffset(0), icon: "●", tone: "red" },
      { id: "item-spinach", name: "Baby spinach", quantity: 1, unit: "bag", storage: "Fridge", bestBy: dateOffset(1), icon: "✿", tone: "green" },
      { id: "item-strawberries", name: "Strawberries", quantity: 2, unit: "pints", storage: "Fridge", bestBy: dateOffset(2), icon: "♥", tone: "red" },
      { id: "item-sweet-potatoes", name: "Sweet potatoes", quantity: 5, unit: "lb", storage: "Pantry", bestBy: dateOffset(7), icon: "◒", tone: "gold" },
      { id: "item-milk", name: "Local whole milk", quantity: 1, unit: "jugs", storage: "Fridge", bestBy: dateOffset(3), icon: "◍", tone: "blue" },
      { id: "item-collards", name: "Collard greens", quantity: 2, unit: "bunches", storage: "Fridge", bestBy: dateOffset(4), icon: "❋", tone: "green" },
      { id: "item-eggs", name: "Farm eggs", quantity: 1, unit: "dozen", storage: "Fridge", bestBy: dateOffset(14), icon: "●", tone: "gold" },
      { id: "item-cornmeal", name: "Stone-ground cornmeal", quantity: 1, unit: "bags", storage: "Pantry", bestBy: dateOffset(46), icon: "▨", tone: "gold" }
    ],
    listings: [
      { id: "harvest-okras", farm: "Little Oak Farm · Durham", location: "Durham Farmers' Market", area: "durham", food: "Fresh okra", variety: "Just picked this morning", quantity: 5, unit: "crates", window: "Today · 2–5 pm", distance: "12 mi", icon: "✿", tone: "" },
      { id: "harvest-peaches", farm: "Sunrise Patch · Cary", location: "Cary Community Garden", area: "raleigh", food: "Carolina peaches", variety: "A sweet end-of-season basket", quantity: 3, unit: "crates", window: "Today · 3–6 pm", distance: "8 mi", icon: "●", tone: "coral" },
      { id: "harvest-squash", farm: "Pine Knot Growers · Hillsborough", location: "Hillsborough Exchange", area: "other", food: "Yellow squash", variety: "Small batch, ready to share", quantity: 7, unit: "crates", window: "Tomorrow · 9 am–noon", distance: "24 mi", icon: "◒", tone: "yellow" },
      { id: "harvest-greens", farm: "Southside Garden · Raleigh", location: "South Park Community Garden", area: "raleigh", food: "Mustard greens", variety: "Washed and bundled in bunches", quantity: 4, unit: "crates", window: "Today · 1–4 pm", distance: "4 mi", icon: "❋", tone: "" },
      { id: "harvest-peppers", farm: "Red Clay Acres · Durham", location: "East Durham Food Hub", area: "durham", food: "Sweet bell peppers", variety: "Mixed colors, ripe and ready", quantity: 6, unit: "crates", window: "Tomorrow · 10 am–2 pm", distance: "15 mi", icon: "●", tone: "coral" },
      { id: "harvest-apples", farm: "Meadow Run Farm · Pittsboro", location: "Chatham County Depot", area: "other", food: "Mountain apples", variety: "A little crisp, a little tart", quantity: 8, unit: "crates", window: "Saturday · 9 am–1 pm", distance: "28 mi", icon: "●", tone: "yellow" }
    ],
    destinations: [
      "Oak City Community Pantry · Raleigh",
      "South Park Community Fridge · Raleigh",
      "Durham Community Fridge · Durham",
      "Cary Neighbor Pantry · Cary",
      "East Durham Food Collective · Durham"
    ],
    partners: [
      {
        id: "durham-fridge", name: "Durham Community Fridge", location: "Old North Durham · Durham", icon: "D",
        needs: [
          { id: "need-black-beans", name: "Canned black beans", quantity: 12, unit: "cans", notified: false },
          { id: "need-collards", name: "Collard greens", quantity: 4, unit: "bunches", notified: false },
          { id: "need-oats", name: "Rolled oats", quantity: 6, unit: "bags", notified: false }
        ]
      },
      {
        id: "cary-neighbor", name: "Cary Neighbor Pantry", location: "Downtown Cary · Cary", icon: "C",
        needs: [
          { id: "need-sweet-potatoes", name: "Sweet potatoes", quantity: 10, unit: "lb", notified: false },
          { id: "need-cornmeal", name: "Stone-ground cornmeal", quantity: 5, unit: "bags", notified: false },
          { id: "need-canned-tomatoes", name: "Canned tomatoes", quantity: 8, unit: "cans", notified: false }
        ]
      },
      {
        id: "east-durham", name: "East Durham Food Collective", location: "East Durham · Durham", icon: "E",
        needs: [
          { id: "need-rice", name: "Brown rice", quantity: 8, unit: "bags", notified: false },
          { id: "need-peanut-butter", name: "Peanut butter", quantity: 6, unit: "jars", notified: false },
          { id: "need-soup", name: "Vegetable soup", quantity: 10, unit: "cans", notified: false }
        ]
      },
      {
        id: "chapel-table", name: "Chapel Hill Community Table", location: "Northside · Chapel Hill", icon: "H",
        needs: [
          { id: "need-milk", name: "Shelf-stable milk", quantity: 6, unit: "cartons", notified: false },
          { id: "need-apples", name: "Fresh apples", quantity: 5, unit: "lb", notified: false },
          { id: "need-oil", name: "Cooking oil", quantity: 4, unit: "bottles", notified: false }
        ]
      }
    ],
    availableStock: [
      { id: "stock-beans", name: "Canned black beans", quantity: 14, unit: "cans" },
      { id: "stock-collards", name: "Collard greens", quantity: 6, unit: "bunches" },
      { id: "stock-oats", name: "Rolled oats", quantity: 8, unit: "bags" },
      { id: "stock-sweet-potatoes", name: "Sweet potatoes", quantity: 18, unit: "lb" },
      { id: "stock-cornmeal", name: "Stone-ground cornmeal", quantity: 7, unit: "bags" },
      { id: "stock-tomatoes", name: "Canned tomatoes", quantity: 6, unit: "cans" },
      { id: "stock-rice", name: "Brown rice", quantity: 10, unit: "bags" },
      { id: "stock-peanut-butter", name: "Peanut butter", quantity: 8, unit: "jars" },
      { id: "stock-soup", name: "Vegetable soup", quantity: 12, unit: "cans" },
      { id: "stock-milk", name: "Shelf-stable milk", quantity: 8, unit: "cartons" },
      { id: "stock-apples", name: "Fresh apples", quantity: 9, unit: "lb" },
      { id: "stock-oil", name: "Cooking oil", quantity: 6, unit: "bottles" }
    ],
    activities: [],
    filter: "all",
    search: "",
    area: "all"
  });

  const readSavedState = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      const initial = makeInitialState();
      if (!saved || typeof saved !== "object") return initial;
      return {
        ...initial,
        ...saved,
        inventory: Array.isArray(saved.inventory) ? saved.inventory : initial.inventory,
        listings: Array.isArray(saved.listings) ? saved.listings : initial.listings,
        partners: Array.isArray(saved.partners) ? saved.partners : initial.partners,
        availableStock: Array.isArray(saved.availableStock) ? saved.availableStock : initial.availableStock,
        activities: Array.isArray(saved.activities) ? saved.activities.slice(0, 50) : []
      };
    } catch (error) {
      console.warn("FoodCycle could not read saved pantry data; starting with sample data.", error);
      return makeInitialState();
    }
  };

  const state = readSavedState();
  const statusNode = $("#toast");
  let toastTimeout;

  function notify(message) {
    statusNode.textContent = message;
    statusNode.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => statusNode.classList.remove("show"), 3600);
  }

  function saveState(message) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
      if (message) notify(message);
      return true;
    } catch (error) {
      console.error("Unable to save FoodCycle data in this browser.", error);
      notify("This browser could not save the change. Check available device storage and try again.");
      return false;
    }
  }

  function todayDate() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }

  function daysUntil(dateString) {
    const parts = String(dateString).split("-").map(Number);
    if (parts.length !== 3 || parts.some(number => !Number.isFinite(number))) return 0;
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    date.setHours(0, 0, 0, 0);
    return Math.round((date.getTime() - todayDate().getTime()) / 86400000);
  }

  function expiryLabel(dateString) {
    const days = daysUntil(dateString);
    if (days < 0) return { text: "Best by passed", className: "urgent" };
    if (days === 0) return { text: "Use today", className: "urgent" };
    if (days === 1) return { text: "Use tomorrow", className: "urgent" };
    if (days <= 3) return { text: `In ${days} days`, className: "urgent" };
    return { text: `In ${days} days`, className: "fresh" };
  }

  function formatLongDate(date = new Date()) {
    return new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(date);
  }

  function shortDate(dateString) {
    const parts = String(dateString).split("-").map(Number);
    if (parts.length !== 3 || parts.some(number => !Number.isFinite(number))) return "Date not set";
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(parts[0], parts[1] - 1, parts[2]));
  }

  function sortedInventory() {
    return [...state.inventory].sort((left, right) => daysUntil(left.bestBy) - daysUntil(right.bestBy));
  }

  function visibleInventory() {
    const query = state.search.trim().toLowerCase();
    return sortedInventory().filter(item => {
      const days = daysUntil(item.bestBy);
      const matchesFilter = state.filter === "all" || (state.filter === "soon" && days <= 3) || (state.filter === "fresh" && days > 3);
      const matchesSearch = !query || `${item.name} ${item.storage}`.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }

  function renderInventory() {
    const soon = state.inventory.filter(item => daysUntil(item.bestBy) <= 3).length;
    $("#soonCount").textContent = `${soon} ${soon === 1 ? "item" : "items"}`;
    $("#pantryCount").textContent = `${state.inventory.length} ${state.inventory.length === 1 ? "item" : "items"}`;
    $("#navExpiryCount").textContent = String(soon);
    $("#filterAllCount").textContent = String(state.inventory.length);
    $("#filterSoonCount").textContent = String(soon);
    const sharedThisWeek = state.activities.filter(activity => activity.type === "shared" || activity.type === "transfer").length;
    $("#sharedCount").textContent = `${sharedThisWeek} ${sharedThisWeek === 1 ? "action" : "actions"}`;

    const list = $("#inventoryList");
    const items = visibleInventory();
    $("#emptyFilter").hidden = items.length > 0;
    list.innerHTML = items.length ? items.map(item => {
      const expiry = expiryLabel(item.bestBy);
      const tone = ["red", "gold", "purple", "blue"].includes(item.tone) ? item.tone : "green";
      const days = daysUntil(item.bestBy);
      return `<article class="inventory-row">
        <div class="item-info"><span class="food-mark ${tone}" aria-hidden="true">${escapeHTML(item.icon || "✳")}</span><span><strong>${escapeHTML(item.name)}</strong><small>Best by ${escapeHTML(shortDate(item.bestBy))}</small></span></div>
        <span class="item-quantity"><span class="inventory-label">Quantity</span>${escapeHTML(item.quantity)} ${escapeHTML(item.unit)}</span>
        <span class="item-location"><span class="inventory-label">Stored in</span>${escapeHTML(item.storage)}</span>
        <span class="expiry-status ${expiry.className}" aria-label="${escapeHTML(days < 0 ? `Best by date was ${Math.abs(days)} days ago` : expiry.text)}">${escapeHTML(expiry.text)}</span>
        <div class="row-actions"><button class="row-action" data-action="use-item" data-id="${escapeHTML(item.id)}">Mark used</button><button class="row-action" data-action="share-item" data-id="${escapeHTML(item.id)}">Mark shared</button><button class="row-action remove" data-action="remove-item" data-id="${escapeHTML(item.id)}" aria-label="Remove ${escapeHTML(item.name)}">Remove</button></div>
      </article>`;
    }).join("") : "";
  }

  function renderListings() {
    const listings = state.listings.filter(listing => state.area === "all" || listing.area === state.area);
    $("#produceAvailable").textContent = `${state.listings.reduce((total, listing) => total + listing.quantity, 0)} crates`;
    const container = $("#produceList");
    container.innerHTML = listings.length ? listings.map(listing => {
      const tone = ["coral", "yellow"].includes(listing.tone) ? listing.tone : "";
      const soldOut = listing.quantity < 1;
      return `<article class="produce-card">
        <div class="produce-card-art ${tone}" aria-hidden="true"><span class="pickup-distance">${escapeHTML(listing.distance)} away</span><svg viewBox="0 0 130 80"><circle cx="65" cy="41" r="26" fill="${tone === "coral" ? "#df7656" : tone === "yellow" ? "#e2b537" : "#5b854a"}"/><path d="M61 18c-3-9 0-15 7-19 8 7 8 13 3 20M66 20c5-9 12-12 22-8-5 9-12 12-21 12" fill="#34704a"/><circle cx="56" cy="36" r="4" fill="rgb(255 255 255 / 47%)"/></svg></div>
        <div class="produce-card-content"><p class="grower-line">${escapeHTML(listing.farm)}</p><h3>${escapeHTML(listing.food)}</h3><p>${escapeHTML(listing.variety)}</p><div class="pickup-line">⌖ ${escapeHTML(listing.location)} · ${escapeHTML(listing.window)}</div><div class="produce-card-footer"><span class="produce-amount">${escapeHTML(listing.quantity)} ${escapeHTML(listing.unit)} left</span><button class="button ${soldOut ? "button-outline" : "button-primary"}" data-action="claim-listing" data-id="${escapeHTML(listing.id)}" ${soldOut ? "disabled" : ""}>${soldOut ? "All claimed" : "Claim harvest →"}</button></div></div>
      </article>`;
    }).join("") : `<div class="inventory-empty">No demo listings in this area right now. Choose another area to browse the sample board.</div>`;
  }

  function matchingStock(need) {
    return state.availableStock.filter(item => item.quantity > 0 && item.name.toLowerCase() === need.name.toLowerCase() && item.unit === need.unit);
  }

  function renderPantries() {
    const openNeeds = state.partners.reduce((count, partner) => count + partner.needs.filter(need => need.quantity > 0).length, 0);
    $("#needsOpenCount").textContent = `${openNeeds} open ${openNeeds === 1 ? "need" : "needs"}`;
    const board = $("#pantryBoard");
    const stock = state.availableStock.map(item => `<div class="stock-chip"><span class="entry-mark" aria-hidden="true"></span><strong>${escapeHTML(item.name)}</strong><small>${escapeHTML(item.quantity)} ${escapeHTML(item.unit)}</small></div>`).join("");
    const partnerCards = state.partners.map(partner => {
      const needs = partner.needs.map(need => {
        const available = matchingStock(need);
        const isOpen = need.quantity > 0;
        return `<div class="pantry-entry need"><span class="entry-mark" aria-hidden="true"></span><strong>${escapeHTML(need.name)}</strong><small>${isOpen ? `${escapeHTML(need.quantity)} ${escapeHTML(need.unit)} needed` : "Need filled"}</small><button class="button ${available.length && isOpen ? "button-primary" : "button-outline subtle"}" data-action="transfer" data-pantry="${escapeHTML(partner.id)}" data-need="${escapeHTML(need.id)}" ${!available.length || !isOpen ? "disabled" : ""}>${!isOpen ? "Filled" : available.length ? "Offer stock" : "No match"}</button><button class="button button-outline subtle notify-button" data-action="notify" data-pantry="${escapeHTML(partner.id)}" data-need="${escapeHTML(need.id)}" ${need.notified ? "disabled" : ""}>${need.notified ? "Logged" : "Notify pantry"}</button></div>`;
      }).join("");
      return `<article class="pantry-card"><div class="pantry-card-top"><div class="partner-heading"><span class="partner-mark" aria-hidden="true">${escapeHTML(partner.icon)}</span><span><strong>${escapeHTML(partner.name)}</strong><small>${escapeHTML(partner.location)}</small></span></div><span class="partner-stock-label">Sending from Oak City Pantry · Raleigh</span></div><section class="pantry-column"><div class="pantry-column-heading"><strong>Requested by this pantry</strong><span>${partner.needs.filter(need => need.quantity > 0).length} open</span></div>${needs}</section></article>`;
    }).join("");
    board.innerHTML = `<section class="pantry-card own-stock-card"><div class="pantry-card-top"><div class="partner-heading"><span class="partner-mark" aria-hidden="true">OC</span><span><strong>Oak City Community Pantry</strong><small>Raleigh, NC · Shared demo stock</small></span></div><span class="partner-stock-label">${state.availableStock.filter(item => item.quantity > 0).length} stocked foods</span></div><div class="stock-grid">${stock || `<div class="activity-empty">No available stock in the demo inventory.</div>`}</div></section>${partnerCards}`;
  }

  function renderActivity() {
    const container = $("#activityList");
    $("#activityCount").textContent = `${state.activities.length} ${state.activities.length === 1 ? "update" : "updates"}`;
    container.innerHTML = state.activities.length ? state.activities.map(activity => `<div class="activity-entry"><span class="activity-dot" aria-hidden="true">${activity.type === "notify" ? "↗" : activity.type === "transfer" || activity.type === "shared" ? "⇄" : "✳"}</span><div><strong>${escapeHTML(activity.message)}</strong><small>${escapeHTML(activity.time)}</small></div></div>`).join("") : `<p class="activity-empty">Your local activity will show here after the first claim, transfer, or demo notification.</p>`;
  }

  function renderAll() {
    renderInventory();
    renderListings();
    renderPantries();
    renderActivity();
  }

  function addActivity(type, message) {
    state.activities.unshift({ id: `activity-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`, type, message, time: `Logged ${formatLongDate()} · on this device` });
    state.activities = state.activities.slice(0, 50);
  }

  function openDialog(dialog, firstField) {
    if (!dialog.open) dialog.showModal();
    if (firstField) requestAnimationFrame(() => $(firstField, dialog)?.focus());
  }

  function openItemDialog() {
    const form = $("#itemForm");
    form.reset();
    form.elements.bestBy.value = dateOffset(3);
    $("#itemFormError").textContent = "";
    openDialog($("#itemDialog"), '[name="name"]');
  }

  function openClaimDialog(listingId) {
    const listing = state.listings.find(item => item.id === listingId);
    if (!listing || listing.quantity < 1) return;
    const form = $("#claimForm");
    form.reset();
    form.elements.listingId.value = listing.id;
    const quantity = form.elements.crates;
    quantity.max = String(listing.quantity);
    quantity.value = "1";
    $("#claimDialogTitle").textContent = `Claim ${listing.food.toLowerCase()}`;
    $("#claimDescription").textContent = `${listing.quantity} ${listing.unit} available from ${listing.farm}. Choose a sample pickup destination.`;
    $("#claimDestination").innerHTML = state.destinations.map(destination => `<option value="${escapeHTML(destination)}">${escapeHTML(destination)}</option>`).join("");
    openDialog($("#claimDialog"), '[name="crates"]');
  }

  function openTransferDialog(pantryId, needId) {
    const partner = state.partners.find(item => item.id === pantryId);
    const need = partner?.needs.find(item => item.id === needId);
    if (!partner || !need || need.quantity < 1) return;
    const stock = matchingStock(need);
    if (!stock.length) return;
    const form = $("#transferForm");
    form.reset();
    form.elements.pantryId.value = partner.id;
    form.elements.needId.value = need.id;
    $("#transferDialogTitle").textContent = `Help ${partner.name}`;
    $("#transferDescription").textContent = `${need.quantity} ${need.unit} of ${need.name.toLowerCase()} requested by ${partner.location}.`;
    $("#transferFood").innerHTML = stock.map(item => `<option value="${escapeHTML(item.id)}" data-max="${item.quantity}">${escapeHTML(item.name)} · ${escapeHTML(item.quantity)} ${escapeHTML(item.unit)} available</option>`).join("");
    form.elements.quantity.max = String(Math.min(need.quantity, stock[0].quantity));
    form.elements.quantity.value = String(Math.min(1, need.quantity, stock[0].quantity));
    openDialog($("#transferDialog"), '[name="quantity"]');
  }

  function updateQuantityLimit() {
    const form = $("#transferForm");
    const item = state.availableStock.find(entry => entry.id === form.elements.food.value);
    const partner = state.partners.find(entry => entry.id === form.elements.pantryId.value);
    const need = partner?.needs.find(entry => entry.id === form.elements.needId.value);
    if (!item || !need) return;
    form.elements.quantity.max = String(Math.min(item.quantity, need.quantity));
    if (Number(form.elements.quantity.value) > Number(form.elements.quantity.max)) form.elements.quantity.value = form.elements.quantity.max;
  }

  function handleClick(event) {
    const nav = event.target.closest("[data-view]");
    if (nav) {
      navigate(nav.dataset.view);
      return;
    }
    const filter = event.target.closest("[data-filter]");
    if (filter) {
      state.filter = filter.dataset.filter;
      $$(".filter-tab").forEach(tab => {
        const active = tab === filter;
        tab.classList.toggle("active", active);
        tab.setAttribute("aria-pressed", String(active));
      });
      renderInventory();
      return;
    }
    const action = event.target.closest("[data-action]");
    if (!action) return;
    const { action: name, id } = action.dataset;
    if (name === "add-item") openItemDialog();
    if (name === "claim-listing") openClaimDialog(id);
    if (name === "transfer") openTransferDialog(action.dataset.pantry, action.dataset.need);
    if (name === "notify") {
      const partner = state.partners.find(item => item.id === action.dataset.pantry);
      const need = partner?.needs.find(item => item.id === action.dataset.need);
      if (!partner || !need || need.notified) return;
      need.notified = true;
      addActivity("notify", `Demo notification logged for ${partner.name} about ${need.name.toLowerCase()} · no message sent`);
      renderAll();
      saveState("Notification recorded locally. No message was sent.");
    }
    if (name === "use-item" || name === "share-item" || name === "remove-item") {
      const item = state.inventory.find(entry => entry.id === id);
      if (!item) return;
      if (name === "use-item") addActivity("used", `${item.name} marked used from Oak City Pantry`);
      if (name === "share-item") addActivity("shared", `${item.quantity} ${item.unit} of ${item.name} marked shared from Oak City Pantry · local demo`);
      if (name === "remove-item") addActivity("removed", `${item.name} removed from the pantry tracker`);
      state.inventory = state.inventory.filter(entry => entry.id !== id);
      renderAll();
      saveState(name === "use-item" ? `${item.name} marked used.` : name === "share-item" ? `${item.name} marked shared in your local demo.` : `${item.name} removed from your pantry tracker.`);
    }
  }

  function navigate(view) {
    const views = { expiry: "expiryView", produce: "produceView", pantries: "pantriesView" };
    if (!views[view]) return;
    Object.entries(views).forEach(([key, id]) => {
      const section = $(`#${id}`);
      section.hidden = key !== view;
      section.classList.toggle("active-view", key === view);
    });
    $$(".nav-link").forEach(link => {
      const active = link.dataset.view === view;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    const titles = { expiry: "Expiry tracker", produce: "Community produce", pantries: "Pantry network" };
    $("#breadcrumbCurrent").textContent = titles[view];
    $("#sidebar").classList.remove("open");
    $("#mobileMenu").setAttribute("aria-expanded", "false");
    $("#mobileMenu").setAttribute("aria-label", "Open navigation");
  }

  function submitItem(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const bestBy = String(data.get("bestBy"));
    const name = String(data.get("name")).trim();
    const quantity = Number(data.get("quantity"));
    if (!name || !Number.isFinite(quantity) || quantity <= 0 || !bestBy) {
      $("#itemFormError").textContent = "Enter a food name, a quantity greater than zero, and a best-by date.";
      return;
    }
    state.inventory.push({
      id: `item-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`,
      name,
      quantity,
      unit: String(data.get("unit")),
      storage: String(data.get("storage")),
      bestBy,
      icon: "✳",
      tone: "green"
    });
    state.search = "";
    $("#itemSearch").value = "";
    renderAll();
    saveState(`${name} added to your pantry.`);
    $("#itemDialog").close();
    if (state.filter !== "all") {
      state.filter = "all";
      $$(".filter-tab").forEach(tab => {
        const active = tab.dataset.filter === "all";
        tab.classList.toggle("active", active);
        tab.setAttribute("aria-pressed", String(active));
      });
      renderInventory();
    }
  }

  function submitClaim(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const listing = state.listings.find(item => item.id === form.elements.listingId.value);
    const quantity = Number(form.elements.crates.value);
    const destination = String(form.elements.destination.value);
    if (!listing || !Number.isInteger(quantity) || quantity < 1 || quantity > listing.quantity || !state.destinations.includes(destination)) {
      notify("Choose a valid number of crates and a listed destination.");
      return;
    }
    listing.quantity -= quantity;
    addActivity("claim", `Demo claim: ${quantity} ${quantity === 1 ? "crate" : "crates"} of ${listing.food} for ${destination}`);
    renderAll();
    saveState("Demo claim saved on this device. No grower was contacted.");
    $("#claimDialog").close();
  }

  function submitTransfer(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const partner = state.partners.find(item => item.id === form.elements.pantryId.value);
    const need = partner?.needs.find(item => item.id === form.elements.needId.value);
    const stock = state.availableStock.find(item => item.id === form.elements.food.value);
    const quantity = Number(form.elements.quantity.value);
    if (!partner || !need || !stock || !Number.isInteger(quantity) || quantity < 1 || quantity > need.quantity || quantity > stock.quantity) {
      notify("That transfer exceeds the stock available or the pantry's remaining need.");
      return;
    }
    stock.quantity -= quantity;
    need.quantity -= quantity;
    addActivity("transfer", `Demo transfer: ${quantity} ${stock.unit} of ${stock.name.toLowerCase()} offered to ${partner.name}`);
    renderAll();
    saveState("Demo transfer recorded locally. No food or message was sent.");
    $("#transferDialog").close();
  }

  const today = new Date();
  $("#todayLabel").textContent = formatLongDate(today);
  $("#longDate").textContent = formatLongDate(today);

  $("#mobileMenu").addEventListener("click", () => {
    const open = $("#sidebar").classList.toggle("open");
    $("#mobileMenu").setAttribute("aria-expanded", String(open));
    $("#mobileMenu").setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  $("#itemSearch").addEventListener("input", event => {
    state.search = event.currentTarget.value;
    renderInventory();
  });
  $("#produceArea").addEventListener("change", event => {
    state.area = event.currentTarget.value;
    renderListings();
  });
  $("#transferFood").addEventListener("change", updateQuantityLimit);
  $("#transferForm").elements.quantity.addEventListener("input", updateQuantityLimit);
  $("#itemForm").addEventListener("submit", submitItem);
  $("#claimForm").addEventListener("submit", submitClaim);
  $("#transferForm").addEventListener("submit", submitTransfer);
  document.addEventListener("click", handleClick);
  $$("[data-close-dialog]").forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
  $$(".app-dialog").forEach(dialog => dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  }));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      $("#sidebar").classList.remove("open");
      $("#mobileMenu").setAttribute("aria-expanded", "false");
      $("#mobileMenu").setAttribute("aria-label", "Open navigation");
    }
  });

  $$(".filter-tab").forEach(tab => tab.setAttribute("aria-pressed", String(tab.classList.contains("active"))));
  renderAll();
})();

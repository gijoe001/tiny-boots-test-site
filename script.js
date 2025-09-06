// ========================
// Mobile Menu Toggle
// ========================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.style.display =
    navLinks.style.display === "flex" ? "none" : "flex";
});

// =========================
// Review Slider
// =========================
const cards = document.querySelectorAll(".review-card");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;

function showReview(index) {
  cards.forEach((card, i) => {
    card.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
}

// Auto cycle every 6s
setInterval(() => {
  currentIndex = (currentIndex + 1) % cards.length;
  showReview(currentIndex);
}, 6000);

// Dot navigation
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentIndex = i;
    showReview(currentIndex);
  });
});

// ========================
// Populate Available Dates
// ========================

// Your list of available dates (must exactly match Google Form options)

const availableDates = [];

function getNextSundays(weeksAhead = 3) {
  const today = new Date();

  // Find the upcoming Sunday
  const daysUntilSunday = (7 - today.getDay()) % 7;
  let nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + daysUntilSunday);

  // Helper to get day suffix
  const daySuffix = (day) => {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  // Clear the array first (in case function called multiple times)
  availableDates.length = 0;

  // Generate Sundays
  for (let i = 0; i < weeksAhead; i++) {
    const day = nextSunday.getDate();
    const month = nextSunday.toLocaleString('default', { month: 'long' });
    const year = nextSunday.getFullYear();
    availableDates.push(`Sunday ${day}${daySuffix(day)} ${month} ${year}`);
    nextSunday.setDate(nextSunday.getDate() + 7); // next Sunday
  }
}

// Call function to populate the array
getNextSundays(3);

// Populate the select dropdown
const dateSelect = document.getElementById("date");

if (dateSelect) {
  // Clear existing options first
  dateSelect.innerHTML = "";

  availableDates.forEach(date => {
    const option = document.createElement("option");
    option.value = date; // must match Google Form exactly
    option.textContent = date;
    dateSelect.appendChild(option);
  });
}

// Show thank-you message after submission
// Run after iframe finishes loading (form submission complete)
document.getElementById("hidden_iframe").addEventListener("load", function() {
    document.getElementById("thankyou-msg").style.display = "block";
    document.querySelector(".signup-form").reset();
  });
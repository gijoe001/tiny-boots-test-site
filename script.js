// ========================
// Mobile Menu Toggle
// ========================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.style.display =
    navLinks.style.display === "flex" ? "none" : "flex";
});

// ========================
// Testimonials Slider
// ========================

const grid = document.getElementById("reviewGrid");
const dotsContainer = document.getElementById("reviewDots");
const cards = grid.querySelectorAll(".review-card");

// Create dots dynamically
cards.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    grid.scrollTo({
      left: cards[i].offsetLeft,
      behavior: "smooth"
    });
  });

  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll(".dot");

// Update active dot on scroll
grid.addEventListener("scroll", () => {
  let scrollLeft = grid.scrollLeft;
  let cardWidth = cards[0].offsetWidth;
  let index = Math.round(scrollLeft / cardWidth);

  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
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
document.addEventListener("DOMContentLoaded", () => {
    console.log("☁️ AWS Cloud Friends interactive version loaded!");
  
    const infoButtons = document.querySelectorAll(".info-btn");
    infoButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const infoBox = btn.nextElementSibling;
        infoBox.classList.toggle("hidden");
        btn.textContent = infoBox.classList.contains("hidden") ? "More Info" : "Less Info";
      });
    });
  
    const themeToggle = document.getElementById("toggle-theme");
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  });
  
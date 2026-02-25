import { API_BASE } from "./config.js";

const form = document.getElementById("create-post-form");
const errorEl = document.getElementById("create-error");
const submitBtn = form.querySelector("button[type='submit']");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (errorEl) errorEl.style.display = "none";
  submitBtn.disabled = true;

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const image_url_raw = document.getElementById("image_url").value.trim();
  const image_url = image_url_raw ? image_url_raw : null;

  try {
    const res = await fetch(`${API_BASE}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, image_url })
    });

    if (!res.ok) {
      // try read server error
      const text = await res.text();
      throw new Error(`Create failed (${res.status}): ${text}`);
    }

    // success → go back to list
    window.location.href = "index.html";
  } catch (err) {
    console.error(err);
    if (errorEl) {
      errorEl.textContent = err.message;
      errorEl.style.display = "block";
    } else {
      alert(err.message);
    }
  } finally {
    submitBtn.disabled = false;
  }
});
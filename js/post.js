import { API_BASE } from "./config.js";

const container = document.getElementById("post-container");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadPost() {
  if (!id) {
    container.innerHTML = `<p style="color:#ef4444">Invalid post id.</p>`;
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/posts/${id}`);
    if (!res.ok) {
      if (res.status === 404) throw new Error("Post not found");
      throw new Error(`Failed to load post (${res.status})`);
    }
    const post = await res.json();
    const img = post.image_url ? `<img src="${post.image_url}" alt="post image" />` : "";

    container.innerHTML = `
      <div class="card">
        ${img}
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <button class="delete-btn" id="delete-btn">Delete</button>
      </div>
    `;

    document.getElementById("delete-btn").addEventListener("click", deletePost);
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p style="color:#ef4444">${err.message}</p>`;
  }
}

async function deletePost() {
  if (!confirm("Are you sure you want to delete this post?")) return;

  try {
    const res = await fetch(`${API_BASE}/posts/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Delete failed (${res.status}): ${text}`);
    }
    window.location.href = "index.html";
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

loadPost();
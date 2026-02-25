import { API_BASE } from "./config.js";

const container = document.getElementById("posts-container");

async function loadPosts() {
  try {
    const res = await fetch(`${API_BASE}/posts`);
    if (!res.ok) throw new Error(`Failed to load posts (${res.status})`);

    const posts = await res.json();
    container.innerHTML = "";

    posts.forEach((post) => {
      const img = post.image_url ? `<img src="${post.image_url}" alt="post image" />` : "";
      const preview = (post.content || "").slice(0, 140);
      container.innerHTML += `
        <div class="card">
          ${img}
          <h2>${post.title}</h2>
          <p>${preview}${post.content && post.content.length > 140 ? "..." : ""}</p>
          <a href="post.html?id=${post.id}" class="button">Read More</a>
        </div>
      `;
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p style="color:#ef4444">Error: ${err.message}</p>`;
  }
}

loadPosts();
const container = document.getElementById("post-container");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadPost() {
    const res = await fetch(`http://127.0.0.1:8000/posts/${id}`);
    const post = await res.json();

    container.innerHTML = `
        <div class="card">
            ${post.image_url ? `<img src="${post.image_url}" />` : ""}
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <button class="delete-btn" onclick="deletePost()">Delete</button>
        </div>
    `;
}

async function deletePost() {
    await fetch(`http://127.0.0.1:8000/posts/${id}`, {
        method: "DELETE"
    });

    window.location.href = "index.html";
}

loadPost();
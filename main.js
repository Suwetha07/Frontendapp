const container = document.getElementById("posts-container");

async function loadPosts() {
    const res = await fetch("http://127.0.0.1:8000/posts");
    const posts = await res.json();

    container.innerHTML = "";

    posts.forEach(post => {
        container.innerHTML += `
            <div class="card">
                ${post.image_url ? `<img src="${post.image_url}" />` : ""}
                <h2>${post.title}</h2>
                <p>${post.content.substring(0, 100)}...</p>
                <a href="post.html?id=${post.id}" class="button">Read More</a>
            </div>
        `;
    });
}

loadPosts();
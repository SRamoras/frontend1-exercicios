async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const result = await response.json();
  let posts = result.slice(0, 5);
  
  let postList = document.createElement("div");
  postList.id = "post-list";
  document.body.appendChild(postList);
  posts.forEach((post) => {
    let postsContainer = document.createElement("div");
    postsContainer.innerHTML = `
    <div>
        <p>${post.userId}</p>
        <p>${post.id}</p>
        <p>${post.title}</p>
        <p>${post.body}</p>
    </div>
    `;
    postList.appendChild(postsContainer);
  });
}

let button = document.querySelector("#get-data");

button.addEventListener("click", (e) => {
  e.preventDefault();
  getData();
});

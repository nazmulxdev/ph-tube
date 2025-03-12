// video categories

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}


const categoryContainer = document.getElementById("categoryFilter");
const displayCategories = (videoCategories) => {
    videoCategories.forEach(element => {
        const styleOfButton = ["btn", "bg-[#25252520]", "border-none", "hover:bg-[#FF1F3D]", "hover:text-white"];
        const categoryButton = document.createElement("button");
        categoryButton.classList.add(...styleOfButton)
        categoryButton.innerText = `${element.category}`;
        categoryContainer.append(categoryButton);
    });
}



const loadVideo = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
}



const displayVideos = (videos) => {
    const videoCardConatiner = document.getElementById("video-card-conatiner");
    for (let vid of videos) {
        const categoryVideoId=vid["category_id"];
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
        <div class="card bg-base-100 ">
      <figure class="rounded-md relative">
        <img class="w-[100%] h-[12.5rem] object-cover" src="${vid.thumbnail}" alt="Shoes" />
        <p class="bg-black text-white absolute px-2 bottom-2 right-2 rounded-md">3hrs 56 min ago</p>
      </figure>
      <div class="mt-4 flex gap-2">
        <div>
          <div class="avatar">
            <div class="w-12 rounded-full">
              <img src="${vid.authors[0]["profile_picture"]}" />
            </div>
          </div>
        </div>
        <div>
          <h2 class="card-title">${vid.title}</h2>
          <p class="flex">${vid.authors[0]["profile_name"]}<span class="ml-2">${vid.authors[0]["verified"] === true ? `<img src="assets/verified.png" alt=""></img>` : ``}</span></p>
          <p>${vid.others.views} views</p>
        </div>
      </div>
      <div><button class="mx-auto mt-4 btn w-[95%]">Show Details</button></div>
    </div>
`

        videoCardConatiner.append(cardDiv);
    }
}


const videoByCategory=(url)=>{
    console.log(categoryVideoId);
    const uRl="https://openapi.programming-hero.com/api/phero-tube/category/url"
    fetch("https://openapi.programming-hero.com/api/phero-tube/category/categoryId")
}






categoryContainer.addEventListener("click", (event) => {
    if (event.target.innerText === "All") {
        event.target.style.backgroundColor = "#FF1F3D"
        document.getElementById("video-card-conatiner").innerHTML = ""
        loadVideo();
    }
})











loadCategories();
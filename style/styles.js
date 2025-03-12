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
    const categoryButton = document.createElement("div");
    // categoryButton.classList.add(...styleOfButton)
    categoryButton.innerHTML = `
    <button id="btn-${element["category_id"]}" onclick="loadCategoryVideo(${element["category_id"]})" class="filter-button btn bg-[#25252520] border-none hover:bg-[#FF1F3D] hover:text-white">${element.category}</button>
    `;
    categoryContainer.append(categoryButton);
  
    console.log(categoryButton);
  });
}



const loadVideo = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
}


const loadCategoryVideo = (id) => {
  const uRl = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  fetch(uRl)
    .then(res => res.json())
    .then(data => displayVideos(data.category))
}


const displayVideos = (videos) => {
  const videoCardConatiner = document.getElementById("video-card-conatiner");

  videoCardConatiner.innerHTML = "";
  if (videos.length === 0) {
    videoCardConatiner.innerHTML = `
       <div id="no-content-sign" class="col-span-full">
      <img class="mx-auto mt-32 mb-5 w-1/4" src="assets/Icon.png" alt="">
      <p class="font-bold text-5xl text-center">Oops!! Sorry, There is no content here</p>
    </div>
    `
  }
  for (let vid of videos) {
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
    <div><button class="mx-auto mt-4 btn w-[100%]">Show Details</button></div>
    </div>
    `

    videoCardConatiner.append(cardDiv);
  }
}


categoryContainer.addEventListener("click", (event) => {
  const buttonCollection=document.getElementsByClassName("filter-button");
  console.log(buttonCollection);
  console.log(event.target);
for(let btn of buttonCollection){
  btn.classList.remove("active");
  event.target.classList.add("active")
}


  if (event.target.innerText === "All") {
    event.target.classList.add("active")
    document.getElementById("video-card-conatiner").innerHTML = ""
    loadVideo();
  }

  if(event.target.id==="categoryFilter"){
    event.target.classList.remove("active");
  }
})





loadCategories();
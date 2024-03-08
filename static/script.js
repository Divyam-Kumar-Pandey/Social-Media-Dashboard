const socialIcons = document.querySelector(".social-icons");
socialIcons.addEventListener("click", (e) => {
  // add links to social media icons
  const social = e.target;
  let goto = social.classList[1].slice(3);
  // console.log(goto);
  if (goto == "square-plus") {
    window.open("../add-new-handle", "_self");
  } else {
    window.open(`../analytics/${goto}`, "_self");
  }
});
//onclick event for .user-account
const userAccount = document.querySelector(".user-account");
if (userAccount) {
  userAccount.addEventListener("click", (e) => {
    // dropdown menu
    const dropdown = document.querySelector(".dropdown-user-account");
    dropdown.classList.toggle("show-dropdown");
    dropdown.classList.toggle("hide-dropdown");
  });
}

//onclick event for .schedule-post
const schedulePost = document.querySelectorAll(".schedule-post");
if (schedulePost) {
  schedulePost.forEach((post) => {
    post.addEventListener("click", (e) => {
      // dropdown menu
      window.open("../schedule-post", "_self");
    });
  });
}

// onclick event for .media-handle-card
const mediaHandleCard = document.querySelectorAll(".media-handle-card");
if (mediaHandleCard.length > 0) {
  for (let i = 0; i < mediaHandleCard.length; i++) {
    mediaHandleCard[i].addEventListener("click", (e) => {
      if (e.target.classList[0] !== "media-handle-card") {
        return;
      }
      // dropdown menu
      const social = e.target;
      let goto = social.children[0].children[0].children[0].classList[1].slice(3);
      console.log(goto);
      window.open(`../analytics/${goto}`, "_self");
    });
  }
}

// wait for the page to load
window.addEventListener("load", (e) => {
  getSocialMediaPosts();
  getSummary();
});

async function getSocialMediaPosts() {
  const socialMediaPosts = document.querySelector(".social-media-posts");
  if (socialMediaPosts) {
    const head = document.querySelector(".title-container .header");

    let mediaHandle = head.childNodes[1].textContent.slice(14).toLowerCase();
    let sumOfLikes = 0;
    let sumOfComments = 0;
    let sumOfShares = 0;

    let url = `../static/mock-data/MOCK_DATA_${mediaHandle}.json`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((post) => {
          sumOfLikes += post.likes;
          sumOfComments += post.comments;
          sumOfShares += post.shares;

          let card = document.createElement("div");
          card.classList.add("card");
          let cardHeader = document.createElement("div");
          cardHeader.classList.add("card-header");
          let cardBody = document.createElement("div");
          cardBody.classList.add("card-body");
          let cardFooter = document.createElement("div");
          cardFooter.classList.add("card-footer");
          let footerTop = document.createElement("div");
          footerTop.classList.add("footer-top");
          let footerBottom = document.createElement("div");
          footerBottom.classList.add("footer-bottom");
          let title = document.createElement("h4");
          title.textContent = post.title;
          let image = document.createElement("img");
          image.src = post.image;
          let paragraph = document.createElement("p");
          paragraph.textContent = post.content;
          let heart = document.createElement("i");
          heart.classList.add("fa-solid", "fa-heart");
          heart.textContent = ` ${post.likes}`;
          let hashtag = document.createElement("i");
          hashtag.classList.add("fa-solid", "fa-hashtag");
          hashtag.textContent = ` ${post.comments}`;
          let share = document.createElement("i");
          share.classList.add("fa-solid", "fa-square-share-nodes");
          share.textContent = ` ${post.shares}`;
          let clock = document.createElement("i");
          clock.classList.add("fa-solid", "fa-clock");
          clock.textContent = ` ${post.date} ${post.time}`;
          footerTop.appendChild(heart);
          footerTop.appendChild(hashtag);
          footerTop.appendChild(share);
          footerBottom.appendChild(clock);
          cardHeader.appendChild(title);
          cardBody.appendChild(image);
          cardBody.appendChild(paragraph);
          cardFooter.appendChild(footerTop);
          cardFooter.appendChild(footerBottom);
          card.appendChild(cardHeader);
          card.appendChild(cardBody);
          card.appendChild(cardFooter);
          socialMediaPosts.appendChild(card);
        });
      });

    head.childNodes[3].childNodes[1].innerHTML = `<i class="fa-solid fa-heart"></i> ${sumOfLikes}`;
    head.childNodes[3].childNodes[3].innerHTML = `<i class="fa-solid fa-hashtag"></i> ${sumOfComments}`;
    head.childNodes[3].childNodes[5].innerHTML = `<i class="fa-solid fa-square-share-nodes"></i> ${sumOfShares}`;
  }
}


function getSummary(){
  document.querySelectorAll(".media-handle-card").forEach((card) => {
    let mediaHandle = card.childNodes[1].childNodes[1].textContent.toLowerCase();
    let sumOfLikes = 0;
    let sumOfComments = 0;
    let sumOfShares = 0;

    let url = `../static/mock-data/MOCK_DATA_${mediaHandle}.json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((post) => {
          sumOfLikes += post.likes;
          sumOfComments += post.comments;
          sumOfShares += post.shares;
        });

        card.childNodes[3].childNodes[1].innerHTML = `<i class="fa-solid fa-heart"></i> ${sumOfLikes}`;
        card.childNodes[3].childNodes[3].innerHTML = `<i class="fa-solid fa-hashtag"></i> ${sumOfComments}`;
        card.childNodes[3].childNodes[5].innerHTML = `<i class="fa-solid fa-square-share-nodes"></i> ${sumOfShares}`;
      });
  });
}


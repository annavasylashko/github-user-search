//
// PM Homework 10
// Github User Search
//
// Created by Anna Vasylashko on 1.12.2021
//

var form = document.getElementById("myForm");
var profile = document.getElementById("profile");
var profileFollowers = document.createElement("button");
var profileRepos = document.createElement("button");
var userRepos = document.getElementById("userRepos");
var userFollowers = document.getElementById("userFollowers");
var userPage = document.getElementById("userPage");

// Request for github user

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit();
});

const handleSubmit = () => {
  userPage.innerHTML = "";
  profile.innerHTML = "";
  var user = document.getElementById("user").value;

  fetch(`https://api.github.com/users/${user}`)
    .then((result) => result.json())
    .then((data) => {
      if (data.message) {
        setError(data);
      } else {
        setData(data);
        console.log(data);
      }
    });
};

const setData = (data) => {
  profile.className = "profile";

  var profileImg = document.createElement("div");
  profileImg.innerHTML =
    `<img src="${data.avatar_url}"/>` || `<img src="./img/default_user.png"/>`;

  var profileInfo = document.createElement("div");
  profileInfo.className = "profileInfo";

  var profileName = document.createElement("a");
  profileName.innerHTML = data.login;
  profileName.href = data.html_url;
  profileName.target = "_blank";

  profileFollowers.innerHTML = `Followers: ${data.followers}`;

  profileRepos.innerHTML = `Repos: ${data.public_repos}`;

  var repoTitle = document.createElement("div");
  repoTitle.id = "repoTitle";

  var followerTitle = document.createElement("div");
  followerTitle.id = "followerTitle";

  profileInfo.appendChild(profileName);
  profileInfo.appendChild(profileFollowers);
  profileInfo.appendChild(profileRepos);
  profile.appendChild(profileImg);
  profile.appendChild(profileInfo);
  userPage.appendChild(profile);
  userPage.appendChild(repoTitle);
  userPage.appendChild(followerTitle);
};

const setError = (data) => {
  userPage.innerHTML = "";

  var err = document.createElement("h2");
  err.className = "text-danger";
  err.innerHTML = data.message;

  userPage.appendChild(err);
};

// Request for repositories

profileRepos.onclick = () => {
  handleReposClick();
};

const handleReposClick = () => {
  var user = document.getElementById("user").value;
  repoTitle.innerHTML = "";
  userRepos.innerHTML = "";

  fetch(`https://api.github.com/users/${user}/repos`)
    .then((result) => result.json())
    .then((repositories) => {
      setRepos(user, repositories);
    });
};

const setRepos = (user, repositories) => {
  if (repoTitle.style.display === "block") {
    repoTitle.style.display = "none";
  } else {
    repoTitle.innerHTML = "";
    repoTitle.style.display = "block";

    var title = document.createElement("h3");
    title.innerHTML = "Repositories";
    repoTitle.appendChild(title);

    repositories.forEach((repo) => {
      var repoName = document.createElement("li");
      var repoLink = document.createElement("a");

      repoLink.innerHTML = repo.name;
      repoLink.href = `https://www.github.com/${user}/${repo.name}`;
      repoLink.target = "_blank";

      repoName.appendChild(repoLink);
      userRepos.appendChild(repoName);
      repoTitle.appendChild(userRepos);
      userPage.appendChild(repoTitle);
    });
  }
};

// Request for followers

profileFollowers.onclick = () => {
  handleFollowersClick();
};

const handleFollowersClick = () => {
  var user = document.getElementById("user").value;
  followerTitle.innerHTML = "";
  userFollowers.innerHTML = "";

  fetch(`https://api.github.com/users/${user}/followers`)
    .then((result) => result.json())
    .then((followers) => {
      setFollowers(followers);
    });
};

const setFollowers = (followers) => {
  if (followerTitle.style.display === "block") {
    followerTitle.style.display = "none";
  } else {
    followerTitle.innerHTML = "";
    followerTitle.style.display = "block";

    var title = document.createElement("h3");
    title.innerHTML = "Followers";
    followerTitle.appendChild(title);

    followers.forEach((follower) => {
      var followerName = document.createElement("li");

      var followerImg = document.createElement("div");
      followerImg.innerHTML =
        `<img src="${follower.avatar_url}"/>` ||
        `<img src="./img/default_user.png"/>`;

      var followerLink = document.createElement("a");

      followerLink.innerHTML = follower.login;
      followerLink.href = follower.html_url;
      followerLink.target = "_blank";

      followerName.appendChild(followerImg);
      followerName.appendChild(followerLink);
      userFollowers.appendChild(followerName);
      followerTitle.appendChild(userFollowers);
      userPage.appendChild(followerTitle);
    });
  }
};

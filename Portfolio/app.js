document.addEventListener("DOMContentLoaded", function() {
    var initialBackgroundColor = "#252525";
    var scrolledBackgroundColor = "white";
    var initialTextColor = "white";
    var scrolledTextColor = "black";

    var profileImage = document.querySelector('.profile-image');
    var images = ['githubblack.png', 'linkedinblack.png'];
    var currentIndex = 0;

    function updateProfileImage() {
      profileImage.src = images[currentIndex];
      currentIndex = (currentIndex + 1) % images.length;
    }

    function updateColors() {
      var scrollPosition = window.scrollY || document.documentElement.scrollTop;
      var scrollThreshold = 300;

      if (scrollPosition > scrollThreshold) {
        document.body.style.backgroundColor = scrolledBackgroundColor;
        document.body.style.color = scrolledTextColor;
      } else {
        document.body.style.backgroundColor = initialBackgroundColor;
        document.body.style.color = initialTextColor;
      }
    }

    window.addEventListener('scroll', updateProfileImage);
    window.addEventListener('scroll', updateColors);
  });
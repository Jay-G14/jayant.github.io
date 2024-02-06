
var typingElement = document.querySelector(".typing");
var strings = ["Dual degree CND student", "Physics nerd", "Chess enthusiast"];
var typingSpeed = 100; 
var erasingSpeed = 60; 
var delayBetweenStrings = 2000; 
var currentStringIndex = 0;
var currentCharIndex = 0;
var isDeleting = false;

function openLinkedIn() {
    var linkedinUrl = document.getElementById("linkedin-url").getAttribute("href");
 
    window.open(linkedinUrl, "_blank");
}

function openBlogPage() {
    window.open('blog.html', '_blank');
}


function toggleLike(postId) {
    const likeButton = document.getElementById(`likeButton${postId}`);
    const likeCount = document.getElementById(`likeCount${postId}`);
    
    const isLiked = likeButton.classList.contains('active');

    if (isLiked) {
        likeButton.classList.remove('active');
        decrementLikeCount(postId);
    } else {
        likeButton.classList.add('active');
        incrementLikeCount(postId);
    }
}

function incrementLikeCount(postId) {
    let count = parseInt(localStorage.getItem(`likeCount${postId}`)) || 0;
    count++;

    updateLikeCount(postId, count);
}
function decrementLikeCount(postId) {
    let count = parseInt(localStorage.getItem(`likeCount${postId}`)) || 0;
    
    count = Math.max(0, count - 1);

    updateLikeCount(postId, count);
}

function updateLikeCount(postId, count) {
    const likeCount = document.getElementById(`likeCount${postId}`);
    likeCount.innerText = `${count} Likes`;

    localStorage.setItem(`likeCount${postId}`, count);
}

document.addEventListener('DOMContentLoaded', function() {
    for (let i = 1; i <= 2; i++) {
        const initialLikeCount = parseInt(localStorage.getItem(`likeCount${i}`)) || 0;
        updateLikeCount(i, initialLikeCount);
    }
});

function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
}

function type() {
    typingElement.textContent += strings[currentStringIndex][currentCharIndex];
    currentCharIndex++;
    if (currentCharIndex === strings[currentStringIndex].length) {
        isDeleting = true;
        setTimeout(erase, delayBetweenStrings);
    } else {
        setTimeout(type, typingSpeed);
    }
}

function erase() {
    typingElement.textContent = strings[currentStringIndex].substring(0, currentCharIndex - 1);
    currentCharIndex--;
    if (currentCharIndex === 0) {
        isDeleting = false;
        currentStringIndex = (currentStringIndex + 1) % strings.length;
    }
    setTimeout(isDeleting ? erase : type, isDeleting ? erasingSpeed : typingSpeed);
}

type();




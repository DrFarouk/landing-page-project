/**
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

// index to specify attributes and number of section
let index = 0;

// function to creat sections
function createSection() {
    index++;
    let title = document.getElementById("title");
    let paragraph = document.getElementById("paragraph");
    let content = ""
    if (index == 1) {
        content =
            `<button type="button" class="collapsible">Collapse section</button>
    <section id="about" data-nav="ABOUT PROJECT">
    <div class="landing__container">
    <h2>About this project</h2>
    <p>Dynamic Landing Page.</p>
    <ul style="text-align: left;">
    <li>All features are usable across modern desktop, tablet, and phone browsers.</li><br>
    <li>There are 3 sections on the page built dynamically & you can build more with content of your choice</li><br>
    <li>dynamically built Navigation when clicking on an item from it, the link will scroll to the appropriate section.</li><br>
    <li>The section being viewed will have active styling & also navigation item.</li><br>
    <li>Fixed Navigation bar will hide while not scrolling or moving mouse.</li><br>
    <li>A scroll to top button on the page that’s only visible when the user scrolls below the fold of the page.</li><br>
    <li>Sections are collapsible.</li>
    </ul>
    </div>
    </section>`;
    } else if (index == 2) {
        content =
            `<button type="button" class="collapsible">Collapse section</button>
    <section id="aboutMe" data-nav="ABOUT ME">
    <div class="landing__container">
    <h2>About me</h2>
    <span><img src="img/mypictr_138x138.jpg" alt="my pic"></span>
    <h3>Farouk IBRAHIM</h3>
    <p>Psychiatrist and technology geek.</p>
    <p>interests are (Psychotherapy, Web Developing, Reading, Entrepreneurship, Data Analysis, Computational Health Informatics, Bioinformatics, Machine learning, AI and Technology in general).</p>
    </div>
    </section>`;
    } else if (index == 3) {
        content =
            `<button type="button" class="collapsible">Collapse section</button>
    <section id="contact" data-nav="CONTACT">
    <div class="landing__container">
    <h2>Contact</h2>
        <div>
        <a title="Visit me on GitHub" href="https://github.com/DrFarouk"><span><img src="svg/github.svg" alt="GitHub"></span></a>
        <a title="Visit me on LinkedIn" href="https://www.linkedin.com/in/DrFarouk"><span><img src="svg/linkedin.svg" alt="LinkedIn"></span></a>
        <a title="Visit me on Facebook" href="https://www.facebook.com/profile.php?id=1444463629"><span><img src="svg/facebook.svg" alt="Facebook"></span></a>
        <a title="Visit me on Twitter" href="https://www.twitter.com/DrFarouk"><span><img src="svg/twitter.svg" alt="Twitter"></span></a>
        <a title="Visit me on Instagram" href="https://instagram.com/Dr.Farouk.ibrahim"><span><img src="svg/instagram.svg" alt="Instagram"></span></a>
        </div>
    </div>
    </section>`;
    } else {
        content =
            `<button type="button" class="collapsible">Collapse section</button>
        <section id="section${index}" data-nav="${title.value}">
        <div class="landing__container">
        <h2>${title.value}</h2>
        <p>${paragraph.value}</p>
        </div>
        </section>`;
    };
    document.querySelector("main").insertAdjacentHTML("beforeend", content);
};


/**
 * 
 * Build navigation & scroll to anchors
 * 
 */

// save navbar__list in variable
const navBarList = document.getElementById("navbar__list");

// Create Document Fragment to append the Menu List in it (for the sake of good performance)
const fragment = document.createDocumentFragment();

//Loop through each section then create a list to put a link for each section & append all that to the Fragment
function createNavItems() {
    navBarList.innerHTML = "";
    document.querySelectorAll("section").forEach((section) => {
        menuList = document.createElement('li');
        menuList.innerHTML = `<a class="menu__link" href="#${section.id}" data-id="${section.id}">${section.dataset.nav}</a>`;
        fragment.appendChild(menuList);
        //navBarList.appendChild(fragment);
    });
    navBarList.appendChild(fragment);
};

// Listener for clicking on the navBarList to do scrolling smoothly into targeted section
navBarList.addEventListener("click", (event) => {
    if (event.target.dataset.id) {
        event.preventDefault();
        document.getElementById(`${event.target.dataset.id}`).scrollIntoView({
            behavior: "smooth"
        });;
        setTimeout(() => {
            location.hash = `${event.target.dataset.id}`;
        }, 200);
    }
});

// creating more sections by click on the button
document.getElementById("add_btn").addEventListener("click", () => {
    createSection();
    createNavItems();
    clickColl();
});

/**
 * Highlights section in viewport upon scrolling
 * 
 */

// Listener for scrolling with a function to loop in every section to see if it in view then give it style of your-active-class & the link style of active-link
document.addEventListener('scroll', () => {
    document.querySelectorAll("section").forEach(function(section) {
        let sectionLink = navBarList.querySelector(`[data-id=${section.id}]`);
        if (section.getBoundingClientRect().top >= -400 && section.getBoundingClientRect().top <= 150) {
            section.classList.add('your-active-class');
            sectionLink.classList.add("active-link");
        } else {
            section.classList.remove('your-active-class');
            sectionLink.classList.remove("active-link");
        }
    });
});

/**
 * Hide fixed navigation bar while not scrolling &
 * Add a scroll to top button
 */

// save the icon used to go to the top and the header in variables
const toTop = document.getElementById("to_top");
const header = document.querySelector(".page__header");

// Clicking on the icon the document will scroll to the top smoothly
toTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/**
 * disappear the header after 4 seconds and appear again when scrolling or moving mouse.
 * appearing the icon(to_top) when the user scrolls below 40% of the page.
 */
let isScrolling;

document.onmouseout = () => {
    header.style.display = "block"
    clearTimeout(isScrolling)
    isScrolling = setTimeout(() => {
        header.style.display = "none";
    }, 4000);
};

document.onscroll = () => {
    let scrollPrecent = ((window.innerHeight + window.scrollY) / document.body.offsetHeight) * 100;
    scrollPrecent > 40 ?
        (toTop.style.display = "block") :
        (toTop.style.display = "none");
};

/**
 * function for when click on collapsible Button
 */
function clickColl() {
    let coll = document.getElementsByClassName("collapsible");
    let i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "none") {
                content.style.display = "block";
            } else {
                content.style.display = "none";
            }
        });
    };
};

/**
 * create three-section dynamically by javascript instead of HTML
 * create links for them
 */
for (let i = 1; i < 4; i++)
    createSection();
createNavItems();


//apply function for collapsible Button
clickColl();
import headlines from "./finalData.js";
import { auth } from "./firebase.js";
document.addEventListener('DOMContentLoaded', function () {
    const signupButton = document.getElementById('signup-button');
    const signoutButton = document.getElementById('signout-button');
    const messageBackground = document.getElementById('cm');
    const messageElement = document.getElementById('custom-message');

    function toggleAuthButtons(user) {
        if (signupButton && signoutButton) {
            if (user) {
                signupButton.style.display = 'none';
                signoutButton.style.display = 'inline';
            } else {
                signupButton.style.display = 'inline';
                signoutButton.style.display = 'none';
            }
        }
    }

    auth.onAuthStateChanged(user => {
        toggleAuthButtons(user);
    });

    signoutButton.addEventListener('click', () => {
        auth.signOut().then(() => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('customMessage');

            if (messageElement) {
                messageElement.textContent = ''; // Clear the text content
            }
            if (messageBackground) {
                messageBackground.style.display = 'none';
            }
            toggleAuthButtons(null);

            console.log('User signed out');
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    });

    signupButton.addEventListener('click', () => {
        window.location.href = 'login.html'; // Redirect to sign-up page
    });

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (messageBackground) {
        console.log(isLoggedIn);
        messageBackground.style.display = isLoggedIn ? 'block' : 'none';
    }
});


function isUserLoggedIn() {
    return new Promise((resolve) => {
        auth.onAuthStateChanged(user => {
            resolve(user !== null);
        });
    });
}

const messageElement = document.getElementById('custom-message');

// Pause animation on mouse enter
messageElement.addEventListener('mouseenter', () => {
    messageElement.style.animationPlayState = 'paused';
});

// Resume animation on mouse leave
messageElement.addEventListener('mouseleave', () => {
    messageElement.style.animationPlayState = 'running';
});

// Append headlines to each section
for (let i = 0; i < 3; i++) {
    let ETdiv = `<ul><li><div class="headline"><a href="${headlines["TechnologyNews"][i].url}" target="_blank">${headlines["TechnologyNews"][i].title}</a></div></li></ul>`;
    let Hindudiv = `<ul><li><div class="headline"><a href="${headlines["TechIndustry"][i].url}" target="_blank">${headlines["TechIndustry"][i].title}</a></div></li></ul>`;
    let HTdiv = `<ul><li><div class="headline"><a href="${headlines["InnovationTrends"][i].url}" target="_blank">${headlines["InnovationTrends"][i].title}</a></div></li></ul>`;
    let TOIdiv = `<ul><li><div class="headline"><a href="${headlines["GadgetsDevices"][i].url}" target="_blank">${headlines["GadgetsDevices"][i].title}</a></div></li></ul>`;
    $(".ETnews .lower").append(ETdiv);
    $(".THnews .lower").append(Hindudiv);
    $(".HTnews .lower").append(HTdiv);
    $(".TOInews .lower").append(TOIdiv);
}

// Handle modal display on click
$(".news").click(function (e) {
    if ($(this).hasClass("ETnews")) {
        appendModal("Emerging Tech", headlines["TechnologyNews"]);
    }
    else if ($(this).hasClass("THnews")) {
        appendModal("Software Updates", headlines["TechIndustry"]);
    }
    else if ($(this).hasClass("HTnews")) {
        appendModal("Tech Innovations", headlines["InnovationTrends"]);
    }
    else if ($(this).hasClass("TOInews")) {
        appendModal("Latest Gadgets", headlines["GadgetsDevices"]);
    }
});

// Function to append modal with news items
function appendModal(name, content) {
    var today = "Latest News";

    $(".news-modal-parent").remove();
    let sectionImages = {
        "Emerging Tech": "./images/emergingtech.jpg",
        "Software Updates": "./images/software.jpg",
        "Tech Innovations": "./images/startups.jpg",
        "Latest Gadgets": "./images/gadgets.jpg"
    };

    // Get the appropriate image based on the section name
    let imageUrl = sectionImages[name];

    let newModal = $(`<div class="news-modal-parent">
        <div class="news-modal-container">
            <div class="head-date-container">
                <div class="newspaper">${name}</div>
                <div class="date">${today}</div>
            </div>
            <div class="news-items-container">
                <div class="left-items">
                    ${content.slice(0, 3).map(item => `<li class="item"><a href="${item.url}" target="_blank">${item.title}</a></li>`).join('')}
                </div>
                <div class="middle-items">
                     <img class="item image" src="${imageUrl}" alt="Predefined Image" />
                   
                    ${content.slice(3, 4).map(item => `<li class="item"><a href="${item.url}" target="_blank">${item.title}</a></li>`).join('')}
                </div>
                <div class="right-items">
                    ${content.slice(4).map(item => `<li class="item"><a href="${item.url}" target="_blank">${item.title}</a></li>`).join('')}
                </div>
            </div>
             <div class="news-items-bottom"></div>
        </div>
    </div>`);

    $(".main-container").append(newModal);

    // Use event delegation to handle dynamic content
    $(document).on('click', '.head-date-container', function () {
        $(".news-modal-parent").remove();
    });

}
let flag = false;
$(".bottom-container").click(function (e) {

    $(".notes-modal-parent").toggleClass("hide");


    $(".notes-modal-parent").animate({
        height: "100vh"
    }, 800);
    $(".notes-heading").click(function () {
        $(".notes-modal-parent").animate({
            height: "0vh"
        }, 800);
    });
    let ticketIdx = 1;
    let ticketColor = ["linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)", "linear-gradient(90deg, #fcff9e 0%, #c67700 100%)", "linear-gradient(90deg, #3F2B96 0%, #A8C0FF 100%)", "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)"];
    let information1 = "This is the NOTES SECTION. You can make short notes of the tech news that you read in this application"
    let information2 = "Click to add a Personalised Note and take screenshot by clicking the below button to store the data"
    if (flag == false) {
        flag = true;
        $(".add").click(function (e) {
            let ticket = $(`<div class = "stick-note" style="background: ${ticketColor[ticketIdx % 4]};">
                                <div class="s-title">
                                    <div class = "material-icons s-close">close</div>
                                    <div class = "s-head" id = ""># Note-${ticketIdx}</div>
                                </div>
                                <div class="s-content"spellcheck = "false" data-type="false" contenteditable="true"></div>
                            </div>`);
            ticketIdx++;
            $(".notes-tickets").append(ticket);

            $(".s-close").click(function (e) {
                e.currentTarget.parentElement.parentElement.remove();
                if (ticketIdx <= 0) {
                    ticketIdx = 1;
                }
            })
        });
    }

    $(".info").mouseenter(function (e) {
        let info_data = $(`<div class="s-modal">${information1}</div>`)
        $(".info").append(info_data);
        info_data.animate({
            height: "140px"
        }, 300);
    });

    $(".info").mouseleave(function (e) {

        $(".info .s-modal").animate({
            height: "0px"
        }, 300);

        setTimeout(() => {
            $(".info .s-modal").remove();

        }, 300);
    });

    $(".add").mouseenter(function (e) {
        let add_data = $(`<div class="s-modal">${information2}</div>`)
        $(".add").append(add_data);
        add_data.animate({
            height: "140px"
        }, 300);
    });

    $(".add").mouseleave(function (e) {

        $(".add .s-modal").animate({
            height: "0px"
        }, 300);

        setTimeout(() => {
            $(".add .s-modal").remove();

        }, 300);
    });

});


$(".timeout-modal").animate({
    fontSize: "4.5em"
}, 2000);

setTimeout(() => {
    $(".timeout-modal").animate({
        height: "0vh"
    }, 4000);

}, 2000);
setTimeout(() => {
    $(".timeout-modal").addClass("hide");
}, 4000);


$(".news-ss").mouseenter(function () {
    let info_data = $(`<div class = "ss-info">Take ScreenShot</div>`)
    $(".ss").append(info_data);
    info_data.animate({
        width: "150px"
    }, 300);
});



$(".news-ss, .notes-ss").click(async function () {
    const loggedIn = await isUserLoggedIn();  // Await the promise
    if (loggedIn) {
        takeshot();
    } else {
        alert('You need to log in to take a screenshot.');
    }
});

$(".news-ss").mouseleave(function (e) {

    $(".ss-info").animate({
        width: "0px"
    }, 300);

    setTimeout(() => {
        $(".ss-info").remove();

    }, 300);
});


function takeshot() {
    let ele = document.querySelector(".main-container");

    // Use the html2canvas
    // function to take a screenshot
    // and append it
    // to the output div
    html2canvas(ele).then(
        function (canvas) {

            console.log(canvas);

            let dld = "image.png";  // download img name
            let link = canvas.toDataURL(); // all the data which is present in the canvas in the form if image is converted into URL
            let a = $(`<a href=${link} download=${dld}></a>`); // anchor tag created
            a[0].click();
            a.remove();
        })
}

document.addEventListener('DOMContentLoaded', () => {
    const customMessage = localStorage.getItem('customMessage');
    if (customMessage) {
        document.getElementById('custom-message').textContent = customMessage;
        localStorage.removeItem('customMessage'); // Optionally clear the message after displaying it
    }
});

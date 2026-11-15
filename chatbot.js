// Simple Security Assistant


function getAnswer(question) {

    question = question.toLowerCase();


    if (question.includes("https")) {

        return "HTTPS encrypts the connection between your browser and the website. It helps protect data while it is being transferred.";

    }


    if (question.includes("phishing")) {

        return "Phishing is a fake email, message or website designed to trick users into giving sensitive information.";

    }


    if (question.includes("firewall")) {

        return "A firewall controls network traffic and can block unwanted or unsafe connections.";

    }


    if (
        question.includes("password") ||
        question.includes("protect")
    ) {

        return "Use a long and unique password. Avoid using the same password on multiple websites and enable multi-factor authentication when possible.";

    }


    if (question.includes("ip")) {

        return "An IP address identifies a device or network connection. Websites can see the IP address used to connect to them.";

    }


    if (question.includes("malware")) {

        return "Malware is harmful software designed to damage systems, steal information or gain unauthorized access.";

    }


    return "I don't know that topic yet. Try asking about HTTPS, phishing, firewalls, passwords, IP addresses or malware.";

}



// Send message

function sendMessage() {

    const input =
        document.getElementById("userInput");

    const question =
        input.value.trim();


    if (question === "") {

        return;

    }


    addUserMessage(question);


    const answer =
        getAnswer(question);


    setTimeout(function () {

        addBotMessage(answer);

    }, 300);


    input.value = "";

}



// User message

function addUserMessage(message) {

    const chat =
        document.getElementById("chatMessages");


    const div =
        document.createElement("div");


    div.className = "user-message";

    div.textContent = message;


    chat.appendChild(div);


    chat.scrollTop =
        chat.scrollHeight;

}



// Bot message

function addBotMessage(message) {

    const chat =
        document.getElementById("chatMessages");


    const div =
        document.createElement("div");


    div.className = "bot-message";


    div.innerHTML = `

        <strong>
            Security Assistant
        </strong>

        <p>
            ${message}
        </p>

    `;


    chat.appendChild(div);


    chat.scrollTop =
        chat.scrollHeight;

}



// Quick question

function askQuestion(question) {

    document.getElementById(
        "userInput"
    ).value = question;


    sendMessage();

}



// Logout

document.getElementById(
    "logoutButton"
).addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "isLoggedIn"
        );

        window.location.href =
            "index.html";

    }
);
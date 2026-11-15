// Scan History


function showHistory() {

    const historyList =
        document.getElementById("historyList");


    const history =
        JSON.parse(
            localStorage.getItem("scanHistory")
        ) || [];


    if (history.length === 0) {

        historyList.innerHTML = `
            <div class="empty-history">

                <h3>No scans yet</h3>

                <p>
                    Your completed website scans
                    will appear here.
                </p>

            </div>
        `;

        return;
    }


    historyList.innerHTML = "";


    history.forEach(function (scan) {

        let status = "Good";

        if (scan.score < 70) {
            status = "Needs Review";
        }


        const scanItem =
            document.createElement("div");

        scanItem.className =
            "history-item";


        scanItem.innerHTML = `

            <div>

                <h3>
                    ${scan.website}
                </h3>

                <p>
                    ${scan.date}
                </p>

            </div>


            <div class="history-score">

                <strong>
                    ${scan.score}/100
                </strong>

                <span>
                    ${status}
                </span>

            </div>

        `;


        historyList.appendChild(scanItem);

    });

}


// Clear history

function clearHistory() {

    localStorage.removeItem(
        "scanHistory"
    );

    showHistory();

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


// Load history

showHistory();
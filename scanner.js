// ==========================================
// SIMPLE SECURITY SCANNER
// ==========================================


// Get HTML elements

const scanButton =
    document.getElementById("scanButton");

const websiteUrl =
    document.getElementById("websiteUrl");

const scanResults =
    document.getElementById("scanResults");


// ==========================================
// START SCAN
// ==========================================

scanButton.addEventListener(
    "click",
    function () {


        // Get the URL

        const url =
            websiteUrl.value.trim();


        // Check empty input

        if (url === "") {

            alert(
                "Please enter a website URL."
            );

            return;

        }


        // Check URL format

        if (
            !url.startsWith("http://") &&
            !url.startsWith("https://")
        ) {

            alert(
                "Please enter a valid URL."
            );

            return;

        }


        // Show results

        scanResults.classList.remove(
            "hidden"
        );


        // Show website

        document.getElementById(
            "scannedWebsite"
        ).textContent = url;


        // ==================================
        // SECURITY CHECKS
        // ==================================

        let score = 100;

        let passed = 0;

        let warnings = 0;

        let issues = 0;


        // Check HTTPS

        if (url.startsWith("https://")) {

            passed++;

            document.getElementById(
                "httpsStatus"
            ).textContent = "PASS";

            document.getElementById(
                "httpsStatus"
            ).className =
                "finding-status status-pass";


            document.getElementById(
                "httpsIcon"
            ).className =
                "finding-icon pass";


        } else {

            score = score - 30;

            issues++;


            document.getElementById(
                "httpsStatus"
            ).textContent = "FAIL";

            document.getElementById(
                "httpsStatus"
            ).className =
                "finding-status status-fail";


            document.getElementById(
                "httpsIcon"
            ).textContent = "!";

            document.getElementById(
                "httpsIcon"
            ).className =
                "finding-icon fail";

        }


        // URL check

        passed++;


        // Connection check

        if (url.startsWith("https://")) {

            passed++;

            document.getElementById(
                "connectionStatus"
            ).textContent = "PASS";

            document.getElementById(
                "connectionStatus"
            ).className =
                "finding-status status-pass";


            document.getElementById(
                "connectionIcon"
            ).className =
                "finding-icon pass";


            document.getElementById(
                "connectionText"
            ).textContent =
                "The website uses an encrypted HTTPS connection.";

        } else {

            warnings++;

            score = score - 10;


            document.getElementById(
                "connectionStatus"
            ).textContent = "WARNING";

            document.getElementById(
                "connectionStatus"
            ).className =
                "finding-status status-warning";


            document.getElementById(
                "connectionIcon"
            ).textContent = "!";

            document.getElementById(
                "connectionIcon"
            ).className =
                "finding-icon warning";


            document.getElementById(
                "connectionText"
            ).textContent =
                "The website is using an unencrypted HTTP connection.";

        }


        // Make sure score is not below zero

        if (score < 0) {

            score = 0;

        }


        // ==================================
        // DISPLAY RESULTS
        // ==================================

        document.getElementById(
            "scanScore"
        ).textContent = score;


        document.getElementById(
            "passedCount"
        ).textContent = passed;


        document.getElementById(
            "warningCount"
        ).textContent = warnings;


        document.getElementById(
            "issueCount"
        ).textContent = issues;


        // ==================================
        // SAVE SCORE
        // ==================================

        localStorage.setItem(
            "securityScore",
            score
        );


        // ==================================
        // SAVE SCAN COUNT
        // ==================================

        let scanCount =
            Number(
                localStorage.getItem(
                    "websitesScanned"
                )
            ) || 0;


        scanCount++;


        localStorage.setItem(
            "websitesScanned",
            scanCount
        );


        // ==================================
        // SAVE ISSUES
        // ==================================

        let oldIssues =
            Number(
                localStorage.getItem(
                    "issuesFound"
                )
            ) || 0;


        oldIssues = oldIssues + issues;


        localStorage.setItem(
            "issuesFound",
            oldIssues
        );


        // Scroll to results

        scanResults.scrollIntoView({
            behavior: "smooth"
        });

    }
);


// ==========================================
// LOGOUT
// ==========================================

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "isLoggedIn"
            );

            window.location.href =
                "index.html";

        }
    );

}
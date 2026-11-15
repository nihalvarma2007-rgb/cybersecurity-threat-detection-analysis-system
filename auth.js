/* =========================================================

   CYBERGUARD AUTHENTICATION SYSTEM

   Cybersecurity Threat Detection & Analysis System

   ========================================================= */





/* =========================================================

   STORAGE KEYS

   ========================================================= */



const USERS_KEY = "webSecurityUsers";

const CURRENT_USER_KEY = "webSecurityCurrentUser";

const LOGIN_KEY = "webSecurityLoggedIn";



const RESET_EMAIL_KEY = "webSecurityResetEmail";

const VERIFICATION_CODE_KEY = "webSecurityVerificationCode";



const REMEMBER_EMAIL_KEY = "webSecurityRememberEmail";





/* =========================================================

   GET USERS

   ========================================================= */



function getUsers() {



    const data =

        localStorage.getItem(USERS_KEY);



    if (!data) {

        return [];

    }



    try {



        const users = JSON.parse(data);



        return Array.isArray(users)

            ? users

            : [];



    } catch (error) {



        console.error(

            "Unable to read users:",

            error

        );



        return [];

    }

}





/* =========================================================

   SAVE USERS

   ========================================================= */



function saveUsers(users) {



    localStorage.setItem(

        USERS_KEY,

        JSON.stringify(users)

    );

}





/* =========================================================

   EMAIL VALIDATION

   ========================================================= */



function isValidEmail(email) {



    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        .test(email);

}





/* =========================================================

   MESSAGE

   ========================================================= */



function showMessage(

    element,

    message,

    type = ""

) {



    if (!element) {

        return;

    }



    element.textContent =

        message;



    element.className =

        "message";



    if (type) {



        element.classList.add(type);



    }

}





/* =========================================================

   CLEAR MESSAGES

   ========================================================= */



function clearMessages() {



    document

        .querySelectorAll(".message")

        .forEach(function (element) {



            element.textContent = "";



            element.className =

                "message";



        });

}





/* =========================================================

   AUTH SECTIONS

   ========================================================= */



const AUTH_SECTIONS = [

    "loginSection",

    "createAccountSection",

    "forgotSection",

    "verificationSection",

    "resetSection"

];





function hideAllSections() {



    AUTH_SECTIONS.forEach(

        function (id) {



            const section =

                document.getElementById(id);



            if (section) {



                section.classList.add(

                    "hidden"

                );



            }



        }

    );

}





/* =========================================================

   SHOW LOGIN

   ========================================================= */



function showLogin() {



    hideAllSections();



    const section =

        document.getElementById(

            "loginSection"

        );



    if (section) {



        section.classList.remove(

            "hidden"

        );



    }



    clearMessages();

}





/* =========================================================

   SHOW CREATE ACCOUNT

   ========================================================= */



function showCreateAccount() {



    hideAllSections();



    const section =

        document.getElementById(

            "createAccountSection"

        );



    if (section) {



        section.classList.remove(

            "hidden"

        );



    }



    clearMessages();

}





/* =========================================================

   SHOW FORGOT PASSWORD

   ========================================================= */



function showForgotPassword() {



    hideAllSections();



    const section =

        document.getElementById(

            "forgotSection"

        );



    if (section) {



        section.classList.remove(

            "hidden"

        );



    }



    clearMessages();

}





/* =========================================================

   SHOW VERIFICATION

   ========================================================= */



function showVerification() {



    hideAllSections();



    const section =

        document.getElementById(

            "verificationSection"

        );



    if (section) {



        section.classList.remove(

            "hidden"

        );



    }



    clearMessages();

}





/* =========================================================

   SHOW RESET PASSWORD

   ========================================================= */



function showResetPassword() {



    hideAllSections();



    const section =

        document.getElementById(

            "resetSection"

        );



    if (section) {



        section.classList.remove(

            "hidden"

        );



    }



    clearMessages();

}





/* =========================================================

   PASSWORD HASH

   ========================================================= */



async function hashPassword(password) {



    if (

        window.crypto &&

        window.crypto.subtle

    ) {



        const encoder =

            new TextEncoder();



        const data =

            encoder.encode(password);



        const hash =

            await crypto.subtle.digest(

                "SHA-256",

                data

            );



        const bytes =

            new Uint8Array(hash);



        return Array

            .from(bytes)

            .map(function (byte) {



                return byte

                    .toString(16)

                    .padStart(2, "0");



            })

            .join("");

    }





    /*

       Fallback for local testing.

    */



    return btoa(

        unescape(

            encodeURIComponent(password)

        )

    );

}





/* =========================================================

   CREATE ACCOUNT

   ========================================================= */



async function createAccount(event) {



    event.preventDefault();





    const name =

        document.getElementById(

            "fullName"

        );



    const email =

        document.getElementById(

            "registerEmail"

        );



    const password =

        document.getElementById(

            "registerPassword"

        );



    const confirmPassword =

        document.getElementById(

            "confirmPassword"

        );



    const terms =

        document.getElementById(

            "terms"

        );



    const message =

        document.getElementById(

            "registerMessage"

        );





    /* =========================

       NAME

       ========================= */



    const fullName =

        name.value.trim();





    if (!fullName) {



        showMessage(

            message,

            "Please enter your full name.",

            "error"

        );



        name.focus();



        return;

    }





    /* =========================

       EMAIL

       ========================= */



    const userEmail =

        email.value

            .trim()

            .toLowerCase();





    if (!isValidEmail(userEmail)) {



        showMessage(

            message,

            "Please enter a valid email address.",

            "error"

        );



        email.focus();



        return;

    }





    /* =========================

       PASSWORD

       ========================= */



    const userPassword =

        password.value;





    if (userPassword.length < 8) {



        showMessage(

            message,

            "Password must contain at least 8 characters.",

            "error"

        );



        password.focus();



        return;

    }





    /* =========================

       CONFIRM PASSWORD

       ========================= */



    if (

        userPassword !==

        confirmPassword.value

    ) {



        showMessage(

            message,

            "Passwords do not match.",

            "error"

        );



        confirmPassword.focus();



        return;

    }





    /* =========================

       SECURITY POLICY

       ========================= */



    if (!terms.checked) {



        showMessage(

            message,

            "Please accept the security policy.",

            "error"

        );



        return;

    }





    /* =========================

       CHECK EXISTING USERS

       ========================= */



    const users =

        getUsers();





    const existingUser =

        users.find(function (user) {



            return (

                user.email &&

                user.email

                    .toLowerCase() ===

                userEmail

            );



        });





    if (existingUser) {



        showMessage(

            message,

            "An account with this email already exists.",

            "error"

        );



        email.focus();



        return;

    }





    /* =========================

       HASH PASSWORD

       ========================= */



    const passwordHash =

        await hashPassword(

            userPassword

        );





    /* =========================

       CREATE USER

       ========================= */



    const newUser = {



        id:

            Date.now(),



        name:

            fullName,



        email:

            userEmail,



        passwordHash:

            passwordHash,



        createdAt:

            new Date().toISOString()



    };





    users.push(newUser);



    saveUsers(users);





    /* =========================

       SUCCESS

       ========================= */



    showMessage(

        message,

        "Account created successfully.",

        "success"

    );





    setTimeout(

        function () {



            showLogin();



            const loginEmail =

                document.getElementById(

                    "email"

                );



            if (loginEmail) {



                loginEmail.value =

                    userEmail;



            }



        },

        1200

    );

}





/* =========================================================

   LOGIN

   ========================================================= */



async function loginUser(event) {



    event.preventDefault();





    const emailInput =

        document.getElementById(

            "email"

        );



    const passwordInput =

        document.getElementById(

            "password"

        );



    const rememberMe =

        document.getElementById(

            "rememberMe"

        );



    const message =

        document.getElementById(

            "loginMessage"

        );





    const email =

        emailInput.value

            .trim()

            .toLowerCase();





    const password =

        passwordInput.value;





    /* =========================

       VALIDATION

       ========================= */



    if (!isValidEmail(email)) {



        showMessage(

            message,

            "Please enter a valid email address.",

            "error"

        );



        emailInput.focus();



        return;

    }





    if (!password) {



        showMessage(

            message,

            "Please enter your password.",

            "error"

        );



        passwordInput.focus();



        return;

    }





    /* =========================

       FIND USER

       ========================= */



    const users =

        getUsers();





    const passwordHash =

        await hashPassword(

            password

        );





    const user =

        users.find(function (item) {



            if (!item.email) {

                return false;

            }





            const sameEmail =

                item.email

                    .toLowerCase() ===

                email;





            /*

               Support both:

               - new passwordHash accounts

               - older accounts using password

            */



            const newPasswordMatch =

                item.passwordHash ===

                passwordHash;





            const oldPasswordMatch =

                item.password ===

                password;





            return (

                sameEmail &&

                (

                    newPasswordMatch ||

                    oldPasswordMatch

                )

            );



        });





    /* =========================

       INVALID LOGIN

       ========================= */



    if (!user) {



        showMessage(

            message,

            "Invalid email or password.",

            "error"

        );



        return;

    }





    /* =========================

       CURRENT USER

       ========================= */



    const currentUser = {



        id:

            user.id,



        name:

            user.name,



        email:

            user.email



    };





    localStorage.setItem(

        CURRENT_USER_KEY,

        JSON.stringify(currentUser)

    );





    localStorage.setItem(

        LOGIN_KEY,

        "true"

    );





    /* =========================

       REMEMBER EMAIL

       ========================= */



    if (rememberMe.checked) {



        localStorage.setItem(

            REMEMBER_EMAIL_KEY,

            email

        );



    } else {



        localStorage.removeItem(

            REMEMBER_EMAIL_KEY

        );

    }





    /* =========================

       SUCCESS

       ========================= */



    showMessage(

        message,

        "Authentication successful. Opening security console...",

        "success"

    );





    setTimeout(

        function () {



            window.location.href =

                "dashboard.html";



        },

        900

    );

}





/* =========================================================

   FORGOT PASSWORD

   ========================================================= */



function requestPasswordReset(event) {



    event.preventDefault();





    const emailInput =

        document.getElementById(

            "forgotEmail"

        );



    const message =

        document.getElementById(

            "forgotMessage"

        );





    const email =

        emailInput.value

            .trim()

            .toLowerCase();





    /* =========================

       VALIDATE EMAIL

       ========================= */



    if (!isValidEmail(email)) {



        showMessage(

            message,

            "Please enter a valid email address.",

            "error"

        );



        emailInput.focus();



        return;

    }





    /* =========================

       FIND USER

       ========================= */



    const users =

        getUsers();





    const user =

        users.find(function (item) {



            return (

                item.email &&

                item.email

                    .toLowerCase() ===

                email

            );



        });





    if (!user) {



        showMessage(

            message,

            "No account was found with this email.",

            "error"

        );



        return;

    }





    /* =========================

       GENERATE CODE

       ========================= */



    const code =

        Math.floor(

            100000 +

            Math.random() * 900000

        ).toString();





    localStorage.setItem(

        RESET_EMAIL_KEY,

        email

    );





    localStorage.setItem(

        VERIFICATION_CODE_KEY,

        code

    );





    /*

       No email server is available in

       the current project.



       Therefore the code is displayed

       for demonstration.

    */



    showMessage(

        message,

        "Verification code: " + code,

        "success"

    );





    setTimeout(

        function () {



            showVerification();



        },

        1200

    );

}





/* =========================================================

   VERIFY CODE

   ========================================================= */



function verifyCode(event) {



    event.preventDefault();





    const codeInput =

        document.getElementById(

            "verificationCode"

        );



    const message =

        document.getElementById(

            "verificationMessage"

        );





    const enteredCode =

        codeInput.value.trim();





    const savedCode =

        localStorage.getItem(

            VERIFICATION_CODE_KEY

        );





    /* =========================

       VALIDATE FORMAT

       ========================= */



    if (!/^\d{6}$/.test(enteredCode)) {



        showMessage(

            message,

            "Enter the 6-digit verification code.",

            "error"

        );



        return;

    }





    /* =========================

       CHECK CODE

       ========================= */



    if (

        !savedCode ||

        enteredCode !== savedCode

    ) {



        showMessage(

            message,

            "Invalid verification code.",

            "error"

        );



        return;

    }





    showMessage(

        message,

        "Identity verified successfully.",

        "success"

    );





    setTimeout(

        function () {



            showResetPassword();



        },

        700

    );

}





/* =========================================================

   RESET PASSWORD

   ========================================================= */



async function resetPassword(event) {



    event.preventDefault();





    const newPassword =

        document.getElementById(

            "newPassword"

        ).value;



    const confirmPassword =

        document.getElementById(

            "confirmNewPassword"

        ).value;



    const message =

        document.getElementById(

            "resetMessage"

        );





    const resetEmail =

        localStorage.getItem(

            RESET_EMAIL_KEY

        );





    /* =========================

       VALIDATE PASSWORD

       ========================= */



    if (newPassword.length < 8) {



        showMessage(

            message,

            "Password must contain at least 8 characters.",

            "error"

        );



        return;

    }





    if (

        newPassword !==

        confirmPassword

    ) {



        showMessage(

            message,

            "Passwords do not match.",

            "error"

        );



        return;

    }





    if (!resetEmail) {



        showMessage(

            message,

            "Password recovery session expired.",

            "error"

        );



        return;

    }





    /* =========================

       FIND USER

       ========================= */



    const users =

        getUsers();





    const userIndex =

        users.findIndex(

            function (user) {



                return (

                    user.email &&

                    user.email

                        .toLowerCase() ===

                    resetEmail

                );



            }

        );





    if (userIndex === -1) {



        showMessage(

            message,

            "User account was not found.",

            "error"

        );



        return;

    }





    /* =========================

       UPDATE PASSWORD

       ========================= */



    users[userIndex].passwordHash =

        await hashPassword(

            newPassword

        );





    /*

       Remove old plaintext password

       if this was an older account.

    */



    delete users[userIndex].password;





    saveUsers(users);





    /* =========================

       CLEAR RESET SESSION

       ========================= */



    localStorage.removeItem(

        RESET_EMAIL_KEY

    );



    localStorage.removeItem(

        VERIFICATION_CODE_KEY

    );





    /* =========================

       SUCCESS

       ========================= */



    showMessage(

        message,

        "Password reset successfully.",

        "success"

    );





    setTimeout(

        function () {



            showLogin();



        },

        1200

    );

}





/* =========================================================

   PASSWORD VISIBILITY

   ========================================================= */



function togglePassword(button) {



    const targetId =

        button.dataset.target;





    const input =

        document.getElementById(

            targetId

        );





    if (!input) {

        return;

    }





    if (input.type === "password") {



        input.type = "text";



        button.textContent =

            "Hide";



    } else {



        input.type = "password";



        button.textContent =

            "Show";

    }

}





/* =========================================================

   PASSWORD STRENGTH

   ========================================================= */



function updatePasswordStrength() {



    const password =

        document.getElementById(

            "registerPassword"

        );



    const bar =

        document.getElementById(

            "strengthBar"

        );



    const text =

        document.getElementById(

            "strengthText"

        );





    if (

        !password ||

        !bar ||

        !text

    ) {



        return;



    }





    const value =

        password.value;





    let score = 0;





    if (value.length >= 8) {

        score++;

    }



    if (/[A-Z]/.test(value)) {

        score++;

    }



    if (/[a-z]/.test(value)) {

        score++;

    }



    if (/[0-9]/.test(value)) {

        score++;

    }



    if (/[^A-Za-z0-9]/.test(value)) {

        score++;

    }





    const widths = [

        "0%",

        "20%",

        "40%",

        "60%",

        "80%",

        "100%"

    ];





    bar.style.width =

        widths[score];





    if (score <= 1) {



        bar.style.background =

            "#ff3045";



        text.textContent =

            "Weak password.";



    }



    else if (score === 2) {



        bar.style.background =

            "#ff9d00";



        text.textContent =

            "Fair password.";



    }



    else if (score === 3) {



        bar.style.background =

            "#f0d000";



        text.textContent =

            "Good password.";



    }



    else if (score === 4) {



        bar.style.background =

            "#32d6a0";



        text.textContent =

            "Strong password.";



    }



    else {



        bar.style.background =

            "#00eaff";



        text.textContent =

            "Excellent password.";



    }

}





/* =========================================================

   DEMO ACCOUNT

   ========================================================= */



async function createDemoAccount() {



    const demoEmail =

        "demo@cyberguard.local";





    const demoPassword =

        "Cyber@12345";





    const users =

        getUsers();





    let demoUser =

        users.find(

            function (user) {



                return (

                    user.email &&

                    user.email

                        .toLowerCase() ===

                    demoEmail

                );



            }

        );





    /* =========================

       CREATE DEMO IF NECESSARY

       ========================= */



    if (!demoUser) {



        demoUser = {



            id:

                "demo-account",



            name:

                "CyberGuard Analyst",



            email:

                demoEmail,



            passwordHash:

                await hashPassword(

                    demoPassword

                ),



            createdAt:

                new Date().toISOString()



        };





        users.push(

            demoUser

        );



        saveUsers(users);

    }





    /* =========================

       FILL LOGIN

       ========================= */



    const email =

        document.getElementById(

            "email"

        );



    const password =

        document.getElementById(

            "password"

        );





    email.value =

        demoEmail;



    password.value =

        demoPassword;





    showMessage(

        document.getElementById(

            "loginMessage"

        ),

        "Demo credentials loaded. Click Sign In Securely.",

        "success"

    );

}





/* =========================================================

   GOOGLE LOGIN

   ========================================================= */



function googleLogin() {



    /*

       IMPORTANT:



       This is a LOCAL DEMONSTRATION of the

       Google authentication flow.



       Real Google OAuth requires:

       - Google Cloud project

       - OAuth Client ID

       - Authorized redirect URI

       - Backend/session handling



       We are not pretending this is real

       Google OAuth.

    */





    const googleUser = {



        id:

            "google-demo-" +

            Date.now(),



        name:

            "Google Security Analyst",



        email:

            "google.user@cyberguard.local",



        provider:

            "Google"



    };





    localStorage.setItem(

        CURRENT_USER_KEY,

        JSON.stringify(

            googleUser

        )

    );





    localStorage.setItem(

        LOGIN_KEY,

        "true"

    );





    showMessage(

        document.getElementById(

            "loginMessage"

        ),

        "Google authentication successful. Opening security console...",

        "success"

    );





    setTimeout(

        function () {



            window.location.href =

                "dashboard.html";



        },

        900

    );

}





/* =========================================================

   LOGOUT

   ========================================================= */



function logoutUser() {



    localStorage.removeItem(

        CURRENT_USER_KEY

    );



    localStorage.removeItem(

        LOGIN_KEY

    );



    localStorage.removeItem(

        RESET_EMAIL_KEY

    );



    localStorage.removeItem(

        VERIFICATION_CODE_KEY

    );





    window.location.href =

        "index.html";

}





/* =========================================================

   CHECK LOGIN

   ========================================================= */



function isLoggedIn() {



    return (

        localStorage.getItem(

            LOGIN_KEY

        ) === "true"

    );

}





/* =========================================================

   GET CURRENT USER

   ========================================================= */



function getCurrentUser() {



    const data =

        localStorage.getItem(

            CURRENT_USER_KEY

        );





    if (!data) {

        return null;

    }





    try {



        return JSON.parse(

            data

        );



    } catch (error) {



        return null;



    }

}





/* =========================================================

   PROTECT DASHBOARD

   ========================================================= */



function requireLogin() {



    if (!isLoggedIn()) {



        window.location.href =

            "index.html";



        return false;

    }





    return true;

}





/* =========================================================

   SYSTEM CLOCK

   ========================================================= */



function updateSystemClock() {



    const clock =

        document.getElementById(

            "systemTime"

        );





    if (!clock) {

        return;

    }





    const now =

        new Date();





    clock.textContent =

        now.toLocaleTimeString(

            "en-IN",

            {

                hour12: false

            }

        );

}





/* =========================================================

   NETWORK BACKGROUND

   ========================================================= */



function initializeNetwork() {



    const canvas =

        document.getElementById(

            "networkCanvas"

        );





    if (!canvas) {

        return;

    }





    const ctx =

        canvas.getContext(

            "2d"

        );





    let width =

        canvas.width =

        window.innerWidth;



    let height =

        canvas.height =

        window.innerHeight;





    const particles = [];





    const particleCount =

        Math.min(

            65,

            Math.floor(

                window.innerWidth / 18

            )

        );





    /* =========================

       CREATE PARTICLES

       ========================= */



    for (

        let i = 0;

        i < particleCount;

        i++

    ) {



        particles.push({



            x:

                Math.random() *

                width,



            y:

                Math.random() *

                height,



            vx:

                (

                    Math.random() -

                    0.5

                ) * 0.25,



            vy:

                (

                    Math.random() -

                    0.5

                ) * 0.25,



            radius:

                Math.random() *

                1.5 +

                0.4



        });



    }





    /* =========================

       RESIZE

       ========================= */



    window.addEventListener(

        "resize",

        function () {



            width =

                canvas.width =

                window.innerWidth;



            height =

                canvas.height =

                window.innerHeight;



        }

    );





    /* =========================

       ANIMATION

       ========================= */



    function drawNetwork() {



        ctx.clearRect(

            0,

            0,

            width,

            height

        );





        /* =========================

           PARTICLES

           ========================= */



        particles.forEach(

            function (particle) {



                particle.x +=

                    particle.vx;



                particle.y +=

                    particle.vy;





                if (

                    particle.x < 0 ||

                    particle.x > width

                ) {



                    particle.vx *= -1;



                }





                if (

                    particle.y < 0 ||

                    particle.y > height

                ) {



                    particle.vy *= -1;



                }





                ctx.beginPath();





                ctx.arc(

                    particle.x,

                    particle.y,

                    particle.radius,

                    0,

                    Math.PI * 2

                );





                ctx.fillStyle =

                    "rgba(0,234,255,0.55)";





                ctx.fill();



            }

        );





        /* =========================

           CONNECTIONS

           ========================= */



        for (

            let i = 0;

            i < particles.length;

            i++

        ) {



            for (

                let j = i + 1;

                j < particles.length;

                j++

            ) {



                const dx =

                    particles[i].x -

                    particles[j].x;





                const dy =

                    particles[i].y -

                    particles[j].y;





                const distance =

                    Math.sqrt(

                        dx * dx +

                        dy * dy

                    );





                if (

                    distance < 120

                ) {



                    const opacity =

                        0.09 -

                        (

                            distance /

                            1200

                        );





                    ctx.beginPath();





                    ctx.moveTo(

                        particles[i].x,

                        particles[i].y

                    );





                    ctx.lineTo(

                        particles[j].x,

                        particles[j].y

                    );





                    ctx.strokeStyle =

                        "rgba(0,234,255," +

                        opacity +

                        ")";





                    ctx.lineWidth =

                        1;





                    ctx.stroke();



                }



            }



        }





        requestAnimationFrame(

            drawNetwork

        );



    }





    drawNetwork();

}





/* =========================================================

   PAGE INITIALIZATION

   ========================================================= */



document.addEventListener(

    "DOMContentLoaded",

    function () {



        /* =================================================

           CLOCK

           ================================================= */



        updateSystemClock();





        setInterval(

            updateSystemClock,

            1000

        );





        /* =================================================

           BACKGROUND

           ================================================= */



        initializeNetwork();





        /* =================================================

           LOGIN FORM

           ================================================= */



        const loginForm =

            document.getElementById(

                "loginForm"

            );





        if (loginForm) {



            loginForm.addEventListener(

                "submit",

                loginUser

            );



        }





        /* =================================================

           REGISTER FORM

           ================================================= */



        const registerForm =

            document.getElementById(

                "registerForm"

            );





        if (registerForm) {



            registerForm.addEventListener(

                "submit",

                createAccount

            );



        }





        /* =================================================

           FORGOT PASSWORD

           ================================================= */



        const forgotForm =

            document.getElementById(

                "forgotForm"

            );





        if (forgotForm) {



            forgotForm.addEventListener(

                "submit",

                requestPasswordReset

            );



        }





        /* =================================================

           VERIFICATION

           ================================================= */



        const verificationForm =

            document.getElementById(

                "verificationForm"

            );





        if (verificationForm) {



            verificationForm.addEventListener(

                "submit",

                verifyCode

            );



        }





        /* =================================================

           RESET PASSWORD

           ================================================= */



        const resetForm =

            document.getElementById(

                "resetForm"

            );





        if (resetForm) {



            resetForm.addEventListener(

                "submit",

                resetPassword

            );



        }





        /* =================================================

           CREATE ACCOUNT BUTTON

           ================================================= */



        const createAccountButton =

            document.getElementById(

                "createAccountBtn"

            );





        if (createAccountButton) {



            createAccountButton.addEventListener(

                "click",

                showCreateAccount

            );



        }





        /* =================================================

           FORGOT PASSWORD BUTTON

           ================================================= */



        const forgotButton =

            document.getElementById(

                "forgotPasswordBtn"

            );





        if (forgotButton) {



            forgotButton.addEventListener(

                "click",

                showForgotPassword

            );



        }





        /* =================================================

           BACK FROM REGISTER

           ================================================= */



        const backFromRegister =

            document.getElementById(

                "backToLoginFromRegister"

            );





        if (backFromRegister) {



            backFromRegister.addEventListener(

                "click",

                showLogin

            );



        }





        /* =================================================

           BACK FROM FORGOT

           ================================================= */



        const backFromForgot =

            document.getElementById(

                "backToLoginFromForgot"

            );





        if (backFromForgot) {



            backFromForgot.addEventListener(

                "click",

                showLogin

            );



        }





        /* =================================================

           GOOGLE

           ================================================= */



        const googleButton =

            document.getElementById(

                "googleLoginBtn"

            );





        if (googleButton) {



            googleButton.addEventListener(

                "click",

                googleLogin

            );



        }





        /* =================================================

           DEMO ACCOUNT

           ================================================= */



        const demoButton =

            document.getElementById(

                "demoAccountBtn"

            );





        if (demoButton) {



            demoButton.addEventListener(

                "click",

                createDemoAccount

            );



        }





        /* =================================================

           LOGIN PASSWORD TOGGLE

           ================================================= */



        const loginPasswordToggle =

            document.getElementById(

                "passwordToggle"

            );





        if (loginPasswordToggle) {



            loginPasswordToggle.dataset.target =

                "password";





            loginPasswordToggle.addEventListener(

                "click",

                function () {



                    togglePassword(

                        loginPasswordToggle

                    );



                }

            );



        }





        /* =================================================

           OTHER PASSWORD TOGGLES

           ================================================= */



        document

            .querySelectorAll(

                ".password-toggle[data-target]"

            )

            .forEach(

                function (button) {



                    /*

                       Avoid attaching a second

                       event to the login toggle.

                    */



                    if (

                        button ===

                        loginPasswordToggle

                    ) {



                        return;



                    }





                    button.addEventListener(

                        "click",

                        function () {



                            togglePassword(

                                button

                            );



                        }

                    );



                }

            );





        /* =================================================

           PASSWORD STRENGTH

           ================================================= */



        const registerPassword =

            document.getElementById(

                "registerPassword"

            );





        if (registerPassword) {



            registerPassword.addEventListener(

                "input",

                updatePasswordStrength

            );



        }





        /* =================================================

           REMEMBERED EMAIL

           ================================================= */



        const rememberedEmail =

            localStorage.getItem(

                REMEMBER_EMAIL_KEY

            );





        if (rememberedEmail) {



            const email =

                document.getElementById(

                    "email"

                );





            const remember =

                document.getElementById(

                    "rememberMe"

                );





            if (email) {



                email.value =

                    rememberedEmail;



            }





            if (remember) {



                remember.checked =

                    true;



            }



        }





        /* =================================================

           SHOW LOGIN BY DEFAULT

           ================================================= */



        showLogin();



    }

);
let invisibleMode = false;


function startTrace() {


    let ip = document.getElementById("ipInput").value;


    if (ip === "") {

        alert("Enter an IP Address");

        return;

    }



    resetTrace();



    let steps = [

        {
            id: "user",
            text:
                "Device detected. Private IP assigned: " + ip
        },


        {
            id: "router",
            text:
                "Router performs NAT. Private IP converted into Public IP."
        },


        {
            id: "isp",
            text:
                "ISP Provider receives public IP traffic."
        },


        {
            id: "backbone",
            text:
                "Internet backbone routes packets globally."
        },


        {
            id: "server",
            text:
                "Website server receives request and sends response."
        },


        {
            id: "attacker",
            text:
                "Adversary can see exposed public IP information."
        }

    ];



    let delay = 0;



    steps.forEach((step, index) => {


        setTimeout(() => {


            showNode(step.id);


            updateInformation(step.text);



            animatePacket(step.id);



        }, delay);



        delay += 2500;



    });



}







function showNode(id) {


    let node = document.querySelector("." + id);


    node.classList.remove("hidden");


    node.classList.add("visible");


}







function updateInformation(message) {


    document.getElementById("awarenessText").innerHTML = message;


}








function animatePacket(destination) {



    let packet = document.getElementById("packet");


    let node = document.querySelector("." + destination);



    let map = document.querySelector(".map-section");



    let mapPosition = map.getBoundingClientRect();



    let nodePosition = node.getBoundingClientRect();




    packet.style.display = "block";



    packet.style.left = "10%";

    packet.style.top = "50%";




    setTimeout(() => {


        packet.style.transition = "2s";


        packet.style.left =

            (nodePosition.left - mapPosition.left) + 50 + "px";



        packet.style.top =

            (nodePosition.top - mapPosition.top) + 50 + "px";



    }, 100);



    setTimeout(() => {


        packet.style.display = "none";


    }, 2200);



}








function resetTrace() {


    let nodes = document.querySelectorAll(".node");


    nodes.forEach(node => {


        node.classList.remove("visible");


        node.classList.add("hidden");


    });



    document.getElementById("packet").style.display = "none";


}








function toggleMode() {


    invisibleMode = !invisibleMode;



    let map = document.querySelector(".map-section");



    if (invisibleMode) {


        map.classList.add("invisible-mode");

        updateInformation(

            "Invisible Mode: Shows how attackers may observe only exposed information without seeing private network details."

        );


    }


    else {


        map.classList.remove("invisible-mode");


        updateInformation(

            "Visible Mode: Complete network path simulation from private IP to server response."

        );


    }



}
const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:9000/gs-websocket'
});

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/message2', (message) => {
        showGreeting(JSON.parse(message.body).content);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.publish({
        destination: "/app/scheduledmsg",
        body: JSON.stringify({'name': $("#name").val()})
    });
}

function showGreeting(message) {
    const row = JSON.parse(message);
    $("#greetings").text("");

    for ( let i = 0 ; i < row.length ; i ++){
    $("#greetings").append("<tr><td>" + row[i]["word"] + "|" + row[i]["cnt"]+ "|" + row[i]["no"]  + "</td></tr>")
    }
    console.log("웹소켓 으로 받은 메시지 : " + message);

    console.log(row);
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendName());
});
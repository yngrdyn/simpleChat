// View elements

var container = document.getElementById("js-container"),
	inputMessage = document.getElementById('js-sendmessage');
	messageContainer = document.getElementById('js-messages');
	backButton = document.getElementById('js-backbutton');

	var HttpClient = function() {
	    this.get = function(aUrl, aCallback) {
	        var anHttpRequest = new XMLHttpRequest();
	        anHttpRequest.onreadystatechange = function() { 
	            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
	                aCallback(anHttpRequest.responseText);
	        }

	        anHttpRequest.open( "GET", aUrl, true );            
	        anHttpRequest.send( null );
	    }
	}


// End of View elements

window.onload = function() {
	
	// Checking session data

	if(!getStorageElement('messages')) {
		setStorageElement('messages', '');
	} else {
		var storedMessages = getStorageElement('messages');
		if (storedMessages) {
			storedMessages = JSON.parse(getStorageElement('messages'));
			storedMessages.forEach(function(item){
			  createMessage(item.message,item.sender, false);
			});
		}
	}
	// End checking session data

	generateMessage();

	// Event handlers

	inputMessage.addEventListener("keydown", function(e){
		if (e.which == 13 || e.keyCode == 13) {
	        sendMessage(e.srcElement.value);
	        this.value = "";
	        return false;
	    }
	});

	backButton.addEventListener("click", function(){
		location.href = "/index.html";
	});

	// End of Event handlers

};


function sendMessage(message) {
	if(message){
		createMessage(message,'fromuser', true);
	}
}

function generateMessage(){
	var client = new HttpClient();
	client.get('https://baconipsum.com/api/?type=meat-and-filler', function(response) {
		if(response.length > 50){
			createMessage(response.substring(2, 50),'touser', true);
		} else {
			createMessage('Random Message','touser', true);
		}
	});
	
}

function createMessage(message, sender, push){
	var contentnode = document.createElement("P");
	var textnode = document.createTextNode(message);
	contentnode.appendChild(textnode);

	var subnode = document.createElement("DIV");
	subnode.className = "bubbletext";
	subnode.appendChild(contentnode);

	var node = document.createElement("DIV");
	node.className = "bubbletext-container " + sender;
	node.appendChild(subnode);

	var imgnode = document.createElement("IMG");
	imgnode.setAttribute('src', sender === 'fromuser' ? '/img/myprofile_thumb.jpg' : '/img/profile_thumb.jpg');

	var picturenode = document.createElement("DIV");
	picturenode.className = "userpicture";
	picturenode.appendChild(imgnode);

	if(sender === 'touser') {
		var statusnode = document.createElement("DIV");
		statusnode.className = "status";
		picturenode.appendChild(statusnode);
		picturenode.addEventListener("click", function(){
			location.href = "/index.html";
		});
	}

	var messagenode = document.createElement("DIV");
	messagenode.className = "message";
	messagenode.appendChild(node);
	messagenode.appendChild(picturenode);

	messageContainer.appendChild(messagenode);

	messagenode.scrollIntoView(false);

	if(push)
		pushMessage(message, sender);
}

function getStorageElement(elementKey){
	if(sessionStorage){
	    return sessionStorage.getItem(elementKey);
	} else{
	    return null;
	}
}

function setStorageElement(elementKey, value){
	if(sessionStorage){
	    sessionStorage.setItem(elementKey, value);
	} else{
	    return false;
	}
}

function pushMessage (message, sender) {
	if(sessionStorage){
		var storedMessages = getStorageElement('messages');
		var messages = storedMessages ? JSON.parse(getStorageElement('messages')) : [];
		messages.push({
			sender: sender,
			message: message
		});
	    sessionStorage.setItem('messages', JSON.stringify(messages));
	} else{
	    return false;
	}
}




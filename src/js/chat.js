// View elements

var container = document.getElementById("js-container"),
	inputMessage = document.getElementById('js-sendmessage');
	messageContainer = document.getElementById('js-messages');
	/*addFriendButton = document.getElementById('js-addFriend'),
	favoriteButton = document.getElementById('js-addFavorite'),
	chatButton = document.getElementById('js-chatButton');*/
	backButton = document.getElementById('js-backbutton');

// End of View elements

window.onload = function() {
	
	// Checking session data


	// End checking session data
	

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
		
		var contentnode = document.createElement("P");
		var textnode = document.createTextNode(message);
		contentnode.appendChild(textnode);

		var subnode = document.createElement("DIV");
		subnode.className = "bubbletext";
		subnode.appendChild(contentnode);

		var node = document.createElement("DIV");
		node.className = "bubbletext-container fromuser";
		node.appendChild(subnode);

		var picturenode = document.createElement("DIV");
		picturenode.className = "userpicture";

		var messagenode = document.createElement("DIV");
		messagenode.className = "message";
		messagenode.appendChild(node);
		messagenode.appendChild(picturenode);

		messageContainer.appendChild(messagenode);

	}
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
	    if(sessionStorage.getItem(elementKey)){
	    	sessionStorage.removeItem(elementKey);
	    	return false;
	    } else{
	    	sessionStorage.setItem(elementKey, value);
	    	return true;
	    }
	} else{
	    return false;
	}
}




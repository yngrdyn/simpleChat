// View elements

var container = document.getElementById("js-container"),
	addFriendButton = document.getElementById('js-addFriend'),
	favoriteButton = document.getElementById('js-addFavorite'),
	chatButton = document.getElementById('js-chatButton');

// End of View elements

window.onload = function() {
	
	// Checking session data

	if(getStorageElement("favorite-friend")){
		favoriteButton.classList.add("clicked");
	} 

	handleAddFriendButton(getStorageElement("friend"));

	// End checking session data
	

	// Event handlers

	addFriendButton.addEventListener("click", function(){
		handleAddFriendButton(addedFriend());
	});

	favoriteButton.addEventListener("click", function(){
		if (this.classList.contains('clicked')) {
		    this.classList.remove("clicked");
		    setStorageElement("favorite-friend", true);
		} else {
			this.classList.add("clicked");
			setStorageElement("favorite-friend", true);
		}
	});

	// End of Event handlers

};

function handleAddFriendButton(param){
	if(param){
		addFriendButton.value =  "Remove from my friends";
		container.classList.add("friends");
	} else {
		addFriendButton.value =  "Add as Friend";
		container.classList.remove("friends");
	}
}

function addedFriend() {
	setStorageElement("friend", true);
	if(getStorageElement("friend")){
		return true;
	} else {
		return false;
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




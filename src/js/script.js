window.onload = function() {
    var container = document.getElementById("js-container"),
		addFriendButton = document.getElementById('js-addFriend'),
		favoriteButton = document.getElementById('js-addFavorite'),
		profileButton = document.getElementById('js-profileButton');


	addFriendButton.addEventListener("click", function(){
		if(addedFriend()){
			addFriendButton.value =  "Remove Friend";
			container.classList.add("friends");
		} else {
			addFriendButton.value =  "Add as Friend";
			container.classList.remove("friends");
		}
	});

};

function addedFriend() {
	setStorageElement("friend", true);
	if(getStorageElement("friend")){
		return true;
	} else {
		return false;
	}
}

function getStorageElement(elementKey){
	if(localStorage){
	    return localStorage.getItem(elementKey);
	} else{
	    return null;
	}
}

function setStorageElement(elementKey, value){
	if(localStorage){
	    if(localStorage.getItem(elementKey)){
	    	localStorage.removeItem(elementKey);
	    	return false;
	    } else{
	    	localStorage.setItem(elementKey, value);
	    	return true;
	    }
	} else{
	    return false;
	}
}




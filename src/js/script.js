window.onload = function() {
    alert('Page loaded');
    var container = document.getElementById("js-container"),
		addFriendButton = document.getElementById('js-addFriend'),
		favoriteButton = document.getElementById('js-addFavorite'),
		profileButton = document.getElementById('js-profileButton');


	addFriendButton.addEventListener("click", function(){
		console.log(this);
		addFriendButton.value= addFriend() ? "Remove Friend" : "Add Friend";
	});

};

function addFriend() {
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
	    // Store data
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




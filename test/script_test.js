casper.test.begin('Testing Main', 8, function(test){
    casper.start('http://localhost:8001/index.html');

    casper.then(function(){
        test.assertTitle('simpleChat', 'Main has correct title');
    });

    casper.then( function() {
    	console.log('Clicking Add Friend button...');
    	this.click('#js-addFriend');
    });

    casper.wait(500, function(){
    	console.log('Is friend Added?');
    	var value = this.evaluate(function(){
		    return sessionStorage.getItem('friend');
		});
		test.assertEquals(value === "true", true);
    });

    casper.then( function() {
    	console.log('Clicking Add Favorite button...');
    	this.click('#js-addFavorite');
    });

    casper.wait(500, function(){
    	console.log('Is favorite Added?');
    	var value = this.evaluate(function(){
		    return sessionStorage.getItem('favorite-friend');
		});
		test.assertEquals(value === "true", true);
    });

    casper.then( function() {
    	this.click('#js-chatButton');
    });

    casper.wait(500, function(){
        test.assertUrlMatch(this.getCurrentUrl(), 'http://localhost:8001/chat.html');
    });

    casper.then( function() {
    	console.log('Clicking on back to return to profile...');
    	this.click('#js-backbutton');
    });

    casper.wait(500, function(){
    	console.log('is still friend?');
        var value = this.evaluate(function(){
		    return sessionStorage.getItem('friend');
		});
		test.assertEquals(value === "true", true);
    })

    casper.then(function(){
    	console.log('Is still favorite?');
    	var value = this.evaluate(function(){
		    return sessionStorage.getItem('favorite-friend');
		});
		test.assertEquals(value === "true", true);
    });

    casper.then( function() {
    	console.log('Clicking on Remove from my friends...');
    	this.click('#js-addFriend');
    });

    casper.wait(500, function(){
    	console.log('Was removed from my friends?');
    	var value = this.evaluate(function(){
		    return sessionStorage.getItem('friend');
		});
		test.assertEquals(value, "");
    });

    casper.then( function() {
    	console.log('Clicking on Favorite button...');
    	this.click('#js-addFavorite');
    });

    casper.wait(500, function(){
    	console.log('Was removed from my favorites?');
    	var value = this.evaluate(function(){
		    return sessionStorage.getItem('favorite-friend');
		});
		test.assertEquals(value, "");
    });


    casper.run(function(){
        test.done();
    })
});

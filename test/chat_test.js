casper.test.begin('Testing Chat', 4, function(test){
	var numMessages = 0;

    casper.start('http://localhost:8001/chat.html');

    casper.then(function(){
        test.assertTitle('simpleChat - chat', 'Chat has correct title');
    });

    casper.wait(1000, function(){
    	console.log('First random message generated?');
    	test.assertExists('div.message');
    });

    casper.then( function(){
	    numMessages = casper.getElementsInfo('div.message').length;
	});

	casper.then( function() {
    	this.click('#js-backbutton');
    });

    casper.wait(500, function(){
        test.assertUrlMatch(this.getCurrentUrl(), 'User redirected to Profile');
    });

    casper.wait(500, function(){
    	this.click('#js-chatButton');
    });

    casper.wait(1000, function(){
    	console.log('Showing old messages + new generated message?');
    	numMessages++;
    	test.assertElementCount('div.message', numMessages);

    });


    casper.run(function(){
        test.done();
    })
});
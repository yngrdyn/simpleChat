casper.test.begin('Testing Chat', 1, function(test){
    casper.start('http://localhost:8001/chat.html');

    casper.then(function(){
        test.assertTitle('simpleChat - chat', 'Chat has correct title');
    });

    casper.run(function(){
        test.done();
    })
});
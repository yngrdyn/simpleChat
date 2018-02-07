casper.test.begin('Testing Main', 1, function(test){
    casper.start('http://localhost:8001/index.html');

    casper.then(function(){
        test.assertTitle('simpleChat', 'Main has correct title');
    });

    casper.run(function(){
        test.done();
    })
});
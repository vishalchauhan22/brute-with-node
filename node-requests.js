let request = require('request');
let async = require('async');
// const uuidv1 = require('uuid/v1');
let domainURL = 'https://example.com'

let calls = new Array(20);
let val1 = 0, val2 = 0;

function race_web(){
    async.eachOfLimit(calls, 1, function(i,k,cb){
        (function(){
            let url;
            url = domainURL+'/'+ ++val1+'/'+ ++val2;
            // if(k%4 == 0){
            //     url = domainURL+'?'+ uuidv1()+ new Date().getTime() + getRandom(["&param2="+(k*4), "&medium"+(k*4), "&uip="+(k*4)])
            // }else{
            //     url = domainURL+'?'+ getRandom([uuidv1(), new Date().getTime()])
            // }
            console.log(url+" :: "+ ++k);
            request.get({
                url: url,
                headers: {
                    "accept-encoding": "gzip, deflate, br"
                }
            })
        })()
        setTimeout(function(){
            cb();
        },0)
    }, function(){
        console.log("all calls done")
        setTimeout(function(){
            race_web()
        }, 1000);
    })
}


race_web()


function getRandom(list, k) {
    return list[Math.floor((Math.random()*list.length))];
} 
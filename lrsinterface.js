// get the configuration for the lrs 
const config = require('./lrscon.json')
// used to make browser-like fetch calls 
const fetch = require('node-fetch')

// context should be something like eLearning and the object something like slide in eLearning 
const postStatement = (actor, verb, context, object) => {
	console.log("actor in post statment is",actor)
    var data = {
              "actor": {
                "name": actor,
                "mbox": "mailto:"+actor.replace(/\s/g, "").toLowerCase()+"@example.com"
              },
              "verb": {
                "id": "http://adlnet.gov/expapi/verbs/" + verb,
                "display": { "en-US": verb }
              },
              "object": {
                "id": "http://pdidakt.com/dummyLMS/"+context+"/" + object,
                "definition": {
                  "name": { "en-US": object }
                }
              },
              "context":{
                "contextActivities":{
                  "parent":[{
                    "objectType" : "Activity",
                    "id" : "http://pdidakt.com/dummyLMS/"+context+"/"
                  }]
                }
              }
            }
    if(verb==='completed'){
        if(data.result) data.result.completion = true;
        else{
            data.result = {};
            data.result.completion = true;
        }
    }

    if(verb==='terminated'){
        const sessionEnd = Date.now();
        const sessionLength = sessionEnd - sessionStart;
        const wholeSeconds = Math.trunc(sessionLength/1000);
        let remainingMilSeconds = sessionLength%1000+'';

        // create an ISO 8601 value
        while(remainingMilSeconds.length<3) remainingMilSeconds = '0' + remainingMilSeconds;
        const durationString = `PT${wholeSeconds}.${remainingMilSeconds}S`
        data.result = { duration : durationString }
    }

    var myInit = {
        method:'POST',
        headers: { 'Content-Type': 'application/json', 'X-Experience-API-Version':'1.0.1', 'Authorization': 'Basic ' + config["basicAuth"] },
        body:JSON.stringify(data)
    }

    return fetch(config["endpoint"],myInit).then(res=>console.log("The API call was a success")).catch(err=>console.log("The api call was unsuccessful. Is there a localStorage['User'] value?",err))
}

exports.postStatement = postStatement;
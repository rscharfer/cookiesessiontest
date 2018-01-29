const launchServer = {

  "endpoint" : "http://localhost:3000/xapi"
}

const postToLaunchServer = (name, verb, context, object) => {
    var data = {
              name,
              verb,
              context,
              object
            }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var myInit = {
        method:'POST',
        headers: myHeaders,
        body:JSON.stringify(data)
    }

    return fetch(launchServer["endpoint"],myInit).then(res=>console.log("The API call was a success",res)).catch(err=>console.log("The api call was unsuccessful",err))
}


function setUpTerminatedSendInitialized(module="Storyline Dummy"){

  postToLaunchServer(localStorage["User"],"initialized", module, module + "Module")
  window.onbeforeunload=()=>postToLaunchServer(localStorage["User"],"terminated", module, module + " Module")

}










const postToLaunchServer = (actor, verb, context, object) => {
    var data = {
              name : "Ryan Scharfer",
              verb: "launched",
              context: "Strahlenschutz",
              object: "Slide 1"
            }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var myInit = {
        method:'POST',
        headers: myHeaders,
        body:JSON.stringify(data)
    }

    return fetch(launchServer["endpoint"],myInit).then(res=>console.log("The API call was a success",res)).catch(err=>console.log("The api call was unsuccessful",err))
} 







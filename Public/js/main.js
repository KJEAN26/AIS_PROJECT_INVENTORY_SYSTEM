//ajax request goes here
const baseURL = "http://localhost:3000";
    //(string url , string method , object props )
    // This is a dynamic function
const apiRequest = (url, method, props) => {
    return new Promise((resolve, reject) => {


        let ajaxConfig = {
            url: `${baseURL}${url}`,
            type: method,
            success: function (response) {
                //return the data in then clause
                resolve(response);
            },
            error: function (error) {
                //return the data in catch clause
                reject(error);
            }
        };

        if (method.toLowerCase() != "get") {
            ajaxConfig["data"] = props;
        }
        $.ajax(ajaxConfig);
    });
};



//helper functions 

function resetInputFields(classOrIds){
    //reset input fields here
}

function editUrl(url){
    let newUrl = "";
    for(let index = (url.length-1); index > -1; index--){
        if(url[index] === "/"){
            newUrl = url.substr(0,22);
            break;
        }
    }
    return newUrl;
}


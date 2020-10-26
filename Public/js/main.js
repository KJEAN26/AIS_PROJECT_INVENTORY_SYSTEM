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



//helper function 

function reseter(classOrIds){

}

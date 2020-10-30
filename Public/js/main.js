$(document).ready(() => {
    //gets the base url
    const baseUrl = editUrl(window.location.href);
    $()
        console.log("I was here!");
    //Provides the name of the user in the upper right corner
    if(localStorage.getItem('token')){
        let token = localStorage.getItem('token');
        let userinfo = parseJwt(token).user;
        $("#username")[0].innerText = userinfo.firstname+" "+userinfo.lastname;
        //change also the profile here
    }

    //redirect route to dashboard
    $("#dashboard").click(() => {
        window.location.href = `${baseUrl}home`;
    });
    // reirect to gadgets
    $("#gadgets").click(() => {
        window.location.href = `${baseUrl}gadgets`;
    });

    // redirect to groceries
    $("#groceries").click(() => {
        window.location.href = `${baseUrl}groceries`;
    });

    //redirect to clothes
    $("#clothes").click(() => {
        window.location.href = `${baseUrl}clothes`;
    });

    //update profile pic
    $("#updateProfile").click(() => {
        console.log("I was clicked!");
    });

    $("#logout").on("click", () => {
        localStorage.removeItem("token");
        window.location.href = `${baseUrl}logout`;
    });

    //return to stocks
    $("#stocks").click(() => {
        window.location.href = `${baseUrl}stocks`;
    });

});
//ajax request goes here
const baseURL = `${editUrl(window.location.href).substr(0,editUrl(window.location.href).length - 1)}`;
//(string url , string method , object props )
// This is a dynamic function
const apiRequest = (url, method, props, contentTypes = "") => {
    return new Promise((resolve, reject) => {
        let ajaxConfig = {
            url: `${baseURL}${url}`,
            type: method,
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            success: function (response) {
                //return the data in then clause
                resolve(response);
            },
            error: function (error) {
                //return the data in catch clause
                reject(error);

                console.log("error", error);
                // if (error.status == 403 || error.status == 401) {
                //     window.location.href = `${baseURL}/login`;
                // }
            }
        };
        if (contentTypes == "multipart/form-data") {
            ajaxConfig["cache"] = false;
            ajaxConfig["processData"] = false;
            ajaxConfig["contentType"] = false;
        }


        if (method.toLowerCase() != "get") {
            ajaxConfig["data"] = props;
        }
        console.log(ajaxConfig);
        $.ajax(ajaxConfig);
    });
};



//helper functions 

function resetInputFields(classOrIds) {
    //reset input fields here
    classOrIds.forEach(element => {
        $(element).val("");
    });
}

function editUrl(url) {
    let newUrl = "";
    for (let index = (url.length - 1); index > -1; index--) {
        if (url[index] === "/") {
            newUrl = url.substr(0, index + 1);
            break;
        }
    }
    return newUrl;
}

//protected page
function protectedPages(partUrl, partUrl2) {
    if (!localStorage.getItem('token')) return window.location.href = `${editUrl(window.location.href)}${partUrl}`;
    return window.location.href = `${editUrl(window.location.href)}${partUrl2}`;
}

//validator function
//validate email
function isEmailValid(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

//validate firstname, middlename, lastname
function isValidNames(name) {
    return (name.length > 1 && name.length < 100);
}


//parse jwt token into json
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


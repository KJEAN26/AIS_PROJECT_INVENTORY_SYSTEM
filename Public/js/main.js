// $(document).ready(()=>{
//     $(window).on('unload',()=>{
//         localStorage.removeItem("token");
//     });
// }
// )

//ajax request goes here
const baseURL = "http://localhost:3000";
//(string url , string method , object props )
// This is a dynamic function
const apiRequest = (url, method, props) => {
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
                if (error.status == 403 || error.status == 401) {
                    window.location.href = `${baseURL}/login`;
                }
            }
        };

        if (method.toLowerCase() != "get") {
            ajaxConfig["data"] = props;
        }
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
function protectedPages(partUrl) {
    if (!localStorage.getItem('token')) {
        window.location.href = `${editUrl(window.location.href)}${partUrl}`;
    }
}

//validator function
//validate email
function isEmailValid(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

//validate firstname, middlename, lastname
function isValidNames(name){
    return (name.length > 1 && name.length < 100);
}




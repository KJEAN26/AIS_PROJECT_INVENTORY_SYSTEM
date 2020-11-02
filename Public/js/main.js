$(document).ready(() => {
    //gets the base url
    const baseUrl = editUrl(window.location.href);
    console.log("I was here!");
    //Provides the name of the user in the upper right corner
    if (localStorage.getItem('token')) {
        let token = localStorage.getItem('token');
        let userinfo = parseJwt(token).user
        apiRequest(`/user/${userinfo._id}`, "get")
            .then((resolve) => {
                $("#username")[0].innerText = resolve.user.firstname + " " + resolve.user.lastname;
                //change also the profile here
                $("#updateProfile").attr('src',`static/image/user/${resolve.user.profilepic}`);
                if(resolve.user.role != "admin"){
                    console.log($("#users"));
                    $("#users").hide();
                }
            }).catch((rejected) => {
                console.log(rejected);
            })
    }

    //redirect route to dashboard
    $("#dashboard").click(() => {
        window.location.href = `${baseUrl}home`;
    });
    //edit profile
    $("#editProfile").click(() => {
        console.log("I was clicked");
        window.location.href = `${baseUrl}edit-user`;
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
        window.location.href = `${baseUrl}change-profile`;
    });

    //got to user mangement
    $("#users").click(()=>{
        window.location.href = `${baseUrl}users`;
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
const baseURL = `${editUrl(window.location.href).substr(0, editUrl(window.location.href).length - 1)}`;
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
            }
        };
        if (contentTypes == "multipart/form-data") {
            console.log("i was here");
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

//retriveproduct by category
const retrieveProductByCategory = (category) => {
    apiRequest(`/product/limited/${category}`, "get").then((products) => {
        $("#products").empty();
        products.products_by_category.forEach(product => {
            console.log(product);
            if (!product.deletedAt) {
                $("#products").append(`<div class="card" style="width: 15rem; margin-left: 40px; margin-top: 30px;">
                    <input type="hidden" value="${product._id}" id="productId">
                <img src="static/image/products/${product.productImage}" class="productImage card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.productName}</h5>
                    <p class="card-text">Price: Php ${product.productPrice}</p>
                </div>
                <button class="btn btn-primary text-center update">Update</button>
                <button class="btn btn-danger  text-center delete"  id='${product._id}' >Delete</button>
            </div>
            `);
            }
        });
    }).catch((error) => {
        console.log(error);
    });
}


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


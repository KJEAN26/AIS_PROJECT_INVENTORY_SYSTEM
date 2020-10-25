//ajax request goes here

$(document).ready(function () {
    const baseURL = "";
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


    //add user
    $("#sub").click(() => {
        const newUser = {
            firstname: $("#fname").val(),
            lastname: $("#lname").val(),
            middlename: $("#mname").val(),
            password: $("#pass").val(),
            email: $("#email").val(),
            age: $("#age").val(),
            roleId: $("#role").val()
        };

        apiRequest("http://localhost:3000/user/add","post", newUser)
        .then((resolve)=>{
            alert("added new user");
            console.log(resolve);
        }).catch((rejected)=>{
            console.log(rejected);
        });
    });
});
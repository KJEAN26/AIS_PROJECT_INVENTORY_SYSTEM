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

    apiRequest("http://localhost:3000/user/all", "get").then((result) => {
        result.data.forEach(element => {
            console.log(element);
            $("#user_container").append(`<p>${element.firstname}</p>`);
        });
    }).catch((error) => {
        console.log(error);
    });

    $("#sub").click(()=>{
        const data = {
            firstname: $("#fname").val(),
            lastname: $("#lname").val(),
            password: $("#pass").val(),
            age: $("#age").val(),
            email: $("#email").val(),
            roleId: $("#role").val()
        }
        console.log(data);
        apiRequest("http://localhost:3000/user/add", "post", data).then((result)=>{
            console.log(result);
        }).catch((error)=>{
            console.log(error);
        });
    });
})
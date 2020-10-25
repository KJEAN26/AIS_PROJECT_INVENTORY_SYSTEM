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

    //get all user
    const getAll = ()=>( apiRequest("http://localhost:3000/user/all", "get").then((result) => {
        console.log('I was here');
        $("#user_container").empty();
        result.data.forEach(element => {
            if(!element.deletedAt){
                $("#user_container").append(`<p>${element.firstname}</p><input type="button" id = '${element._id}' value='delete' class="del">`);
            }           
        });
    }).catch((error) => {
        console.log(error);
    }));
    getAll();

    //add new user
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
            getAll();
        }).catch((error)=>{
            console.log(error);
        });
    });

    //delete user

    $("#user_container").on('click','input.del',(e)=>{
        let userId = e.currentTarget.id;
        apiRequest(`http://localhost:3000/user/delete/${userId}`,"delete")
        .then((result)=>{
            alert("deleted");
            getAll();
            console.log(result);
        }).catch((error)=>{
            console.log(error);
        });
    });

});
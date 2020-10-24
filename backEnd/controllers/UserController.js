const bodyParser = require('body-parser');


//Parse the body
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

//Import Models
const Users = require('./models/UserModel');

//getUsers, updateUser, deleteUser, addUser


const getUsers = (req,res) => {
    Users.find({},(error, users)=>{
        if(error){
            return res.status(500).send(error);
        }
        return res.json({"data":users});
    });
};


const updateUser = (req, res) => {
    const userId = req.body.id;
    const userInfos = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        middlename: req.body.middlename,
        age: req.body.age,
        roleId: req.body.roleId,
        email: req.body.email,  
    };

    Users.findOneAndUpdate({_id: userId},{$set: userInfos}, (error, user)=>{
        if(error){
            return res.status(500).send(error);
        }
        return res.json({"last_upated_user":user});
    });
};

const deleteUser = (req, res)=> {
    const userId = req.body.id;
    const deletedDate = new Date();
    Users.findOneAndUpdate({_id: userId},{$set: {deletedAt: deletedDate}},(error, user)=>{
        if(error){
            return res.status(500).send(error);
        }
        return res.json({"last_deleted_user": user});
    });
}

const addUser = (req, res)=>{
    const newUser = new Users({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        middlename: req.body.middlename,
        age: req.body.age,
        roleId: req.body.roleId,
        email: req.body.email,  
    });
    newUser.save((error, user)=> {
        if(error){
            return res.status(500).send(error);
        }
        return res.json({"last_inserted_user": user});
    });
};


module.exports = {
    getUsers,
    addUser,
    deleteUser,
    updateUser
};
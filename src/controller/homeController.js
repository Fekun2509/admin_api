import pool from "../configs/connectDB";

let getHomepage = async (req,res) => {
    // console.log(pool);
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');

    return res.render('index.ejs', {dataUser: rows})
    
}

let getDetailPage = async (req,res) => {
    let userID = req.params.userId;
    let [user] = await pool.execute('select * from users where id = ?', [userID]);

    console.log('>>>Check params', req.params.userId)
    return res.send(JSON.stringify(user[0]))
}

let createNewUser = async (req,res) => {
    console.log('>>>Check reques', req.body);
    let {firstName, lastName, email, address} = req.body;
    console.log(firstName);
    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)', [firstName, lastName, email, address]); 
    return res.redirect('/'); 
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('delete from users where id = ?', [userId]);
    return res.redirect('/'); 
}

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('select * from users where id = ?', [id]);

    return res.render('update.ejs', {dataUser: user[0]});


}

let updateUser = async (req, res) => {
    console.log('>>Check request: ', req.body)
    let {firstName, lastName, email, address, id} = req.body;
    await pool.execute(`update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?`, 
    [firstName, lastName, email, address, id])

    return res.redirect('/');
}

module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, updateUser
}
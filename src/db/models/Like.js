const knex = require('../knex');
// const { hashPassword, isValidPassword } = require('../../utils/auth-utils');

class Like{
    static async create(user_id, post_id) {
        try {
            const query = "INSERT INTO likes (user_id, post_id) VALUES(?,?)"
            const {rows: [likes]} = await knex.raw(query,[user_id, post_id])
            return likes
            
        }
        catch(error) {
            console.log('ERROR!', error); 
            return null;
        } 
    } 
    static async delete(id, user_id) {//needs user_id
        try {
            const query = "DELETE FROM likes WHERE post_id=? AND user_id=? RETURNING *"
            const {rows: [likes]} = await knex.raw(query,[id, user_id])
            return likes
        }
        catch(error) {
            console.log('ERROR!', error); 
            return null;
        } 
    } 

    static async listed() {
        try {
            const query = "SELECT * FROM likes ORDER BY id DESC"
            const {rows: [likes]} = await knex.raw(query)
            return likes
        }
        catch(error) {
            console.log('ERROR!', error); 
            return null;
        } 
    } 

}

module.exports = Like;
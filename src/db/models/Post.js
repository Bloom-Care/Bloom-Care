const knex = require('../knex');
// const { hashPassword, isValidPassword } = require('../../utils/auth-utils');

class Post{
    static async create(description, img_url, owner_id, address, category) {
        try {
            const query = "INSERT INTO Posts (description, img_url, owner_id, address, category) VALUES (?, ?, ?, ?, ?) RETURNING *";
            const newPost = await knex.raw(query, [description, img_url, owner_id, address, category]);
            return newPost.rows; 
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }
    static async list() {
        try { 
            const query = " SELECT * FROM posts"
            const {rows} = await knex.raw(query) 
            return rows;
        }
        catch(error) {
            console.log('ERROR!')
            return null;
        }
    }
    static async delete(id) {
        try {
            const remove = await knex.raw("DELETE FROM likes WHERE post_id = ?", [id])
            const query = "DELETE FROM posts WHERE id=? RETURNING *;"
            const {rows: [Posts]} = await knex.raw(query, [id])
            return Posts;
        }
        catch(error) {
            console.log('ERROR!', error) 
            return null;
        } 
    }
    static async show(id) {
        try {
            const query = "SELECT * FROM Posts WHERE id=?;"
            const {rows: [Posts]} = await knex.raw(query, [id])
            return Posts;
        }
        catch(error) {
            console.log('ERROR!') 
            return null;
        }    
    }

}

module.exports = Post;
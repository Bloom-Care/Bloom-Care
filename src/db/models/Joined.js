const e = require('express');
const knex = require('../knex');

class Joined {
static async create(user_id, event_id){
    try{
       const query = 'INSERT INTO joined (user_id, event_id) VALUES(?,?)'
       const {rows: [joined]} = await knex.raw(query, [user_id, event_id])
       return joined
    }
    catch(error){
        console.log(error)
        return null
    }
}
static async show(user_id){
    try{
       const query = 'SELECT * FROM joined WHERE user_id=?'
       const {rows} = await knex.raw(query, [user_id])
       return rows
    }
    catch(error){
        console.log(error)
        return null
    }
}
static async delete(id, event_id) {
    try {
        const query = "DELETE FROM joined WHERE user_id=? AND event_id = ? RETURNING *"
        const {rows: [joined]} = await knex.raw(query,[id, event_id])
        return joined
    }
    catch(error) {
        console.log('ERROR!', error); 
        return null;
    } 
} 
}
module.exports = Joined;
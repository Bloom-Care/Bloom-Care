const knex = require('../knex');

class Event{
    static async list(){
        try{
        const query = "SELECT * FROM events";
        const {rows} = await knex.raw(query)
        return rows;
        }
        catch(error){
            console.log(error)
            return null
        }
    }
    static async show(id){
        try{
        const query = "SELECT * FROM events WHERE id = ?";
        const {rows} = await knex.raw(query, [id]);
        return rows;
        }
        catch(error){
            console.log(error)
            return null
        }
    }
    static async post(event_name, description, address, img_url, owner_id,contact_info) {
        try {
        const query = "INSERT INTO events (event_name, description, address, img_url, owner_id,contact_info) VALUES (?, ?, ?, ?, ?,?) RETURNING *";
        const newEvent = await knex.raw(query, [event_name, description, address, img_url, owner_id,contact_info]);
        const event_id = newEvent.rows[0].id
        const query2 = 'INSERT INTO joined (user_id, event_id) VALUES(?,?)'
       const join = await knex.raw(query2, [owner_id, event_id])
        return newEvent.rows;
        }
        catch(error){
            console.log(error)
            return null
        }
    }
    static async delete(id) {
        try {
        const remove = await knex.raw('DELETE FROM joined WHERE event_id = ?', [id])
        const query = "DELETE FROM events WHERE id= ?"
        const {rows: [event]} = await knex.raw(query, [id])
        return event;
        }
        catch(error){
            console.log(error)
            return null
        }
    } 
}
module.exports = Event;

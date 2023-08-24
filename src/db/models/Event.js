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
        const {rows: [event]} = await knex.raw(query, [id]);
        return event;
        }
        catch(error){
            console.log(error)
            return null
        }
    }
    static async post(event_name, description, address, img_url, owner_id) {
        try {
        const query = "INSERT INTO events (event_name, description, address, img_url, owner_id) VALUES (?, ?, ?, ?, ?)";
        const newEvent = await knex.raw(query, [event_name, description, address, img_url, owner_id]);
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

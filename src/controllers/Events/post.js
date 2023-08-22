const post = async (req, res) => {
    const {
      // session, // this req.session property is put here by the handleCookieSessions middleware
      db: { Event }, // this req.db.User property is put here by the addModelsToRequest middleware
      body: { event_name, description, address, img_url, owner_id }, // this req.body property is put here by the client
    } = req;
    console.log(event_name, description, address, img_url, owner_id)
  
    // TODO: check if username is taken, what should you return?
    const post = await Event.post(event_name, description, address, img_url, owner_id);
    // session.userId = post.id;
  
    res.send(post);
  };
  
  module.exports = post;
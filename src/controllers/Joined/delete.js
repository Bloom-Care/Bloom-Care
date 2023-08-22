const deleteJoined = async (req, res) => {
    const {
      // session, // this req.session property is put here by the handleCookieSessions middleware
      db: { Joined }, // this req.db.User property is put here by the addModelsToRequest middleware
      body: { }, // this req.body property is put here by the client
      params: {id}
    } = req;
  console.log(id)
    // TODO: check if username is taken, what should you return?
    const post = await Joined.delete(id);
    // session.userId = post.id;
  
    res.send(post);
  };
  
  module.exports = deleteJoined;
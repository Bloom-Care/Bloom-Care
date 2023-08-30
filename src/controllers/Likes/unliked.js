const unliked = async (req, res) => {
    const {
    //   session, // this req.session property is put here by the handleCookieSessions middleware
      db: { Like }, // this req.db.User property is put here by the addModelsToRequest middleware
      body: { user_id }, // this req.body property is put here by the client
      params: {id}
    } = req;

    console.log(user_id,id)
    // TODO: check if username is taken, what should you return?
    const post = await Like.delete(id, user_id);
    // session.userId = post.id;
  
    res.send(post);
  };
  
  module.exports = unliked;
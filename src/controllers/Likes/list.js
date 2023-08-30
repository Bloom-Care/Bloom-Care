const list = async (req, res) => {
    const {
    //   session, // this req.session property is put here by the handleCookieSessions middleware
      db: { Like }, // this req.db.User property is put here by the addModelsToRequest middleware
      params: { id, post_id }, // this req.body property is put here by the client
    } = req;
    console.log(id, post_id)
  
    // TODO: check if username is taken, what should you return?
    const post = await Like.listed(id, post_id);
    console.log(post)

    // session.userId = post.id;
  
    res.send(post);
  };
  
  module.exports = list;
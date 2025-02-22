# Project Architecture: 

Provide an overview of how the different components of your project will interact and work together. This includes database design, APIs, and front-end components.

## Example: 
This is the project architecture for Bloom-Care. The app will have a front-end implemented using React, a back-end using Node.js with Express, and a database using PostgreSQL. Here’s how the components will interact and work together:

### Front-End Components (React):
* **User Interface (UI)**: The front-end will consist of the following components:
   *  A Home Page that displays all of the posts users have made through our app
   *  Buttons on the Home Page that allows users to like/ unlike any post they choose.
   *  When a user Clicks on a post on the Home page, users are redirected to a page with more Information of the clikced post. 
   *  A Form that creates a post based on user input.
   *  A profile page that displays all posts that the current logged in user has made.
   *  buttons on the profile page that allows users to delete the posts they have made.
   *  
   *  An Event Page that displays all of the Events users have made through our app.
   *  Buttons on the Event Page that allows users to Join any event they choose.
   *  A Form that creates Events based on user Input.
   *  In the Profile Page, users will also be able to see a list of Events they have Joined/Cretaed
   *  Buttons on the Profile Page that allows user's to Leave an Event they are appart of.
   *
* **State Management**:
   *  The `HomePage` will manage the state of the list of Posts. Each Post will be A card that displays an image, an address and a posts Description.
   *  The `HomePage` will also manage the state of the Buttons used to Like/Unlike a post.
   *  The `MorePost` Componant will manage the state for More Information of a specific post. This Component displays all the Information relating to the clicked post.
   *  The `CreatePostForm` Componant will manage the user input for Creating a post.
   *  The `UserPost` Component will manage the state of all the Posts the current loged in user has made inside the Profile Page.
   *  The `UserPost` Component will manage the state of all the Buttons in charge of deleting the clicked Post inside the Profile Page.
   *  
   *  The `EventsPage` will manage the State of the lists of Events. Each Event Will be a Card that displays the events name, image, description, address and Contact Information.
   *  The `EventsPage` will also manage the state of the Buttons used to Join a Event.
   *  The `EventsForm` will manage the user input for Creating an Event.
   *  The `UsersPost` component will manage the state of the lists of Events the User has Created/Joined inside the Profile Page.
   *  The `UsersPost` Component will manage the State of the Buttons in charge of Leaving an Event That you have Joined, Inside the Profile Page. 

### Back-End Components (Node.js with Express):
* **API Endpoints**: The back-end will expose several API endpoints to handle different actions such as fetching all Posts and Events, Creating a new Post/or Event, Liking/unLiking a Post, Join/or UnJoin an Event, Feching all of the Posts/Events the user has made/or Joined, Deleting a Post. Users can also click on a post for more information. These include:
    * `GET /listEvents`
    * `GET /listPost`
    * `POST /postEvent`
    * `POST /createPost`
    * `POST /likedPost`
    * `DELETE /unLiked/:id`
    * `POST /joinEvent`
    * `DELETE /deleteJoined/:id`
    * `GET /userPosts/:id`
    * `GET /showEvents:id`
    * `GET /showEventDetail/:id`
    * `DELETE /deletePost/:id`
    * `GET /listPost/:id`
### Interaction Flow:
* When a user opens the app, the front-end will load and send an API request to fetch all Posts from the back-end. 
    * The back-end will retrieve the Posts from the database and return them as a response to the front-end.
    * The front-end will display the Posts on the UI.
* When a user clicks on a Post, the front-end will load and send an API request to fetch all information for that specific Post from the back-end.
    * The back-end will retrieve the information from the database and return them as a response to the front-end.
    * The front-end will display all the information on the UI.
* When a user clicks on a button to like a post, the front-end will load and send an API request to create the liked post in the backend.
    * The back-end will `POST` the information from the frontend and add it to the database.
    * The frontend will update the state of the button to be "unlike" instead of "like".
* When a user clicks on a button to like the same post again, the front-end will load and send an API request to remove the liked post from the backend.
    * The back-end will `DELETE` the previously liked post from the database.
    * The frontend will update the state of the button to be "like" instead of "unlike".  
* When a user clicks submit in the form to create a `Post`, the front-end will load and send an API request to create the `Post` in the backend.
    * The back-end will `POST` the information from the frontend and add it to the database.
    * The frontend will redirect the user to the `Home Page` and display the new `Post`.
* In the profile page, when a user clicks on a button to delete a `Post`. The front-end will load and send an API request to delete the `Post` in the backend.
    * The back-end will `DELETE` the `post` from the database.
    * The frontend will update the `profile page` to remove the deleted  `Post`.


* When a user opens the `Events Page`, the front-end will load and send an API request to fetch all Events from the back-end. 
    * The back-end will retrieve the Events from the database and return them as a response to the front-end.
    * The front-end will display the Events on the UI.
* When a user clicks on a Event, the front-end will load and send an API request to fetch all information for that specific Event from the back-end.
    * The back-end will retrieve the information from the database and return them as a response to the front-end.
    * The front-end will display all the information on the UI.
* When a user clicks on a button to join an event, the front-end will load and send an API request to create the joined event in the backend.
    * The back-end will `POST` the information from the frontend and add it to the database.
    * The frontend will update the state of the button to be "Leave" instead of "Join".
* When a user clicks on the button to Join the same event again, the front-end will load and send an API request to remove the join event from the backend.
    * The back-end will `DELETE` the previously joined event from the database.
    * The frontend will update the state of the button to be "join" instead of "leave".
* When a user clicks submit in the form to create an `Event`, the front-end will load and send an API request to create the `Event` in the backend.
    * The back-end will `POST` the information from the frontend and add it to the database.
    * The frontend will redirect the user to the `Event Page` and display the new `New Event`.

      
Please note that this is a simplified architecture for a basic todo app. In real-world projects, you might consider adding authentication, validation, error handling, and other features to enhance security and usability. Additionally, for larger projects, you may use additional technologies like Redux for state management or implement more complex database schemas and relationships.

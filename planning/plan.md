## Stack 
- Reactjs
- Nodejs 
- PostgresSQL 
- Express 

## Packages 
- Bycrpt 
- Cookie Session 
- Nodemon
- node-sass
- Material UI https://material-ui.com/ (premade componets for ui) 
- lodash 
- react-spring https://www.react-spring.io/ (responsive images)
- date-fns https://date-fns.org/ (makes dates easier to work with)
- socketio https://socket.io (messaging between users) 
- uuid (easily creates unique user ids which is very useful for react)
- axios (client requests -- response with express)
- classnames (allows for conditional css class naming)

## Features 
- Sign up/login 0
- Create/find/join events 0
- Organizer can edit/delete events 0
- Filter by sport/skill-level/date/time/location/gender? 1
- Make and view details about the event i.e. current/max participants, time, location, specific rules, skill level category/co-ed/male/female 1
- Postion selction following event sign up. 2
- Map showing where the location of the event is 2
- Driving time estimate when looking filtering and viewing individual events. User can have the option to change it to walking or puiblic transport. 2

- Group messaging for each event. Message board/comments. 3
- Rating system to show reputable oraganizers and players 3
- In app messaging system 4
- Visual position selection 4
- Pay for 3rd party Referee 5
- Promoting system to allow for users to boost their event in search for more players/specific people ie goalies 5
- User page where they can update info and write a bio

#### Notes 
First sport should be tennis due to not having to book courts, only needing 2-4 people and no speciatly postions. 


# Project Description 

### Title 
Community Sports 

### Project Description 
The problem is that it is hard to find and connect with people in your community to play sports. 
This app will solve that problem by creating a platform which makes it easy to find other in your community who share the same intrests and would like to play with you. 

### Target Audience 
Age: 16+ 
Intrests: Enjoys playing sports 
Genders: All 
Tech Knowlege: 5/10 - Should be easy to naviagate on mobile meaning large icons not much clutter. Need to have basic internet knowelege and an email. 
Language: English only 
Team Members: Bill, Ozge, George 

### User Stories 
- As a user I want to be able to find and confirm my attendance for events. 
- As an organizer I want to be able to create events and find users mark themselves as attending to the event. 
- As a user I want to be able to filter based on the critera of location/skill/time etc. to find events I am intrested in. 
- As a user I want to be able to see organizers ratings and reviews so that I can avoid events that might not be as promising. 
- As a user I want to be able to leave reviews on organizers to show if the event was run well. 
- As an organizer I want to be able to leave reviews/blacklist users who were disruptive at my event. 
- As a user I want to be able to see how far the location is from my current location/other specified location to prioritize places closer to me. 
- As a user or organizer I want to be able to chat with other users in the app to build relationships or find out if the player is coming. 

### Backend Routes 
- / Get
- /signup Get/Post 
- /login Get/Post 

- /events GET 
- /events/:event_id Get/Put/D
- events/new Post 

### Owners to create, edit and cancel event
- /owners/events/:event_id/create
- /owners/events/:event_id/edit
- /owners/events/:event_id/delete

## Users to join, edit, and leave event
- /users/events/:event_id/create
- /users/events/:event_id/edit
- /users/events/:event_id/delete


- /events/:event_id/messages/new Post - Post new message to event message board 
- /events/:event_id/messages/:message_id - Put/Delete existing message

// For user to give ratings to host
- /events/:event_id/ratings/ Post/Put

- /dashboard/events -We will have to condtionally render for upcoming/past/my events



### Frontend Routes 
- / 
- /signup 
- /login 
- /events/index 
- /events/new

#Url
- /events/myevents/upcoming
- /events/myevents/past
- /events/myevents/host

#Pull down memu
- renders with the right events list (without changing the url) 

# Twitch-Chat-Downloader
This is a web application that is a GUI that allows someone to download the chat of a Twitch VOD, and view the downloaded chat.

<br>

# IMPORTANT TO DO:

Add code to generate new token upon loading the app given client id and secret. Put both information in a text file for app to use. Add instructions of getting client id and secret from Twitch pages, and instruction to add them to a text file.

<br>

# Features, Future Work

At this point, the app allows you to do the following: <br>

- Download the chat of a Twitch VOD, and save the data in JSON format
- Enter the name of a Twitch user to get all available past brodcasts for download
- Load a downloaded chat in the web app, to give a more viewable format than JSON

<br>

While this is a functional app that may satisfy some needs, I intend to add more functionality. While they are not implmented, I intend to add the following features: <br>

- Get more VODS than just the past brodcasts of a user, such as highlights, collections and uploads
- Add functionality for queries on the GUI for a downloaded chat, to allow someone to perform analytics on chat data
- Optimize and add flexibility for downloading chats. The app only downloads the entire chat of a VOD, and downloads slowly to obey API limits and ensure no errors occur.
- Better UI

<br> 

# Tech

This was built with

[React.js](https://reactjs.org/) - All of the front end, and actual web app made with [Create React App](https://github.com/facebook/create-react-app) <br>
[Node.js](https://nodejs.org) - All backend code for API calls and file IO <br>


<br>

# Instructions to Run

**I have yet to do the steps to make this run outside of localhost or create-react-app, so the directions below are equivalent to how you would run it when developing a react app in this framework. This will be made easier in the future.**


First, have access to run localhost, and have npm installed, as it's needed to run the app. While in the project directory in command line, run these two commands simultaneously

`npm start` <br>
`node server.js`

The first one is needed to run the app and automatically opens the app in your default browser using localhost. The second one is needed to allow the app to make API calls, and access other project files for functionality.

All other instructions should be provided on pages in the app, or should be straightforward enough to understand by using the tool.

<br>

# Disclaimers

1. This is not intended to be used for commercial/professional use, this was made as a personal project to get experience with React.js and Node.js.

2. The method this tool downloads the chat is from an undocumented endpoint of the TWITCH API v5. Twitch may modify or remove this endpoint without documentation or notification, so this tool can no longer function at any time without notice.

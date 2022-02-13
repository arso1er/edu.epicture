# Epicture

Epicture is a mobile app based on the imgur API. It's an online photo sharing app 
that allows users to find and browse content with the imgur platform.
The app is built with Expo (React Native).

## Requirements

### The Expo Client App

With Expo, you don't have to manually handle the heavy lifting and set up of your mobile project.  
Expo handles the gritty parts of building for each app store so you don't need Xcode or Android Studio to get your app into people's hands.

Download links:
- [iOS](https://apps.apple.com/us/app/expo-client/id982107779)
- [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

### An imgur account

The app requires you to login with an imgur account, with email and password **only**: auth with Google or Social medias are not supported. You can create an account on the [imgur website](https://imgur.com/register).

## Documentation

### Create an imgur Oauth2 application

The Oauth2 application is required to request the public API. A callback URL is set in the app and is depedent of you IP because of how Expo works. The calback URL must be `exp://your_dev_server_address`  
- [create the Oauth App here](https://imgur.com/account/settings/apps).  
- create a `.env` file in the root directory, and add two variables: `IMGUR_API_CLIENT_ID` and `IMGUR_API_CLIENT_SECRET`.

### Run with Expo

To launch the app:
- Install the expo client on your phone
- Run `yarn install` to install projetc's dependencies. Alternatively, you can run `make` to install the dependencies with the provided Makefile.
- Run `yarn start` to start the development server
- Scan the QR code displayed in your terminal with your phone

## Key features

Once logged in, the user has access to the following features:

1. Display his imgur photos
2. Search for photos from imgur with filters
3. Upload new photos to imgur
4. Manage his favorites
5. Upvote and share photos
6. Update his settings

## License

Epicture is [MIT licensed](./LICENSE).
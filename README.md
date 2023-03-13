# MyWalletRecovery

This is a simple react-native app for recovering an ethereum wallet from a 12 word recovery phrase. It allows the user to recover their wallet, and see their balance.

## Setup

To run the app, clone the repo and run `npm i`

If you have the Expo Go app on your phone, just run `npm run start` or `npm run start:dev` and scan the QR code in your terminal.

If you don't have the app, but you have Android Studio or XCode, run either `npm run ios` or `npm run android`

In development mode, you will need to download and startup Ganache, add a `.env.development` file and add the RPC SERVER to an Env variable called `GANACHE_NETWORK`. In production mode, you can optionally add an `ETHERSCAN_API_KEY` env vairable.

## Styles

I used `styled-components` but the UI isn't much. Just readable.

## Security

When recovering an ethereum wallet, the private key is stored using `expo-secure-store`. With more time, I would like build the bridge to the native Keychains myself, to not rely on external code. But it should be secure enough.

Don't use this app with a funded wallet.

## Storing and handling API keys and secrets

You should never store any truly sensitive data on the frontend in react react-native. I have used env files here for ease in a developer environment. Environment variables are embedded in the build, and therefore accessible publicly.

API keys and secrets should be stored safely on a server, and the frontend client should make a request to the server to get the information (not fetch the keys!). The backend should do the hard lifting, in this case an API call.

## Tests

I have only started testing the app. I did not use TDD here as there was a learning curve to pick up typescript and I started the project using a 15 year old machine that can't run anything.

I have used React Native Testing Library, a new testing suite for me.

## Publishing to Google Play and Apple App Store

To prepare the apps for release, fix up some screenshots of the different parts of the app. You need to write a privacy policy. You may need a test account too which the reviewers can use to access the app. The process for Google/Apple differ slightly:

For the Google Play Store, you should first create a Google Play Console account and set up your developer profile. Then you can create a new application by clicking on the "Create Application" button in the console, and choose your default language, app title, and package name. Next, upload your APK file (or Android App Bundle), and fill out all the app's details, such as the app icon, description, and other relevant information. You can also set the price of the app, or whether it is free.

Then you should add the screenshots and any information regarding the app that you want on the Play Store. Once submitted, it can take a few hours for the app to be approved.

The Apple App Store is a bit more tedious. You should first create an Apple Developer Account and an App ID for your app. Then, generate a distribution certificate and a provisioning profile to sign and package your app.

Next, create an archive of your app in Xcode, and then log in to App Store Connect to create a new app listing. Upload your archive file, and fill out all the app's details, such as the app name, bundle ID, version number, description, and pricing etc.

Finally, submit your app for review by Apple. Once it's approved, your app will be available on the App Store. The review process for Apple usually takes a little longer than Google Play.

I would setup a CI/CD pipeline, perhaps using CodeShip or some other product. With a little in app coding, you can then push updates to the app OTA. You could prepare a pipeline through github whereby upon a succesful merge into the main branch, the OTA updates are shipped once checks pass.

You could also writer a deploy script that automates most of the Google/Apple store process. You should push a new version on app store for major updates, especially if they will break backwards compatibility or an API endpoint has changed.

# Running the app

The app is deployed to [netlify](https://app-catalog.netlify.app/) but since I could not find a quick and easy way to deploy nestjs app it still expects to find the api locally. It defaults to localhost:3000 but it can be changed with an env variable.

```
REACT_APP_APIBASE=https://api.host yarn start
```

# The process

I started with researching existing app catalogs and the likes addressed to tech-savvy users (github marketplace, azure marketplace, npm, fdorid, helm charts, github and gitlab repo pages). My goal (and taste) was to create a minimalistic design, removing as much as I could (who needs a version number on the first screen?). I also knew I wanted to feature a big search bar, like new myspace once did - because in the absence of filters this was the primary way for the users to interact with the app. I Tried to make it keyboard friendly, but it still can use a keyboard short to focus search and some polish.

I started with the functionality, letting the form come later. Users will have more value from ugly apps working well than from half-baked pretty ones. I'm not super satisfied with the design, apparently I'm a worse designer than I thought. The next thing I would do would be to sparkle some nice animations here and there (initial loading state) and maybe replace markdown with a skeleton. Also, featured apps should show only 3 items for the users to start noticing changes earlier when they start typing in the search bar.

I've found swr when peeking through happa code and I took the liberty of borrowing it. I ended up wasting too much time to save a request when going from initial view to app details (as all app details are already downloaded by then).

# Corners cut and what I would add

As no project is ever finished this one can use some additional improvements as well:

- better error handling (there is no 404s and the error that shows it is not helpful)
- make the keyboard a first-class citizen
- add tests
- the app is usable on the small screen but it can be better
- nice design including further unifying readme styles with the rest of the app
- links in markdown do work for both readme and sourcecode but the solution is far from being bulletproof
- when searching for author users get no indication why the given app was a match which might be confusing especially for the partial matches
- it misses some visual "wow factor". Like the animation of an app icon during navigation - moving from its position on the initial page to its target position on app details, as fdroid does.
- probably more

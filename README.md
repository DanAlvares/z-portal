# Zoopla Portal


## Running the app
    $ git clone <REPO_URL>  
    $ cd Dan.Alvares  
    $ npm i  
    $ npm start 

## Running the tests
    $ npm test

I have used Jest for unit tests. There aren't many tests yet.   
I have set up a git pre-push hook that runs them.

## Approach

### Tooling
I have used Parcel to compile the SCSS, TypeScript and latest JS features because it is a fast, simple no-config bundler.

### CSS
I have used SCSS files, but the only SCSS feature used is nesting. I made the decision to use CSS Custom Properties (CSS Variables), which means this app is not fully compatible with IE11 and below.

### Why TypeScript?
I am a proponent of TypeScript and use it in almost every project. Interfaces and development-time error checking makes it **easy to maintain, scale and inherit** a codebase, as well as provide a higher level of code confidence overall.

### Custom Elements?
I wanted to use pure JavaScript in the project whilst maintaining a component-based architecture. I did consider the full Web Components spec, but I did not use the Shadow DOM because I wanted the base styles to cascade.

### Workflow
I haven't used any git flow, but, as well as automating the unit tests, I have set up Continuous Deployment with Netlify, so the app is released when the code is pushed or merged to master. https://z-portal.netlify.com/

### Storage
I decided to use IndexedDB. In this way, data will be stored locally by default, making offline support trivial. However, the native API is quite awkward so I started writing a promise-based API wrapper for IndexedDB (`src/services/database.ts`).

## Accessibility
I don't feel too much _more_ needs to be done a highly accessible application. Well structured semantic markup will get the app 80% of the way. The lighthouse score of this app is 100% for all **Performance**, **Best Practices**, **Accessibility** and **SEO**


## TODO
- [ ] Complete styling from `SingleListingComponent`
- [ ] Validate form on submit
- [ ] Listings unit tests
- [ ] Complete IndexedDB wrapper
- [ ] `ThumbnailGallerycomponent` (incl unit tests)
- [ ] `ImageGalleryComponent`(incl unit tests)
- [ ] `PhotoUploadComponent` (to Cloudinary)


#### Would be nice
- [ ] Add Service Worker for PWA
- [ ] Add Cypress e2e & integration tests
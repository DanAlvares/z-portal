# Z - Portal

**Technical test - Take home project.** A portal that would be used by agents, to add, view, edit and expire their listings.

## Running the app
    $ git clone <REPO_URL>  
    $ cd z-portal  
    $ npm i  
    $ npm start 

## Running the tests
    $ npm test

I have used Jest for unit tests. There aren't many tests yet, but I have set up a git pre-push hook that runs them. This is not sustainable as the test suite grows, but I believe is beneficial if the tests run in under 5 seconds.

## Approach
I went for the pure JavaScript approach (well, using TypeScript), with no framework or libraries. This did mean I had to handle rendering, sanitization (to prevent XSS) etc. which comes for free with frameworks, so that was a little time-consuming.  
_(I did step out of my comfort zone a little by writing the entire app using Custom Elements. I have only used them as part of Web Components)_

### Why Custom Elements?
I wanted to build the app using a component-based architecture. Custom Elements seemed like the best choice as I could leverage the built-in lifecycle events. I did consider the full Web Components spec, but I did not use the Shadow DOM because I wanted the base styles to cascade. 

### Tooling
I have used Parcel to compile the SCSS, TypeScript and latest JS features because it is a fast, simple no-config bundler.

### CSS
I have not reached for any CSS framework, just wrote what I needed. I used SCSS files, but the only SCSS feature used is nesting. I made the decision to use CSS Custom Properties (CSS Variables), which means this app is not fully compatible with IE11 and below.

### Why TypeScript?
I am a proponent of TypeScript and use it in almost every project. Interfaces and development-time error checking makes it **easy to maintain, scale and inherit** a codebase, as well as provide a higher level of code confidence overall.

### Workflow
I haven't used any git flow, but, as well as automating the unit tests, I have set up Continuous Deployment with Netlify, so the app is released when the code is pushed or merged to master. https://z-portal.netlify.com/

### Storage
I initially decided to use IndexedDB. In this way, data will be stored locally by default, making offline support trivial. However, the native API is quite awkward so I started writing a promise-based API wrapper for IndexedDB (`src/services/database.ts`). All that was taking too much time and was overkill for this project so I just went with LocalStorage.

### Accessibility
Well structured, semantic markup will get the app 80% of the way. I don't feel too much _more_ needs to be done to achieve a highly accessible application. The lighthouse score of this app is 100% for all **Performance**, **Best Practices**, **Accessibility** and **SEO**

## TODO
- [ ] Complete `ImageGalleryComponent`(incl unit tests)
- [ ] `PhotoUploadComponent` (to Cloudinary)
- [ ] Improve unit test coverage

#### Would be nice
- [ ] Add Service Worker for PWA
- [ ] Add Cypress e2e & integration tests
- [ ] Complete Promise-based API for Indexed DB


## Questions
If you have any questions or comments, please do get in touch.

# Conference Buddy 2.0.

✨ this is a work-in-progress project ✨

## Background about the project

Conference Buddy aims to a platform to find companions for tech conferences if you're uncomfortable going on your own - or if you want to support someone who feels that way!

You can look for one or more person with whom you can attend a conference together. Support each other, find a familiar face between all these strangers. You will feel more at ease and comfortable just knowing you’re not alone.

At the same time, you have the opportunity to help others to feel better! Let’s make tech events more approachable - one Buddy at a time.

## Background about the `code`

At it's current state, the code is a mix of POC and MVP. It's messy and it's a bit chaotic, but that's ok for me right now. I want to move things around and explore approaches in code. Since I'm working alone, I don't pay attention to readability and since it chances a lot, I even decided to not add a lot of tests 😱. Which is quite unusal for me. You will find some weirdly well tested parts in between, because sometimes I cave in and write tests anyway. They calm me.

And I'm already looking forward _a lot_ to the moment I start 🧼 clean up things, explore refactoring patterns and finally go into the Zen 🧘‍♀️ of testing all the things!

## Tech stack

- [Gatsby 4](https://www.gatsbyjs.com/gatsby-4/)
- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Directory structure

The structure is inspired in parts by [Elegant Frontend Architecture](https://michalzalecki.com/elegant-frontend-architecture/).

### domain

Contains different domains which are needed to describe the "Conference Buddy" application. They are specific to Conference Buddy. They are the concepts you would elaborate on when describing Conference Buddy.

`domain` is where business logic lives and a layer between e.g. the database and `web`.

### web

Contains everything related to the UI side of Conference Buddy. `web` consumes information from `domain` that are catered for the needs of the UI and knows nothing for example about the database.

#### `assets`

Contains assets like scss and images.

This includes:

- `conference`
- `profile`
-

#### `pages`

Contains every page of the application. Directory names represent the route, so the `/pages/conference/index.tsx` is rendered in `https://conferencebuddy.io/conference-list`. Components in `pages` should only consist of the `LayoutWrapper`, needed queries and use their representive `page-template` as a child of `LayoutWrapper`.

See [gatsby documentation](https://www.gatsbyjs.com/docs/reference/routing/creating-routes/#define-routes-in-srcpages) for more infos.

#### `services`

Contains functionality that is used in multiple areas to reduce coupling between different layers. This includes all custom hooks and the database client. The naming is off, I'm open for suggestions! For now, it's good enough.

#### `ui-elements`

Contains all UI elements in form of React components. More detailed structure here is still work in progress and tbc :D

## Webseries on starting of the Conference Buddy 2.0 MVP

Benedicte aka [Queen Raae](https://queen.raae.codes/) invited me to her weekly streaming format "[Unauthorized and rum-fueled treasure hunts in the sharky waters around the Gatsby islands](https://www.youtube.com/watch?v=ZTIoA298mX4&list=PL9W-8hhRoLoNpEj71YsWChzOAocHiGZB4)" and helped me get Conference Buddy 2.0 off the ground 🎉

## You want to support?

Awesome 🎉

- Head over to [discussions](https://github.com/conference-buddy/conference-buddy-web-app/discussions) to share ideas, ask questions or just say "👋 Hello".
- 💸 [Open collective](https://opencollective.com/conference-buddy) and [Ko-fi](https://ko-fi.com/conferencebuddy) are a way to support financially.

## What about contributing code?

Conference Buddy 2.0. is just beginning to become a MVP, so I still have a lot of work to do and figure a lot of stuff out while working on it. It's in a lot of parts a POC and not ready in terms of readability and test coverage to be contributed to. So, currently there is no process how handle code contributions.

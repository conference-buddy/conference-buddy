# Conference Buddy 2.0.

✨ this is a work-in-progress project ✨

## Working on the first MVP through the holiday season

Benedicte aka [Queen Raae](https://queen.raae.codes/) ([@raae](https://github.com/raae) here at gitub) is supportig me in building Conference Buddy 2.0.

Be a fly on the wall, or an active participant, in the development:

- 🗓 every Thursday
- 🕰 at 19:00 (CET)
- 🔗 [live on youtube](https://queen.raae.codes/emails/2021-12-02-conference-buddy-2.0/)

I also try to keep this repository up to date:

- you can follow the progress in the [project board](https://github.com/conference-buddy/conference-buddy-web-app/projects/1)
- you can follow my homework from our streams in the [discussion board](https://github.com/conference-buddy/conference-buddy-web-app/discussions/categories/homework-for-mirjam)

## You want to support?

Awesome 🎉

- Head over to [discussions](https://github.com/conference-buddy/conference-buddy-web-app/discussions) to share ideas, ask questions or just say "👋 Hello".
- 💸 [Open collective](https://opencollective.com/conference-buddy) and [Ko-fi](https://ko-fi.com/conferencebuddy) are a way to support financially.

## What about contributing code

Conference Buddy 2.0. is just beginning to become a MVP, so I still have a lot of work to do and figure a lot of stuff out while working on it. That being said, currently there is no process how handle code contributions.

## Tech stack

- [Gatsby 4](https://www.gatsbyjs.com/gatsby-4/)
- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Directory structure

The structure is inspired by [Elegant Frontend Architecture](https://michalzalecki.com/elegant-frontend-architecture/).

### `assets`

Contains assets like scss and images.

### `domain`

Contains different domains which are needed to describe the "Conference Buddy" application. They are specific to Conference Buddy. They are the concepts you would elaborate on when describing Conference Buddy.

This includes:

- `conference`
- `profile`
-

### `page-templates`

Contains every template for a `page`. Components in `pages` should only consist of the LayoutWrapper and needed queries. This makes testing easier, because for components in `page-templates` it is not needed to mock out `WrapperLayout` and mock queries to test them.

### `pages`

Contains every page of the application. Directory names represent the route, so the `/pages/conference/index.tsx` is rendered in `https://conferencebuddy.io/conference-list`. Components in `pages` should only consist of the `LayoutWrapper`, needed queries and use their representive `page-template` as a child of `LayoutWrapper`.

See [gatsby documentation](https://www.gatsbyjs.com/docs/reference/routing/creating-routes/#define-routes-in-srcpages) for more infos.

### `services`

Contains functionality that is used in multiple areas to reduce coupling between different layers. This includes all custom hooks and the database client.

### `ui-elements`

Contains ui elements which are Conference Buddy agnostic and don't contain any business logic. For example a `Header`, `Footer` or `Button`.

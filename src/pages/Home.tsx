import React from "react"
import Layout from "../templates/Layout"

export function Home() {
  return (
    <Layout title="Conference Buddy">
      <header>
        <h1 className="display-1">Hello world, this is Conference Buddy</h1>
      </header>
      <section>
        <h2>Pages</h2>
        <nav>
          <ul>
            <li>
              <a href="/conference-list">Conference List</a>
            </li>
            <li></li>
          </ul>
        </nav>
      </section>
      <button className="btn btn-secondary">test button</button>
      <section>
        <h2>Colors</h2>
        <ul>
          <li className="text-confbuddy-green">Conference Buddy GREEN</li>
          <div className="bg-confbuddy-green">TESTIIIIII</div>
          <li className="text-confbuddy-pink">Conference Buddy PINK</li>
          <div className="bg-confbuddy-pink">TESTIIIIII</div>
          <li className="text-primary">Primary</li>
          <div className="bg-primary">TESTIIIIII</div>
          <li className="text-secondary">Secondary</li>
          <div className="bg-secondary">TESTIIIIII</div>
          <li className="text-success">text-success</li>
          <div className="bg-success">TESTIIIIII</div>
          <li className="text-info">text-info</li>
          <div className="bg-info">TESTIIIIII</div>
          <li className="text-warning">text-warning</li>
          <div className="bg-warning">TESTIIIIII</div>
          <li className="text-danger">text-danger</li>
          <div className="bg-danger">TESTIIIIII</div>
          <li className="text-light">text-light</li>
          <div className="bg-light">TESTIIIIII</div>
          <li className="text-dark">text-dark</li>
          <div className="bg-dark">TESTIIIIII</div>
        </ul>
      </section>
    </Layout>
  )
}

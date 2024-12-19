import "./about.css"

function About() {
  return (
    <div className="about">
      <div className="about_bg">
        <div className="about_wrapper">
          <section className="about-section">
            <h2>About How 2 Overwatch</h2>
            <p>
              Welcome to "How 2 Overwatch," a fan-made project dedicated to
              helping players of all skill levels explore the world of
              Overwatch®! This website is mainly a project for my front-end
              developer portfolio, but I’ve tried to make it as helpful for
              other players as possible.
            </p>
          </section>

          <section className="about-section">
            <h2>Why I Created This Website</h2>
            <p>
              As an avid Overwatch® player, I noticed how overwhelming the game
              can be for newcomers. From learning the basics to mastering unique
              heroes and roles, there’s so much to discover! I created this
              website to simplify these complexities and provide a user-friendly
              resource for both new and experienced players.
            </p>
          </section>

          <section className="about-section">
            <h2>What You’ll Find Here</h2>
            <ul>
              <li>Tips and strategies for playing different heroes</li>
              <li>
                A single place where you can view every non OWL related hero
                skin, whether available or not!
              </li>
              <li>An easy to use countering cheat sheet</li>
              <li>
                A tier list to help you decide which heroes are worth mastering
                in the current meta
              </li>
            </ul>
            <p>
              More features will be added over time. Feel free to contact{" "}
              <a
                className="about_content-link"
                href="https://szymon-bosiak.github.io/Portfolio/"
                target="_blank"
                rel="noopener noreferrer"
              >
                me
              </a>{" "}
              with your suggestions.
            </p>
          </section>

          <section className="about-section">
            <h2>Legal Disclaimer</h2>
            <p>
              This website is a fan project dedicated to Overwatch®, a game
              created by Blizzard Entertainment®. All materials, names, and
              images are trademarks and copyrights of Blizzard Entertainment®.
              This project was created for non-commercial, personal, and
              educational purposes.
            </p>
            <p>
              This site is not affiliated with, endorsed by, or in any way
              associated with Blizzard Entertainment®. All game-related
              materials are used under Blizzard’s guidelines for non-commercial
              personal use.
            </p>
            <p>
              If you have any questions or concerns about the content on this
              site, please contact{" "}
              <a
                className="about_content-link"
                href="https://szymon-bosiak.github.io/Portfolio/"
                target="_blank"
                rel="noopener noreferrer"
              >
                me
              </a>
              .
            </p>
          </section>

          <section className="about-section">
            <h2>Thank You!</h2>
            <p>
              Thank you for visiting "How 2 Overwatch"! I hope you find this
              website helpful and fun to explore. Feel free to share it with
              other players, and let’s make Overwatch® even more enjoyable
              together!
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About

import "./footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_decorator"></div>
      <div className="footer_content">
        <p>
          Website made by{" "}
          <a
            href="https://szymon-bosiak.github.io/Portfolio/"
            className="footer_content-link"
          >
            Monbo
          </a>
        </p>
        <p>
          This website is a fan project and is not affiliated with or endorsed
          by Blizzard Entertainment®.
        </p>
        <p>
          Overwatch® and all related materials are the property of Blizzard
          Entertainment®.
        </p>
      </div>
    </footer>
  )
}

export default Footer

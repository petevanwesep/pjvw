class FrontPageCopy extends React.Component {
  constructor(props) {
    super(props);

    if(window.location.hash) {
      var displayedCopy = window.location.hash.replace('#','');
    } else {
      var displayedCopy = 'default';
    }

    this.state = { displayedCopy: displayedCopy };
    this.openNavItem = this.openNavItem.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  openNavItem(itemText) {
    $('.content').removeClass('active');
    this.setState({ displayedCopy: itemText });
    Pjvw.Ga.sendPageView(itemText);
    window.location.hash = itemText;
    window.setTimeout(function() {
      $('.content').addClass('active');
    }, 200);
  }

  handleClick(e) {
    var navItemText = $(e.target).data('react-copy');
    if (navItemText) {
      this.openNavItem(navItemText)
    }
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  render() {
    if(this.state.displayedCopy == 'code') {
      return(<Code />);
    } else if(this.state.displayedCopy == 'contact') {
      return(<ContactForm />);
    } else if(this.state.displayedCopy == 'resume') {
      return(<Resume />);
    } else if(this.state.displayedCopy == 'me') {
      return(<About />);
    } else {
      return(<About />);
    }
  }
}

class About extends React.Component {
  render() {
    return(
      <section className="content">
        <p>Hands-on engineering leader with a proven record of turning software into lasting business value. I build teams where empathy and technical depth reinforce each other.</p>
        <p>Happily based in Oakland, CA ☀️ 🌉 🌊</p>
      </section>
    );
  }
}

class Resume extends React.Component {
  render() {
    return(
      <div className="resume content">
        <a className="resume-download" href="resume.pdf" target="_blank" rel="noopener" aria-label="Download résumé (PDF)" title="Download résumé (PDF)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3v12" />
            <path d="M7 11l5 5 5-5" />
            <path d="M5 20h14" />
          </svg>
        </a>
        <section className="work">
          <h1>Experience</h1>
          <h1>Director of Engineering at <a href="https://www.forgeglobal.com">Forge</a> (2018 - Present)</h1>
          <ul>
            <li>Manage multiple full-stack teams focused on providing services related to customer identity verification, risk management and user access controls</li>
            <li>Developed a C#-based customer identity aggregation service for KYC checks on ECS, utilizing tools like Harbor, Istio, Jaeger, and Dapr to ensure robust and efficient operations.</li>
            <li>Spearheaded design of an IDP-agnostic, policy-as-code user access management service</li>
            <li>Effectively managed my team through two major transitions - the 2020 merger of Sharespost and Forge Global and Forge’s 2021 debut as a public company. Adapted team workflows to meet the needs and compliance requirements of a publicly traded entity.</li>
            <li>Directed the rapid prototyping of Forge’s initial data product offering, Forge Intelligence. Applied sprint forecasting and in-depth retrospective analysis to ensure productivity and alignment with business goals.</li>
          </ul>
          <h1>Senior Software Engineer at <a href="https://www.brightbytes.net">BrightBytes</a> (2015 - 2018)</h1>
          <ul>
            <li>Led development and maintenance of multiple RoR platforms/APIs and Angular/React applications, championing agile methodologies to enhance team efficiency and product quality.</li>
            <li>Pioneered the dockerization of Rails/Elixir applications, streamlining the bootstrapping process and facilitating seamless deployment to AWS, thereby enhancing operational efficiency and scalability.</li>
            <li>Owned the development of a high-availability Elixir application leveraged by multiple platform services</li>
          </ul>
          <h1>Senior Software Engineer at <a href="https://www.tanga.com">Tanga.com</a> (2013 - 2015)</h1>
          <ul>
            <li>Contributed to e-commerce site built using AngularJS/Ruby on Rails. Development team embraced continuous integration/deployment, TDD, and striving for 100% paired code.</li>
          </ul>
          <h1>Software Engineer at <a href="http://upwork.com/">Upwork (formerly oDesk)</a> (2011 - 2013)</h1>
          <ul>
            <li>Built and maintained an e-commerce API using NodeJS, Express and Q promises library</li>
          </ul>
          <h1>Software Consultant (2009 - 2011)</h1>
          <ul>
            <li>Developed tool to allow non-technical users to flag meaningful sections of a document and automatically generate code to extract data from similarly formatted documents</li>
            <li>Deployed a Facebook application using Facebook’s PHP and JavaScript SDKs which provides users with an alternative interface for posting to pages they are fans of</li>
          </ul>
          </section>
        <section className="education">
          <h1>Education</h1>
          <h1><p>University of Washington (Seattle, WA)</p></h1>
          <p>Bachelor of Science</p>
          <p>Major: Computer Science</p>
          <p>Graduated 2009</p>
        </section>
        <section className="research">
          <h1>Publication</h1>
          <h1><p><a href="http://www.usenix.org/events/nsdi10/tech/full_papers/katz-bassett.pdf">Reverse Traceroute</a></p></h1>
          <p>Katz-Bassett, H. V. Madhyastha, V. Kumar Adhikari, C. Scott, J. Sherry, P. van Wesep, T. Anderson, A. Krishnamurthy</p>
          <p>USENIX Symposium on Networked Systems Design & Implementation</p>
          <p>April 28-30, 2010</p>
          <p>San Jose, CA</p>
          <p>Awarded Best Paper</p>
        </section>
      </div>
    );
  }
}

class Code extends React.Component {
  render() {
    return(
      <section className="content">
        <p>Years of writing and shipping code have shaped a few convictions about how it is best done:</p>
        <ol>
          <li>Feature development should be test-driven and new code should be written in small, easily testable units. Shortcuts which add technical debt should be avoided, with rare exceptions.</li>
          <li>Release cycles should be kept short, thus providing the team with a clear focus and giving stakeholders an immediate opportunity for feedback.</li>
          <li>All aspects of the development cycle which can be automated should be automated (eg. continuous testing/integration, code generators for any common implementation patterns). This avoids human error and allows developers to spend their time solving new problems.</li>
          <li>Teams should be kept small and tightly knit. Pairing on code whenever possible leads to higher code quality and increased communication among team members. A passionate, highly communicative development team achieves the best results.</li>
          <li>Any ideas that lead to suboptimal results should be deprecated in favor of better ideas.</li>
        </ol>
      </section>
    );
  }
}

ReactDOM.render(
  <FrontPageCopy />,
  document.getElementById('copy-container')
);

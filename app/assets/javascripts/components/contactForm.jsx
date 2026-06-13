class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuccess: false,
      showFailure: false,
      contactForm: {
        name: '',
        email: '',
        message: ''
      }
    }
    this.setcontactForm = this.setcontactForm.bind(this);
    this.setAlert = this.setAlert.bind(this);
  }

  setcontactForm(key, value) {
    this.state.contactForm[key] = value;
  }

  setAlert(status) {
    _this = this;
    if (status === 'success') {
      this.setState({showSuccess: true});
      window.setTimeout(function() {
        _this.setState({showSuccess: false});
      }, 3500);
    } else {
      this.setState({showFailure: true});
      window.setTimeout(function() {
        _this.setState({showFailure: false});
      }, 3500);
    }
  }

  render() {
    return(
      <section className="content">
        { this.state.showSuccess ? <AlertSuccess /> : null }
        { this.state.showFailure ? <AlertFailure /> : null }
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <ContactFormName setcontactForm={this.setcontactForm} />
          <ContactFormEmail setcontactForm={this.setcontactForm} />
          <ContactFormMessage setcontactForm={this.setcontactForm} />
          <div className="visually-hidden" aria-hidden="true">
            <label htmlFor="nickname">Leave this field blank</label>
            <input id="nickname" name="nickname" tabIndex="-1" autoComplete="off" />
          </div>
          <ContactFormSubmit setAlert={this.setAlert} contactForm={this.state.contactForm} />
        </form>
      </section>
    );
  }
}

class AlertSuccess extends React.Component {
  render() {
    return(
      <div className="alert alert-success" role="status">
        <strong>Thanks!</strong> I'll get back to you as soon as I can.
      </div>
    );
  }
}

class AlertFailure extends React.Component {
  render() {
    return(
      <div className="alert alert-danger" role="alert">
        <strong>Hm…</strong> Your message wasn't sent. Maybe try me on <a href="https://www.linkedin.com/in/petevanwesep/" target="_blank" rel="noopener">LinkedIn</a>?
      </div>
    );
  }
}

class ContactFormField extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
}

class ContactFormName extends ContactFormField {
  handleChange(e) {
    this.props.setcontactForm('name', e.target.value);
  }

  render() {
    return(
      <div className="field">
        <label htmlFor="name">Name</label>
        <input onChange={this.handleChange} type="text" id="name" name="name" placeholder="First & last name" required />
      </div>
    );
  }
}

class ContactFormEmail extends ContactFormField {
  handleChange(e) {
    this.props.setcontactForm('email', e.target.value);
  }

  render() {
    return(
      <div className="field">
        <label htmlFor="email">Email</label>
        <input onChange={this.handleChange} type="email" id="email" name="email" placeholder="you@domain.com" required />
      </div>
    );
  }
}

class ContactFormMessage extends ContactFormField {
  handleChange(e) {
    this.props.setcontactForm('message', e.target.value);
  }

  render() {
    return(
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea onChange={this.handleChange} id="message" name="message" rows="4" required></textarea>
      </div>
    );
  }
}

class ContactFormSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit() {
    _this = this;
    $.post(
      '/contact_forms',
      { contact_form: this.props.contactForm },
      function(response, status) {
        _this.props.setAlert(status);
      }
    );
  }

  render() {
    return(
      <div className="field">
        <button onClick={this.submit} id="submit" name="submit" type="submit" className="btn">Get in touch</button>
      </div>
    );
  }
}

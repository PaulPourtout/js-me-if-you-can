import * as React from "react";
import styled from "styled-components";
import { ColorPalette } from "../style/Palette";
import { Button } from "../style/StyledComponents";
import {Services} from "../../utils/services";
import { UserListener } from "../../context/UserProvider";
import { IUser } from "../../interfaces/IUser";

interface Props {
  user: IUser,
  login: () => void;
  logout: () => void;
}

interface State {
  username: string;
  email: string;
  password1: string;
  password2: string;
  errorMessage: string;
  isValidPassword: boolean;
  isValidPassword2: boolean;
}


export class SignupPageComponent extends React.Component<Props, State> {
  state: State = {
    username: "",
    email: "",
    password1: "",
    password2: "",
    errorMessage: "",
    isValidPassword: false,
    isValidPassword2: false,
  };

  private EMAIL_PATTERN = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  private PASSWORD_PATTERN = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}";

  Auth = Services.Auth;

  render() {
    return (
      <main style={style.main} >
        <Form onSubmit={
            (e) => this.handleSubmitSignup(e, this.state.username, this.state.email, this.state.password1)
          }>

          <label htmlFor="username">Username:</label>
          <input
            required
            style={ style.input }
            type="text"
            value={this.state.username}
            name="username"
            placeholder="Username"
            onChange={this.handleChangeInput}
          />

          <label htmlFor="email">Email:</label>
          <input
            required
            style={ style.input }
            type="text"
            value={this.state.email}
            pattern={this.EMAIL_PATTERN}
            name="email"
            placeholder="Email"
            onChange={this.handleChangeInput}
          />

          <label htmlFor="password1">Password:</label>
          <input
            required
            style={{
              ...style.input,
              ...this.isCorrectField(this.state.isValidPassword)
            }}
            name="password1"
            type="password"
            pattern={this.PASSWORD_PATTERN}
            value={this.state.password1}
            placeholder="password"
            onChange={this.handleChangeInput}
          />

          <label htmlFor="password2">Repeat password:</label>
          <input
            required
            style={{
              ...style.input,
              ...this.isCorrectField(this.state.isValidPassword2)
            }}
            name="password2"
            type="password"
            pattern={this.state.password1}
            value={this.state.password2}
            placeholder="password"
            onChange={this.handleChangeInput}
          />
          <span style={style.subText}>Must contain more than 7 characters, upper and lower letters and numbers</span>
          
          {
            this.state.errorMessage.length > 2 &&
            <p style={{ color: "red", marginTop: "1rem" }}>{this.state.errorMessage}</p>
          }

          <Button
            fullWidth
            active
            style={{ marginTop: "2rem" }}
          >
            Submit
          </Button>
        </Form>
      </main>
    );
  }

  isCorrectField = (correctField: boolean) => {
    return { borderColor: correctField ? 'green' : 'red' }
  }

  handleChangeInput = e => {
    let isValidPassword = this.state.isValidPassword;
    let isValidPassword2 = this.state.isValidPassword2;
  
    if (e.target.name === "password1") {
      isValidPassword = this.isValidPassword(e.target.value)
    }
    if (e.target.name === "password2") {
      isValidPassword2 = this.isValidPassword2(e.target.value)
    }

    this.setState({
      [e.target.name]: e.target.value,
      isValidPassword,
      isValidPassword2
    } as Pick<State, keyof State>);
  };

  handleSubmitSignup = (e, username, email, password) => {
    e.preventDefault();

    this.Auth.submitSignup(username, email, password)
    .then(res => this.props.login())
    .catch(err => {
      this.setState({errorMessage: err.message})
    })
  };

  isValidPassword = (password:string) => {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/ig;
    return reg.test(password);
  }

  isValidPassword2 = (password2:string) => {
    return password2 === this.state.password1
  }
}

export const SignupPage = UserListener(SignupPageComponent);


const style:React.CSSProperties = {
  input: {
    margin: "0.5rem 0",
    width: "100%",
    boxShadow: "none",
    border: `2px solid ${ColorPalette.primary}`,
    padding: "0.3rem",
    fontSize: "1.5rem",
    boxSizing: "border-box"
  },
  main: {
    backgroundColor: "#F4F4F4",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  },
  subText: {
    fontSize: "0.9rem",
    color: ColorPalette.lightText
  }
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  align-items: center;
  background-color: #fff;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 0.1rem;
`;

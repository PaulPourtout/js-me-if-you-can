import * as React from "react";
import styled from "styled-components";
import { ColorPalette } from "../style/Palette";
import { Button } from "../style/StyledComponents";
import {Services} from "../../utils/services";
import {UserListener} from '../../context/UserProvider';
import {IUser} from '../../interfaces/IUser';

interface ILoginPageProps {
  user: IUser,
  login: () => void;
  logout: () => void;
}

export class LoginPageComponent extends React.Component<ILoginPageProps, any> {
  state = {
    email: "",
    password: "",
    errorMessage: ""
  };

  Auth = Services.Auth;

  render() {
    const inputStyle = {
      margin: "0.5rem 0",
      width: "100%",
      boxShadow: "none",
      border: `2px solid ${ColorPalette.primary}`,
      padding: "0.3rem",
      fontSize: "1.5rem",
      boxSizing: "border-box"
    };
    return (
      <main
        style={{
          backgroundColor: "#F4F4F4",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex"
        }}
      >
        <Form>
          <label htmlFor="">Email:</label>
          <input
            style={inputStyle}
            type="text"
            value={this.state.email}
            name="email"
            placeholder="Email"
            onChange={this.handleChangeInput}
          />
          <label htmlFor="">Password:</label>
          <input
            style={inputStyle}
            name="password"
            type="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.handleChangeInput}
          />
          {
            this.state.errorMessage.length > 2 &&
            <p>{this.state.errorMessage}</p>
          }
          <Button
            fullWidth
            active
            onClick={e => this.handleSubmitLogin(e, this.state.email, this.state.password)}
          >
            Submit
          </Button>
        </Form>
      </main>
    );
  }

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmitLogin = (e, email, password) => {
    e.preventDefault();

    this.Auth.submitLogin(email, password)
    .then(res => this.props.login())
    .catch(err => console.error(err))
  };
}


export const LoginPage = UserListener(LoginPageComponent); 


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

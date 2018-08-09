import * as React from "react";
import { Link } from "react-router-dom";
import { UserListener } from "../../context/UserProvider";
import styled from "styled-components";
import { ColorPalette } from "../style/Palette";
import AccountCircle from "react-icons/lib/md/account-circle";
import {GlobalStyle} from "../style/GlobalStyle";
import {history} from "../../Router";
import {Popover} from "./Popover";
import {IUser} from "../../interfaces/IUser";
import {Nav} from "../style/StyledComponents";
const exag = require("../../assets/exag.png");


interface State {
	activeAccountMenu
}

interface Props {
    user:IUser;
    logout: () => void;
    login: () => void;
}

export class HeaderComponent extends React.Component <Props, any> {
	private popover = null;

	state = {
		activeAccountMenu: false,
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.closeActivePopover)
	}

	componentWillUnmount() {  
		document.removeEventListener("mousedown", this.closeActivePopover)
	}

	closeActivePopover = (event) => {
		if (this.popover && this.state.activeAccountMenu && !this.popover.contains(event.target)) {
		this.togglePopover();
		}
	}

	goToAccountPage = () => {
		history.push("/account");
	}

	togglePopover = () => {
		this.setState((oldState:State) => ({activeAccountMenu: !oldState.activeAccountMenu}))
	}

	render () {
		const {user, logout, login} = this.props;

		const popoverActions = [
		{
			label: "My Account",
			func: this.goToAccountPage
		},
		{
			label: "Log-out",
			func: logout
		}
		]

		return (
		<NavHeader>
			<div style={{display: "flex", alignItems: 'center'}}>
				<Link to={user && user.authenticated ? "/dashboard" : "/"}>
					<h1 className="App-title">
						<span style={{color: ColorPalette.secondary}}>JS</span><span style={{ fontSize: 15 }}>me</span>
					</h1>
				</Link>
				{ user && user.authenticated && (
					<MainNav>
						<Link style={GlobalStyle.NavLinkStyle} to="/dashboard">Dashboard</Link>
						<Link style={GlobalStyle.NavLinkStyle} to="/kataslist">Katas</Link>
						<Link style={GlobalStyle.NavLinkStyle} to="/serieslist">Series</Link>
					</MainNav>
				)}

			</div>
			{ user && user.authenticated && (
				<div style={{ display: "flex", position: "relative" }}>
					<button onClick={this.togglePopover}
							style={{cursor: 'pointer', outline: "none", display: "flex", alignItems: 'center', textTransform: "uppercase", background: "none", border: "none"}}>
						<p style={{color: ColorPalette.tertiary}}>{user.username}</p>
						<AccountCircle style={{color: ColorPalette.secondary, fontSize: 24}}/>
					</button>
					
					<div ref={ref => this.popover = ref}>
						<Popover active={this.state.activeAccountMenu} actions={popoverActions} close={this.togglePopover}/>
					</div>

				</div>
			)}
			{(!user || !user.authenticated) && (
				<Nav>
						<Link style={GlobalStyle.NavLinkStyle} to="/login">
							Login
						</Link>
						<p style={GlobalStyle.NavLinkStyle}>|</p>
						<Link style={GlobalStyle.NavLinkStyle} to="/signup">
							Sign-up
						</Link>
				</Nav>
			)}
		</NavHeader>
		);
	};
}

const NavHeader = styled.nav`
	background-color: ${ColorPalette.primary};
	background: url(${exag}),
		linear-gradient(
			45deg,
			${ColorPalette.primary} 0%,
			${ColorPalette.primary} 50%,
			rgba(0, 0, 0, 0) 100%
		),
		linear-gradient(130deg, ${ColorPalette.fourthiary} 0%, rgba(0, 0, 0, 0) 30%),
		linear-gradient(-45deg, ${ColorPalette.primary} 0%, rgba(0, 0, 0, 0) 50%);

	padding: 10px 20px;
	color: white;
	text-align: left;
	display: flex;
	align-items: center;
	justify-content: space-between;

	a {
		text-decoration: none;
	}
`;

const MainNav = styled.nav`
	display: flex;
	position: relative;
	padding-left: 1rem;

	@media(max-width: 600px) {
		display: none;
	}
`;

export const Header = UserListener(HeaderComponent);

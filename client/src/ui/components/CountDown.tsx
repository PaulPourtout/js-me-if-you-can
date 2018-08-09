import * as React from "react";
import styled from 'styled-components';
import { ColorPalette } from "../style/Palette";
import {Link} from 'react-router-dom';
import {Portal} from './Portal';
import {timeUtils} from '../../utils/timeUtils';

interface CountDownProps {
	paused: boolean;
	startingTime: number;
	mode: "chill" | "countdown" | "score";
}

export class CountDown extends React.Component<CountDownProps, any> {
	
	state = {
		countDown: 0,
		timeToAdd: 0,
		gameOver: false,
	};
	
	componentDidMount() {
		const startingTime = this.props.mode === 'countdown'
			? Math.floor(this.props.startingTime)
			: 0;
		
		this.setState({countDown: startingTime});
	}

	// Starts timer in countdown game mode
	public startCountDown = (startingTime: number) => {
		let now = new Date().getTime();
		const countDownDate = Math.floor(now + startingTime);
		
		const handleCountDown = setInterval(() => {
			now = new Date().getTime();
			const countDown = Math.floor((countDownDate + this.state.timeToAdd)- now);

			if (countDown >= 0 && !this.props.paused) {
				this.setState({ countDown})
			}
			else {
				clearInterval(handleCountDown);
				console.log('game over ?', countDown)
				if (countDown <= 0) this.setState({gameOver: true})
			}
		}, 1001);
	};

	// Starts timer in score game mode
	public startTimer = () => {
		const startTime = new Date().getTime();

		const countTime = setInterval(() => {
			if (!this.props.paused) {
				const now = new Date().getTime();
				this.setState({countDown: now - startTime})
			} else {
				clearInterval(countTime);
			}
		}, 1000);
	}

	public addTime = (time) => {
		console.log('TIME to add', time)
		this.setState((state) => ({timeToAdd: state.timeToAdd + time}))
	}

	public getTime = () => {
		return this.state.countDown
	}


	render() {
		const {countDown} = this.state;
		const countDownTime = timeUtils.formatTime(countDown)
		// console.log('Countdown ', countDown, 'SECONDES', countDownTime.secondes, '\nMINUTES ', countDownTime.minutes)
		return (
		<div>
			<Time>{countDownTime.minutes}:{countDownTime.secondes}</Time>
			<Portal visible={this.state.gameOver}
					title="Game Over !!!!"
			>
				<Link to="/"></Link>
			</Portal>
		</div>
		);
	}
}

const Time = styled.p`
	font-size: 2rem;
	color: ${ColorPalette.primary};
`
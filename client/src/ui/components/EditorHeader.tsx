import * as React from 'react';
import styled from 'styled-components';
import {Button} from '../style/StyledComponents';
import {LevelsBar} from './LevelsBar';
import {CountDown} from './CountDown';

interface IEditorHeader {
	ref:any;
    currentKataIndex: number;
	currentKataPassed: boolean;
	handleGoToNextKata: () => void;
	gameMode: "countdown" | "score" | "chill";
	countdownPaused: boolean;
	countDownStartingTime: number;
	maxLevel: number;
}

export class EditorHeader extends React.Component<IEditorHeader, any> {
	countdown:any;

	public startCountDown = (time:number) => {
		this.countdown.startCountDown(time)
	}

	public startTimer = () => {
		this.countdown.startTimer()
	}

	public addTime = (time:number) => {
		this.countdown.addTime(time)
	}

	public getTime = () => {
		return this.countdown.getTime();
	}

	render () {
		const { currentKataIndex,
				maxLevel,
				gameMode,
				currentKataPassed,
				handleGoToNextKata,
				countdownPaused,
			} = this.props;

	return (
		<Container>
			<div style={{ display: "flex", alignItems: "center" }}>
				<h3>Levels: </h3>
				<LevelsBar current={currentKataIndex} maxLevel={maxLevel} />
			</div>
			
			{
				(gameMode == "countdown" || gameMode == "score") &&
				<CountDown  ref={ref => this.countdown = ref}
							mode={this.props.gameMode}
							startingTime={this.props.countDownStartingTime}
							paused={countdownPaused}
				/>
			}

			<Button active={currentKataPassed}
					onClick={currentKataPassed ? handleGoToNextKata : () => null}
			>
				Next Level
			</Button>
		</Container>
	)
}
}

const Container = styled.div`
    display: flex;
    padding: 15px 30px;
    align-items: center;
    justify-content: space-between;
`
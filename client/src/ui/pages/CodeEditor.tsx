import * as React from "react";
import { ACE } from "../components/ACE";
import CodeTest from "../components/CodeTest";
import styled from "styled-components";
import { ColorPalette } from "../style/Palette";
import Worker from "webworkify-webpack"; // Import webworker (allows importing libs into webworker)
import Katas from "../../utils/Katas";
import { TabBar } from "../components/TabBar";
import { KataDescription } from "../components/KataDescription";
import {Portal} from '../components/Portal';
import {Link} from 'react-router-dom';
import {Button, EditorContainer, SectionTitle} from '../style/StyledComponents';
import {EditorHeader} from '../components/EditorHeader';
import {IKata} from '../../interfaces/IKata';
import {TimeTable} from '../components/TimeTable';
import {UserListener} from '../../context/UserProvider';
import {IUser} from '../../interfaces/IUser';
import {ITestResult} from '../../interfaces/ITestResult';
import { GlobalStyle } from "../style/GlobalStyle";
import { URL_API } from "../../utils/config/URL_API";

interface State {
	loading: boolean;
	currentValue: string;
	currentKataIndex: number;
	currentKataPassed: boolean;
	katas: IKata[];
	testResults: ITestResult[];
	activeTab: number;
	chooseModeModal: boolean;
	finishModal: boolean;
	countdownPaused:boolean;
}

interface IDataToSend {
	code: string;
	kata: IKata;
}

interface Props {
	user: IUser;
	login: () => void;
	logout: () => void;
}

const COUNTDOWN_STARTING_TIME = 5 * 1000 * 60;



export class CodeEditorComponent extends React.Component<Pick<Props, any>, State> {
	testWorker: any;
	gameMode: 'chill' | 'score' | 'countdown';
	EditorHeader:any;
	timeAnswers: number[] = [];
	startKata:number;

	constructor (props) {
		super(props);
		this.state = {
			loading: true,
			currentValue: ``,
			currentKataIndex: 0,
			currentKataPassed: false,
			testResults: [],
			katas: [],
			activeTab: 0,
			chooseModeModal: true,
			finishModal: false,
			countdownPaused: true
		}

	}
	
	async componentDidMount() {
		const {mode, kataOrSerieId} = this.props.match.params;

		this.fetchKatas(mode, kataOrSerieId)
		.then(res => {
			if (!res.success) {
				console.error(res.message)
			}
			else {
				let katasResult = mode === "katas" ? [res.result] : res.result.katas;
				this.setState({
					katas: katasResult,
					loading: false,
					// Create empty function displayed in the code editor
					currentValue: `function ${katasResult[this.state.currentKataIndex].functionName} (${katasResult[this.state.currentKataIndex].parameterName}) {
	// Your code goes here
}` 
				});
				this.startKata = Date.now();
			}
		}) 

		const currentKata = this.state.katas[this.state.currentKataIndex];
		// Create instance of TestingWebWorker
		this.testWorker = Worker(require.resolve("../../utils/webworker/TestingWebWorker"));

		// On ctrl + Enter launch tests
		document.addEventListener("keydown", this.launchTest);

		// Listen for web worker message
		this.testWorker.addEventListener("message", e => {
			this.handleDisplayTestResult(e.data);
			const isAllPassed = e.data.every(el => el.success);
			isAllPassed ? this.handlePassedKata() : null;
		});
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.launchTest);
	}

	fetchKatas = (mode, id) => {
		return fetch(`${URL_API}/${mode}/${id}`)
		.then(res => res.json())
	}

	launchTest = (e) => {
		const { currentKataIndex, katas, currentValue } = this.state;
		if (e.code === "Enter" && e.ctrlKey) {
			this.handleDisplayTestResult([]); // Clean UI console
			
			const sendingData:IDataToSend = {
				code: currentValue,
				kata: katas[currentKataIndex]
			}

			// Send user's code to the web worker
			this.launchWorker(sendingData, this.testWorker);
		}
	}

	launchWorker = (message: IDataToSend, worker: Worker) => {
		worker.postMessage(message);
	};

	handleCodeEditorValue = (e: string) => {
		this.setState({ currentValue: e });
	};

	handlePassedKata = () => {
		const {currentKataIndex, katas} = this.state;
		let isFinished = false;

		// If user passed last exercise, display finish modal
		if (currentKataIndex === katas.length - 1) {
			isFinished = true;
		}
		
		if (this.gameMode === "score" && this.EditorHeader) {
			this.timeAnswers.push(this.EditorHeader.getTime())
		}

		if (this.props.user) {
			this.recordKataSolution();
		}

		this.setState({
			currentKataPassed: true,
			finishModal: isFinished,
			countdownPaused: isFinished
		}, () => {
			if (this.gameMode == "countdown") this.EditorHeader.addTime(30 * 1000)
		});
	};

	recordKataSolution = () => {
		const currentKata = this.state.katas[this.state.currentKataIndex];
		fetch(`${URL_API}/katas/solutions/${currentKata._id}`, {
			method: 'PUT',
			headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
			},
			body: JSON.stringify({
				solution: {
					authorName: this.props.user.username,
					authorId: this.props.user.id,
					value: this.state.currentValue,
					timeScore: Date.now() - this.startKata 
				}
			})
		})
		.then(res => res.json())
		.catch(err => console.log(err))
	}

	handleChangeActiveTab = tabIndex => {
		this.setState({ activeTab: tabIndex });
	};

	createBaseFunction = (name, parameter) => {
		return `function ${name} (${parameter}) {
	// Your code goes here
}`
	}

	handleGoToNextKata = () => {
		const currentKataIndex = this.state.currentKataIndex;
		const nextKata = this.state.katas[currentKataIndex + 1];
		const currentValue = this.createBaseFunction(nextKata.functionName, nextKata.parameterName);
		this.setState({
			currentKataPassed: false,
			currentKataIndex: currentKataIndex + 1,
			currentValue,
			activeTab: 0,
			testResults: []
		});
	};

	handleDisplayTestResult = (testResults: ITestResult[]) => {
		this.handleChangeActiveTab(1);
		this.setState({ testResults });
	};

	toggleChooseModal = () => {
		this.setState((state) => ({chooseModeModal: !state.chooseModeModal}))
	}

	handleCloseFinishModal = () => {
		this.setState({finishModal: false})
	}

	handleChooseMode = async (mode) => {
		this.gameMode = mode;
		await this.toggleChooseModal();
		if (this.gameMode === 'countdown') {
			this.setState({countdownPaused: false}, () => {
				this.EditorHeader.startCountDown(COUNTDOWN_STARTING_TIME);
			})
		} else if (this.gameMode === 'score') {
			this.setState({countdownPaused: false}, () => {
				this.EditorHeader.startTimer();
			})
		}
	}

	render() {
		const {
			loading,
			currentValue,
			currentKataIndex,
			currentKataPassed,
			katas,
			testResults,
			countdownPaused,
			activeTab
		} = this.state;
		const {mode} = this.props.match.params;

		if (loading) return <div></div>;

		const tabs = [
			{
				title: "Consigne",
				content: <KataDescription description={katas[currentKataIndex].description} />
			},
			{
				title: "Console",
				content: (
				<CodeTest
					code={currentValue}
					handlePassedKata={this.handlePassedKata}
					exercise={katas[currentKataIndex]}
					testResults={testResults}
					handleDisplayTestResult={this.handleDisplayTestResult}
				/>
				)
			}
		];

		return (
		<EditorContainer>
			<EditorHeader ref={ref => this.EditorHeader = ref}
			currentKataIndex={currentKataIndex}
			currentKataPassed={currentKataPassed}
			gameMode={this.gameMode}
			maxLevel={katas.length - 1}
			handleGoToNextKata={this.handleGoToNextKata}
			countdownPaused={countdownPaused}
			countDownStartingTime={COUNTDOWN_STARTING_TIME}
			/>

			<main style={{ display: "flex", flex: 1 }}>
			<TabBarContainer>
				<TabBar
				tabs={tabs}
				active={activeTab}
				onSelectTab={this.handleChangeActiveTab}
				/>
				{ currentKataPassed && currentKataIndex < katas.length - 1 &&
					<NextKataMessage onClick={this.handleGoToNextKata}>
					Well Done ! Click here to code the next level
					</NextKataMessage>
				}
			</TabBarContainer>
			<div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
				<SectionTitle>Solution</SectionTitle>
				<ACE onChange={this.handleCodeEditorValue}
					value={currentValue}
					width={"auto"} />
				<Button
				active
				fullWidth
				onClick={() =>
					this.launchWorker({code: currentValue, kata: katas[currentKataIndex]}, this.testWorker)
				}
				>
				RUN CODE (CTRL + Enter)
				</Button>
			</div>
			</main>

			<Portal visible={this.state.chooseModeModal} title="Choose your game mode">
				{this.renderChooseModeModal()}
			</Portal>
			
			<Portal visible={this.state.finishModal} title="You did it">
				<p>Well done you finished the game !</p>
				{
					!this.props.user.authenticated &&
					<p>To keep track of your scores you should sign-up</p>
				}
				{
					this.gameMode == "score" && this.state.finishModal &&
					<TimeTable
						katasTitle={katas.map(exercise => exercise.description.title)}
						times={this.timeAnswers}
					/>
				}
				<Link style={LinkStyled} to='/'>Back to home</Link>
			</Portal>
		</EditorContainer>
		);
	}

	renderChooseModeModal = () => {
		const gameChoices = [
		{label: 'Code & Chill (No timer no cry)', mode: 'chill'},
		{label: 'Time score', mode: 'score'},
		{label: 'CountDown killer', mode: 'countdown'}
		]

		const modeButtons = gameChoices.map((choice, index) => (
			<Button key={`game-mode-choice-${index}`}
				active
				fullWidth
				style={{marginBottom: "2rem"}}
				onClick={() => this.handleChooseMode(choice.mode)}
			>{choice.label}</Button>
		))
		
		return modeButtons
	}
}

export const CodeEditor = UserListener(CodeEditorComponent);


const LinkStyled = {...GlobalStyle.linkButton,
	width: "100%",
	textAlign: 'center',
	left: 0,
	boxSizing: "border-box",
	position: "absolute" as "absolute",
	bottom: 0
};

const TabBarContainer = styled.div`
	flex: 0.6;
	display: flex;
	position: relative;
	flex-direction: column;
`;

const NextKataMessage = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 15px;
	background-color: ${ColorPalette.secondary};
	color: ${ColorPalette.tertiary};
`;

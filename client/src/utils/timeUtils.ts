import {ITimeScore} from '../interfaces/ITimeScore';

export const timeUtils = {
    getMillisecondes : (time:number) : number => {
		return Math.floor((time) % 60);
	},

	getMinutes : (time:number) : number => {
		return Math.floor((time / 1000 / 60) % 60)
	},

	getSecondes : (time:number) : number => {
		return Math.floor((time / 1000) % 60)
	},

	getTowDigits : (numb:number) : string => {
		return `${numb < 10 ? '0' : ''}${numb}`;
	},

	getFourDigits : (numb:number) : string => {
		return `${numb < 1000 ? '0' : ''}${numb < 100 ? '0' : ''}${numb < 10 ? '0' : ''}${numb}`
    },
    
    formatTime : function(time:number) : ITimeScore {
		return ({
			minutes: this.getTowDigits(this.getMinutes(time)),
			secondes: this.getTowDigits(this.getSecondes(time)),
			millisecondes: this.getFourDigits(this.getMillisecondes(time)),
		})
	}
}
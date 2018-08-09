import * as React from 'react';
import { ColorPalette } from '../style/Palette';
import {SectionTitle} from '../style/StyledComponents';
import styled from 'styled-components';
import {timeUtils} from '../../utils/timeUtils';

interface ITimeTableProps {
    katasTitle: string[];
    times: number[];
}

export const TimeTable = ({katasTitle, times}:ITimeTableProps) => {
    let passedTime = 0;

    const formatedTotalTime = timeUtils.formatTime(times[times.length - 1])
    
    return (
    <div style={{display: 'flex', marginBottom: 10}}>
        <ul style={{flex: 1}}>
            <li style={{backgroundColor: ColorPalette.primary}}>
                <SectionTitle>Exercise</SectionTitle>
            </li>
            {
                katasTitle.map((title, index) => (
                    <Cell key={`${title}-${index}`}>{title}</Cell>
                ))
            }
            <li>
                <SectionTitle>Total</SectionTitle>
            </li>
        
        </ul>
        <ul style={{flex: 1}}>
            <li style={{backgroundColor: ColorPalette.secondary}}>
                <SectionTitle>Time</SectionTitle>
            </li>
            {
                times.map((time, index) => {
                    const exerciseTime = time - passedTime;
                    const timeFormated = timeUtils.formatTime(exerciseTime);
                    const {minutes, secondes, millisecondes} = timeFormated;
                    passedTime =+ time;
                    return <Cell>{`${minutes}m${secondes}s${millisecondes}ms`}</Cell>
                })
            }
            <li>
                <SectionTitle>{`${formatedTotalTime.minutes}m${formatedTotalTime.secondes}s${formatedTotalTime.millisecondes}ms`}</SectionTitle>
            </li>
        </ul>
    </div>
)}


const Cell = styled.li`
    padding: 1rem;
    border-bottom: 0.5px solid ${ColorPalette.secondary}
`;
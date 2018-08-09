import * as React from "react";
import {Card} from "../style/StyledComponents";
import {GlobalStyle} from "../style/GlobalStyle";
import {Link} from "react-router-dom";
import {IKata, IKataDescription} from "../../interfaces/IKata";
import {ISerie} from "../../interfaces/ISerie";
import { ColorPalette } from "../style/Palette";
import styled from "styled-components";

interface Props {
    title: string;
    type: "kata" | "serie";
    datas: (IKata | ISerie)[];
}

const ListTitleStyle = {
    padding: "1rem",
    textTransform: "uppercase",
    color: ColorPalette.primary,
    backgroundColor: ColorPalette.secondary,
    fontWeight: "bold" as "bold",
}

export const LinksList = ({title, type, datas}:Props) => (
    <Card>
        <div style={{display:"flex", flexDirection:"row", backgroundColor: ColorPalette.secondary, justifyContent: "space-between", alignItems: "center"}}>
            <h1 style={ListTitleStyle}>{title}</h1>
            <p style={{color: ColorPalette.primary, padding: '1rem'}}>total: {datas.length}</p>
        </div>
        <ul>
            {
                datas.map((data, index) => (
                    <Li key={index}>
                        <Link style={GlobalStyle.linkListItem} to={`/${type}/${data._id}`}>
                            {type === "kata" ? (data.description as IKataDescription).title : (data as ISerie).title}
                        </Link>
                    </Li>
                ))
            }
        </ul>
    </Card>
)

const Li = styled.li`
    transition: 0.2s ease;
    background: ${ColorPalette.background};
    cursor: pointer;
    a {
        color: ${ColorPalette.activeText};
    }

    &:hover {
        background: ${ColorPalette.underBackground};
    }
`;

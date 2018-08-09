import * as React from 'react';
import { PageContainer } from '../style/StyledComponents';
import {Link} from "react-router-dom";
import {CardHoverable} from "../style/StyledComponents";


export class AdminBoard extends React.Component {
    render () {
        return (
            <PageContainer>
                <Link to="/admin/kata/new">
                    <CardHoverable>
                        <h2>Create kata</h2>
                    </CardHoverable>
                </Link>
                <Link to="/admin/serie/new">
                    <CardHoverable>
                        <h2>Create serie</h2>
                    </CardHoverable>
                </Link>
            </PageContainer>
        )
    }
}

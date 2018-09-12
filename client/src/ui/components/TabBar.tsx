import * as React from "react";
// import {SectionTitle} from "../pages/CodeEditor";
import { ColorPalette } from "../style/Palette";
import styled from "styled-components";

interface Props {
  tabs: any;
  active: number;
  onSelectTab: (number) => void;
}

interface State {
  //   activeTab: number;
}

export class TabBar extends React.Component<Props, State> {
  state = {
    // activeTab: 0
  };

  render() {
    // const { activeTab } = this.state;
    const { tabs, active, onSelectTab } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex" }}>
          {tabs.map((tab, index) => (
            <Tab
              key={`${tab.title}-button-${index}`}
              active={active === index}
              onClick={() => onSelectTab(index)}
            >
              {tab.title}
            </Tab>
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {tabs[active] ? tabs[active].content : tabs[0].content}
        </div>
      </div>
    );
  }
}

interface ITab {
  active: boolean;
  key: any;
  onClick: () => void;
}

const Tab = styled.button`
  flex: 1;
  border: none;
  border-bottom: 4px solid ${(props: ITab) => (props.active ? ColorPalette.secondary : "transparent")};
  font-size: 14px;
  padding: 11.5px;
  margin: 0;
  cursor: pointer;
  text-transform: uppercase;
  color: ${ColorPalette.tertiary};
  outline: none;
  background-color: ${(props: ITab) =>
    props.active ? ColorPalette.inactiveButton : ColorPalette.primary};
`;

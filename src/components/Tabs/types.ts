export interface ITabs {
  pages: IPage[];
}

export interface IPage {
  tabTitle: string;
  renderPage: () => JSX.Element;
}

export interface TabPanelProps {
  index: number;
  value: number;
  children?: React.ReactNode;
}

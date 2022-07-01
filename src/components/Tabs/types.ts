export interface ITabs {
  pages: IPage[];
}

export interface IPage {
  tabTitle: string;
  renderPage: () => JSX.Element;
}

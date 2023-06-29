import { FC } from "react";

export type Tool = {};

type ToolbarProps = {
	children: Tool;
};

const Toolbar: FC<ToolbarProps> = ({ children }): JSX.Element => {
	return <div className={"toolbar"}>{children}</div>;
};

export default Toolbar;

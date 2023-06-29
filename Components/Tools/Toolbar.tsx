import { FC } from "react";

export type Tool = {};

type ToolbarProps = {
	children: React.ReactNode;
};

const Toolbar: FC<ToolbarProps> = ({ children }): JSX.Element => {
	return <div className={"toolbar primary"}>{children}</div>;
};

export default Toolbar;

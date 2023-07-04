import { FC } from "react";

export type Tool = {};

type ToolbarProps = {
	children: React.ReactNode;
};

// Storing all the styles in a cleaner way than raw text lol
const styles = ["bg-primary", "max-w-sm", "mx-auto", "flex", "justify-evenly"].reduce(
    (prevStyle, currentStyle) => prevStyle + " " + currentStyle
)

const Toolbar: FC<ToolbarProps> = ({ children }): JSX.Element => {
	return <div className={`toolbar ${styles}`}>{children}</div>;
};

export default Toolbar;

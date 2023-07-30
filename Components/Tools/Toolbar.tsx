import { FC } from "react";
import Textbox from "./Textbox";

export type Tool = {
	style: string
};

type ToolbarProps = {
	children: React.ReactNode;
};

// Child styles, oh why am i doing this
const childStyles = ["bg-[white]", "object-scale-down", "h-[7.5vh]", "w-[7.5vh]"].map(style => "[&>*]:" + style)




// Storing all the styles in a cleaner way than raw text lol
const styles = ["bg-primary", "max-w-[40vw]", "max-h-[7.5vh]", "mx-auto", "flex", "justify-evenly", ...childStyles].reduce(
    (prevStyle, currentStyle) => prevStyle + " " + currentStyle
)

const Toolbar: FC<{}> = (): JSX.Element => {
	return <div className={`toolbar ${styles}`}>
		<div className={`toolbar ${styles}`}>
			<Textbox style = "bg-[white] object-scale-down h-[7.5vh] w-[7.5vh]" />
		</div>;
	</div>;
};

/**If you wanted for some reason to control which tools appear in the toolbar */
export const CustomToolbar: FC<ToolbarProps> = ({ children }): JSX.Element => {
	return <div className={`toolbar ${styles}`}>{children}</div>;
};


export default Toolbar;

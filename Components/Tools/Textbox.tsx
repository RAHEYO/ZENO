import { FC } from "react";
import Image from "next/image";
import { Tool } from "./Toolbar";
import Icon from "./Tool-Icons/textboxIcon.png";

const Textbox: FC<Tool> = ({style}): JSX.Element => {
	return (
			<Image
				className = {style}
				src={Icon}
				alt="textbox"
			/>
	);
};

export default Textbox;

import { FC } from "react";
import Image from "next/image";
import { Tool } from "./Toolbar";
import Icon from "./Tool-Icons/whiteboardIcon.svg";

const Whiteboard: FC<Tool> = (): JSX.Element => {
	return (
		<Image
			src={Icon}
			alt="whiteboard"
		/>
	);
};

export default Whiteboard;

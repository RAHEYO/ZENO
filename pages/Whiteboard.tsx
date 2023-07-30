import { FC } from "react";
import Image from "next/image";
import Toolbar, { Tool} from "../Components/Tools/Toolbar";
import Icon from "./Tool-Icons/whiteboardIcon.svg";

const Whiteboard: FC<Tool> = (): JSX.Element => {
	return (

		<Toolbar>


			
		</Toolbar>
		// <div className = "wrapper max-w-[7.5vh] max-h[7.5vh]">
			// <Image
			// 	className = "bg-[white] object-scale-down h-[7.5vh] w-[7.5vh]"
			// 	src={Icon}
			// 	alt="whiteboard"
			// />
		// </div>
	);
};

export default Whiteboard;

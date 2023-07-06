import { NextPage } from "next";

import RootLayout from "@/Components/Nav/RootLayout";
import Toolbar from "@/Components/Tools/Toolbar";
import Whiteboard from "@/Components/Tools/Whiteboard";

type HomeSpaceProps = {};

const HomeSpace: NextPage<HomeSpaceProps> = () => {
	return (
		<RootLayout>
			@_@ TO HomeSpace
			<Toolbar>
				<Whiteboard />
			</Toolbar>
		</RootLayout>
	);
};

export default HomeSpace;

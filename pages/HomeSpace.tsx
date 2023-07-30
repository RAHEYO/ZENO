import { NextPage } from "next";

import RootLayout from "@/Components/Nav/RootLayout";
import Toolbar from "@/Components/Tools/Toolbar";

type HomeSpaceProps = {};

const HomeSpace: NextPage<HomeSpaceProps> = () => {
	return (
		<RootLayout>
			@_@ TO HomeSpace
			<Toolbar>
				
			</Toolbar>
		</RootLayout>
	);
};

export default HomeSpace;

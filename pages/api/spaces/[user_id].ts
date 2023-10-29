import { establishConnection } from "@/Config";
import { NextApiRequest, NextApiResponse } from "next";

import { Space } from "@/Utils/SpaceUtils";

// TO BE CHANGED!
export const fetchUserSpaces = (userId: number): string => {
    return `SELECT * FROM spaces;`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user_id = Number(req.query['user_id']);

    try {
        const dbConnection = await establishConnection();

        if (req.method === 'GET') {
            const query = fetchUserSpaces(user_id);
            const [rows] = await dbConnection.execute(query);
            const parsedSpaces = JSON.parse(JSON.stringify(rows));
            const spaces: Space[] = parsedSpaces.map((row: any) => {
                return {
                    id: row.id,
                    name: row.name,
                    profile_pic: row.profile_pic,
                    default_channel: row.default_channel,
                    roles: JSON.parse(JSON.stringify(row.roles))
                }
            });
            res.status(200).json({ spaces });

        } else if (req.method === 'POST') {

        }

        
    } catch (error) {
        console.warn(error as Error);
        res.status(500).json({ error });
    }

}
// spaces.forEach((space, index) => {
//     const rolesJSON = JSON.stringify(space.roles);

//     const queryString = `INSERT INTO spaces (id, name, profile_pic, default_channel, roles) VALUES (${space.id}, '${space.name}', '${space.profile_pic}', ${space.default_channel}, '${rolesJSON}');`;
//     console.log(queryString);
//     query(queryString);
// });

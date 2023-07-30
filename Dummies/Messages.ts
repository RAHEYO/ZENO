/*
    Typescript Date Type Initialization:
    * Specifying the date-time
        new Date (year, month, date, hour, minute, second, millisecond);

    * Using a date string
        new Date(datestring);
    
    * Miliseconds since 1970 (UTC)
        new Date(milliseconds);
*/

export type Message = {
    id: number,
    content: string,
    sender: number,
    channel_id: string,
    time: Date
}

const dummyMessages: Message[] = [
    {
        id: 0,
        content: "Quantum Computing is kinda cracked, my head's exploding~",
        sender: 0,
        channel_id: "0",
        time: new Date(2023, 7, 14, 8, 42, 13, 983)
    },
    {
        id: 1,
        content: "Maybe check out this Quantum Physics Course on MIT OCW first! @_@",
        sender: 1,
        channel_id: "0",
        time: new Date(2023, 7, 14, 9, 12, 13, 983)
    },
    {
        id: 2,
        content: "Cupid by Fifty-fifty is awesome!!! They'll be the best 4th generation Kpop group ever!!!",
        sender: 0,
        channel_id: "1",
        time: new Date(2023, 7, 20, 18, 12, 13, 983)
    },
    {
        id: 3,
        content: "I don't know about that lol, I think Kpop is just kinda mid...",
        sender: 2,
        channel_id: "1",
        time: new Date(2023, 7, 21, 10, 42, 13, 983)
    },
    {
        id: 4,
        content: "Y'all dumb, Classical Bangers for the win :)",
        sender: 3,
        channel_id: "1",
        time: new Date(2023, 7, 21, 12, 2, 13, 983)
    },
    {
        id: 5,
        content: "Guys y'all are saying off-topic stuff, this is not the way this channel was designed for~ If you wanna talk abt those, consider using the #off-topic channel.",
        sender: 1,
        channel_id: "1",
        time: new Date(2023, 7, 21, 13, 11, 13, 983)
    },
    {
        id: 6,
        content: "Y'all dumb, Classical Bangers for the win :)",
        sender: 3,
        channel_id: "1",
        time: new Date(2023, 7, 21, 12, 2, 13, 983)
    },
    {
        id: 7,
        content: "Guys y'all are saying off-topic stuff, this is not the way this channel was designed for~ If you wanna talk abt those, consider using the #off-topic channel.",
        sender: 1,
        channel_id: "1",
        time: new Date(2023, 7, 21, 13, 11, 13, 983)
    },
    {
        id: 8,
        content: "Y'all dumb, Classical Bangers for the win :)",
        sender: 3,
        channel_id: "1",
        time: new Date(2023, 7, 21, 12, 2, 13, 983)
    },
    {
        id: 9,
        content: "Guys y'all are saying off-topic stuff, this is not the way this channel was designed for~ If you wanna talk abt those, consider using the #off-topic channel.",
        sender: 1,
        channel_id: "1",
        time: new Date(2023, 7, 21, 13, 11, 13, 983)
    },
    {
        id: 10,
        content: "Y'all dumb, Classical Bangers for the win :)",
        sender: 3,
        channel_id: "1",
        time: new Date(2023, 7, 21, 12, 2, 13, 983)
    },
    {
        id: 11,
        content: "Guys y'all are saying off-topic stuff, this is not the way this channel was designed for~ If you wanna talk abt those, consider using the #off-topic channel.",
        sender: 1,
        channel_id: "1",
        time: new Date(2023, 7, 21, 13, 11, 13, 983)
    },
    {
        id: 12,
        content: "Y'all dumb, Classical Bangers for the win :)",
        sender: 3,
        channel_id: "1",
        time: new Date(2023, 7, 21, 12, 2, 13, 983)
    },
    {
        id: 13,
        content: "Guys y'all are saying off-topic stuff, this is not the way this channel was designed for~ If you wanna talk abt those, consider using the #off-topic channel.",
        sender: 1,
        channel_id: "1",
        time: new Date(2023, 7, 21, 13, 11, 13, 983)
    },
    {
        id: 14,
        content: "Y'all dumb, Classical Bangers for the win :)",
        sender: 3,
        channel_id: "1",
        time: new Date(2023, 7, 21, 12, 2, 13, 983)
    },
    {
        id: 15,
        content: "Guys y'all are saying off-topic stuff, this is not the way this channel was designed for~ If you wanna talk abt those, consider using the #off-topic channel.",
        sender: 1,
        channel_id: "1",
        time: new Date(2023, 7, 21, 13, 11, 13, 983)
    },
    {
        id: 16,
        content: "Y'all dumb, Classical Bangers for the win :)",
        sender: 3,
        channel_id: "1",
        time: new Date(2023, 7, 21, 12, 2, 13, 983)
    },
    {
        id: 17,
        content: "Guys y'all are saying off-topic stuff, this is not the way this channel was designed for~ If you wanna talk abt those, consider using the #off-topic channel.",
        sender: 1,
        channel_id: "1",
        time: new Date(2023, 7, 21, 13, 11, 13, 983)
    },
];

export default dummyMessages;
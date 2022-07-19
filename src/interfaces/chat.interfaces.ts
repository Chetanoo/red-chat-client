export interface MessageInterface{
    _id?: string;
    text: string;
    author: UserInterface;
}

export interface RoomInterface{
    _id: string;
    roomName: string;
    creator: UserInterface | string;
    messages?: [MessageInterface];
    members?: [UserInterface];
}

export interface UserInterface{
    username: string;
    email: string;
    _id: string;
}

export type handleCreateRoomInterface = (roomName: string) => void;

export type handleJoinRoomInterface = (id: string) => void;

export type handleSendMessageInterface = (text: string, roomId: string) => void;

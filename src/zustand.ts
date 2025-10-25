import { create } from 'zustand';

type State ={
    count: number;
    gotoPage: (value:number)=>void;
    userId: number;
    getUserId: (value:number) => void;
}

export const ZUSTAND = create<State>((set) => ({
    count: 0,
    gotoPage: (value:number)=>set({count: value}),
    userId: 0,
    getUserId: (value:number)=>set({userId:value}),
}));

import { create } from 'zustand';

type State ={
    count: number;
}

export const ZUSTAND = create<State>((set) => ({
    count: 0
}));

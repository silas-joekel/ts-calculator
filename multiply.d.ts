import { Add, Decrement } from './add';

export type Multiply<N1 extends `${number}`, N2 extends `${number}`> = N1 extends "0" ?
    "0" :
    N2 extends "0" ?
        "0" :
        N2 extends "1" ?
            N1 :
            Multiply<N1, Decrement<N2>> extends `${infer N extends `${number}`}` ?
                Add<N1, N> :
                never;

declare const multiply: {
    <const N1 extends `${number}`, const N2 extends `${number}`>(num1: N1, num2: N2): Multiply<N1, N2>;
};

export { multiply };

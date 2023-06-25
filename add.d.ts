type Increment<N extends `${number}`> =
    N extends "-1" ?
    "0" :
    N extends `-${infer I extends `${number}`}` ?
    Decrement<I> extends `-${number}`?
        never :
        `-${Decrement<I>}` :
    N extends `${infer P extends string}0` ?
    `${P}1` :
    N extends `${infer P extends string}1` ?
    `${P}2` :
    N extends `${infer P extends string}2` ?
    `${P}3` :
    N extends `${infer P extends string}3` ?
    `${P}4` :
    N extends `${infer P extends string}4` ?
    `${P}5` :
    N extends `${infer P extends string}5` ?
    `${P}6` :
    N extends `${infer P extends string}6` ?
    `${P}7` :
    N extends `${infer P extends string}7` ?
    `${P}8` :
    N extends `${infer P extends string}8` ?
    `${P}9` :
    N extends `${infer P extends `${number}`}9` ?
    `${Increment<P>}0` :
    "10";

type Decrement<N extends `${number}`> =
    N extends `-${infer I extends `${number}`}` ?
        `-${Increment<I>}` :
    N extends `${infer P extends string}1` ?
    `${P}0` :
    N extends `${infer P extends string}2` ?
    `${P}1` :
    N extends `${infer P extends string}3` ?
    `${P}2` :
    N extends `${infer P extends string}4` ?
    `${P}3` :
    N extends `${infer P extends string}5` ?
    `${P}4` :
    N extends `${infer P extends string}6` ?
    `${P}5` :
    N extends `${infer P extends string}7` ?
    `${P}6` :
    N extends `${infer P extends string}8` ?
    `${P}7` :
    N extends `${infer P extends string}9` ?
    `${P}8` :
    N extends `${infer P extends `${number}`}0` ?
    Decrement<P> extends "0" ?
        "9" :
        `${Decrement<P>}9` :
    "-1";   

type Add<N1 extends `${number}`, N2 extends `${number}`> = N2 extends "0" ?
    N1 :
    N2 extends `-${number}` ?
        Add<Decrement<N1>, Increment<N2>> :
        Add<Increment<N1>, Decrement<N2>>;

declare const add: {
    <const N1 extends `${number}`, const N2 extends `${number}`>(num1: N1, num2: N2): Add<N1, N2>;
};
declare const increment: {
    <const N extends `${number}`>(num: N): Increment<N>;
};
declare const decrement: {
    <const N extends `${number}`>(num: N): Decrement<N>;
};

export { add, increment, decrement };

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type INTEGER<I extends string> = I extends `${infer D extends Digit}${infer R extends string}` ?
  INTEGER<R> extends never ?
    [{ type: "INTEGER"; value: D }, R] :
    [{ type: "INTEGER"; value: `${D}${INTEGER<R>[0]['value']}`}, INTEGER<R>[1]] :
  never;

type Expression<E extends string> = AdditiveExpression<E>;

type AdditiveExpression<A extends string> = MultiplicativeExpression<A> extends never ?
  never :
  MultiplicativeExpression<A> extends [infer ast, infer R] ?
    R extends `${infer op extends "+" | "-"}${infer RR}` ?
    AdditiveExpression<RR> extends never ?
        never :
        [{type: "additive-expression", value: op, children: [ast, AdditiveExpression<RR>[0]]}, AdditiveExpression<RR>[1]] :
      [ast, R] :
    never;

type MultiplicativeExpression<M extends string> = Primary<M> extends never ?
  never :
  Primary<M> extends [infer ast, infer R] ?
    R extends `${infer op extends "*"/* | "/"*/}${infer RR}` ?
      MultiplicativeExpression<RR> extends never ?
        never :
        [{type: "multiplicative-expression", value: op, children: [ast, MultiplicativeExpression<RR>[0]]}, MultiplicativeExpression<RR>[1]] :
      [ast, R] :
    never;

type Primary<P extends string> = P extends `(${infer R extends string}` ?
  Expression<R> extends never ?
    never :
    Expression<R>[1] extends `)${infer RR extends string}` ?
      [Expression<R>[0], RR] :
      never :
  P extends `-${infer R}` ?
    Primary<R> extends never ?
      never :
      [{type: "primary", value: "-", children: [Primary<R>[0]]}, Primary<R>[1]] :
    INTEGER<P>;

export type Parse<S extends string> = Expression<S> extends never ? never : Expression<S> extends [infer ast, ""] ? ast : never;

declare const parse: {
  <const S extends string>(str: S): Parse<S>;
};

declare const parseInteger: {
  <const S extends string>(str: S): INTEGER<S>;
}

declare const parsePrimary: {
  <const S extends string>(str: S): Primary<S>;
}

declare const parseMultiplicativeExpression: {
  <const S extends string>(str: S): MultiplicativeExpression<S>;
}

declare const parseAdditiveExpression: {
  <const S extends string>(str: S): AdditiveExpression<S>;
}

export { parse, parseInteger, parsePrimary, parseMultiplicativeExpression, parseAdditiveExpression };

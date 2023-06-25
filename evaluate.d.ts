import { Add } from './add'

type Negate<N extends `${number}`> = N extends `-${infer R extends `${number}`}` ?
    R :
    `${number}` extends `${infer R extends `-${N}`}` ?
        R extends `${number}` ?
            R :
            never :
        never;

type IntegerNode = {
    type: "INTEGER",
    value: `${number}`,
}

type AdditiveExpressionNode = {
    type: "additive-expression",
    value: "+" | "-",
    children: [Node, Node],
}

type MultiplicativeExpressionNode = {
    type: "multiplicative-expression",
    value: "*",
    children: [Node, Node],
}

type Node = IntegerNode | AdditiveExpressionNode | MultiplicativeExpressionNode;

type EvaluateInteger<AST extends IntegerNode> = AST extends {value: `${infer V extends `${number}`}`} ? V : never;

type EvaluateAdditiveExpression<AST extends AdditiveExpressionNode> = AST extends {children: [infer A extends Node, infer B extends Node]} ?
    Evaluate<A> extends `${infer NA extends `${number}`}` ?
        Evaluate<B> extends `${infer NB extends `${number}`}` ?
            AST['value'] extends "+" ?
                Add<NA, NB> :
                Add<NA, Negate<NB>> :
            never:
        never :
    never;

export type Evaluate<AST extends Node> = AST extends IntegerNode ?
    EvaluateInteger<AST> :
    AST extends AdditiveExpressionNode ?
        EvaluateAdditiveExpression<AST> :
        never;

declare const evaluate: {
    <const AST extends Node>(ast: AST): Evaluate<AST>;
  };

export { evaluate };
  
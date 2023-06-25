import {  expectType } from "tsd";
import { evaluate } from "./evaluate";

/* INTEGER */
expectType<"0">(evaluate({
    type: "INTEGER",
    value: "0",
}));
expectType<"2">(evaluate({
    type: "INTEGER",
    value: "2",
}));
expectType<"42">(evaluate({
    type: "INTEGER",
    value: "42",
}));

/* AdditiveExpression */
expectType<"5">(evaluate({
    type: "additive-expression",
    value: "+",
    children: [
        {
        type: "INTEGER",
        value: "2",
        },
        {
        type: "INTEGER",
        value: "3",
        }
    ],
}));
expectType<"1">(evaluate({
    type: "additive-expression",
    value: "-",
    children: [
        {
        type: "INTEGER",
        value: "3",
        },
        {
        type: "INTEGER",
        value: "2",
        }
    ]
}))
expectType<"-1">(evaluate({
    type: "additive-expression",
    value: "-",
    children: [
        {
        type: "INTEGER",
        value: "2",
        },
        {
        type: "INTEGER",
        value: "3",
        }
    ]
}));

/* MultiplicativeExpression */
expectType<"6">(evaluate({
    type: 'multiplicative-expression',
    value: '*',
    children: [
        {
        type: "INTEGER",
        value: "2",
        },
        {
        type: "INTEGER",
        value: "3",
        }
    ]
}));
expectType<"30">(evaluate({
    type: "multiplicative-expression",
    value: "*",
    children: [
        {
            type: "INTEGER",
            value: "2",
        },
        {
            type: "multiplicative-expression",
            value: "*",
            children: [
                {
                    type: "INTEGER",
                    value: "3",
                },
                {
                    type: "INTEGER",
                    value: "5",
                }
            ]
        }
    ]
}));

/* Mixed */
expectType<"25">(evaluate({
    type: "multiplicative-expression",
    value: "*",
    children: [
        {
            type: "additive-expression",
            value: "+",
            children: [
                {
                    type: "INTEGER",
                    value: "2",
                },
                {
                    type: "INTEGER",
                    value: "3",
                }
            ]
        },
        {
            type: "INTEGER",
            value: "5",
        }
    ]
}));
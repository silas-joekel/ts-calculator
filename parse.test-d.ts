import {  expectType } from "tsd";
import { parse, parseAdditiveExpression, parseInteger, parseMultiplicativeExpression, parsePrimary } from "./parse";

/** INTEGER */
expectType<never>(parseInteger(""));
expectType<[
    {
        type: "INTEGER";
        value: "2";
    },
    ""
]>(parseInteger("2"));
expectType<[
    {
        type: "INTEGER";
        value: "42";
    },
    ""
]>(parseInteger("42"));
expectType<[
    {
        type: "INTEGER";
        value: "42";
    },
    "k"
]>(parseInteger("42k"));
expectType<[
    {
        type: "INTEGER";
        value: "42";
    },
    ".5"
]>(parseInteger("42.5"));
expectType<[
    {
        type: "INTEGER";
        value: "6";
    },
    "/3"
]>(parseInteger("6/3"));

expectType<never>(parse(""));
expectType<{
    type: "INTEGER";
    value: "2";
}>(parse("2"));
expectType<{
    type: "INTEGER";
    value: "42";
}>(parse("42"));
expectType<never>(parse("42k"));
expectType<never>(parse("42.5"));

/** Primary */
expectType<[
    {
        type: "INTEGER";
        value: "2";
    },
    ""
]>(parsePrimary("(2)"));
expectType<[
    {
        type: "INTEGER";
        value: "6";
    },
    "/3"
]>(parsePrimary("6/3"));

expectType<{
    type: "INTEGER";
    value: "2";
  }>(parse("(2)"));
expectType<{
    type: "primary";
    value: "-";
    children: [
        {
            type: "INTEGER",
            value: "2"
        }
    ]
}>(parse("-2"));
expectType<{
    type: "primary";
    value: "-";
    children: [
        {
            type: "INTEGER",
            value: "2"
        }
    ]
}>(parse("-(2)"));
expectType<never>(parse("(42"));
expectType<never>(parse(")42"));
expectType<never>(parse("42)"));

/** MultiplicativeExpression */
expectType<[
    {
        type: "INTEGER";
        value: "2";
    },
    ""
]>(parseMultiplicativeExpression("2"));
expectType<[
    {
        type: 'multiplicative-expression',
        value: '*',
        children: [
            {
            type: "INTEGER";
            value: "2";
            },
            {
            type: "INTEGER";
            value: "3";
            }
        ]
    },
    ""
]>(parseMultiplicativeExpression("2*3"));
expectType<[
    {
        type: "multiplicative-expression";
        value: "/"
        children: [
        {
            type: "INTEGER";
            value: "6";
        },
        {
            type: "INTEGER";
            value: "3";
        }
        ];
    },
    ""
]>(parseMultiplicativeExpression("6/3"));
expectType<[
    {
        type: "INTEGER";
        value: "2";
    },
    "+3"
]>(parseMultiplicativeExpression("2+3"));

expectType<{
type: "multiplicative-expression";
value: "*"
children: [
    {
    type: "INTEGER";
    value: "2";
    },
    {
    type: "INTEGER";
    value: "3";
    }
];
}>(parse("2*3"));
expectType<{
    type: "multiplicative-expression";
    value: "/"
    children: [
    {
        type: "INTEGER";
        value: "6";
    },
    {
        type: "INTEGER";
        value: "3";
    }
    ];
}>(parse("6/3"));
expectType<{
type: "multiplicative-expression";
value: "*"
children: [
    {
    type: "INTEGER";
    value: "2";
    },
    {
    type: "INTEGER";
    value: "3";
    }
];
}>(parse("(2*3)"));
expectType<{
    type: "multiplicative-expression";
    value: "*",
    children: [
        {
            type: "INTEGER";
            value: "2";
        },
        {
            type: "multiplicative-expression";
            value: "*",
            children: [
                {
                    type: "INTEGER";
                    value: "3";
                },
                {
                    type: "INTEGER";
                    value: "5";
                }
            ]
        }
    ]
}>(parse("2*3*5"));
expectType<{
    type: "multiplicative-expression";
    value: "*",
    children: [
        {
            type: "multiplicative-expression";
            value: "*",
            children: [
                {
                    type: "INTEGER";
                    value: "2";
                },
                {
                    type: "INTEGER";
                    value: "3";
                }
            ]
        },
        {
            type: "INTEGER";
            value: "5";
        }
    ]
}>(parse("(2*3)*5"));
expectType<never>(parse("2*"));
expectType<never>(parse("*2"));
expectType<never>(parse("*2*"));
expectType<never>(parse("2**"));
expectType<never>(parse("2**3"));

/** AdditiveExpressions */
expectType<[
    {
        type: "INTEGER",
        value: "2"
    },
    ""
]>(parseAdditiveExpression("2"));
expectType<[
    {
        type: "additive-expression";
        value: "+";
        children: [
            {
            type: "INTEGER";
            value: "2";
            },
            {
            type: "INTEGER";
            value: "3";
            }
        ];
    },
    ""
]>(parseAdditiveExpression("2+3"));
expectType<[
    {
        type: "additive-expression";
        value: "-";
        children: [
            {
            type: "INTEGER";
            value: "2";
            },
            {
            type: "INTEGER";
            value: "3";
            }
        ];
    },
    ""
]>(parseAdditiveExpression("2-3"));

expectType<{
    type: "additive-expression";
    value: "+";
    children: [
      {
        type: "INTEGER";
        value: "2";
      },
      {
        type: "INTEGER";
        value: "3";
      }
    ];
  }>(parse("2+3"));
expectType<{
    type: "additive-expression";
    value: "+",
    children: [
      {
        type: "INTEGER";
        value: "2";
      },
      {
        type: "additive-expression";
        value: "+",
        children: [
          {
            type: "INTEGER";
            value: "3";
          },
          {
            type: "INTEGER";
            value: "5";
          }
        ];
      }
    ];
  }>(parse("2+3+5"));
expectType<{
    type: "additive-expression";
    value: "+",
    children: [
        {
            type: "additive-expression";
            value: "+",
            children: [
                {
                    type: "INTEGER";
                    value: "2";
                },
                {
                    type: "INTEGER";
                    value: "3";
                }
            ];
        },
        {
            type: "INTEGER";
            value: "5";
        }
    ];
}>(parse("(2+3)+5"));
expectType<{
    type: "multiplicative-expression";
    value: "*",
    children: [
        {
            type: "additive-expression";
            value: "+",
            children: [
                {
                    type: "INTEGER";
                    value: "2";
                },
                {
                    type: "INTEGER";
                    value: "3";
                }
            ];
        },
        {
            type: "INTEGER";
            value: "5";
        }
    ];
}>(parse("(2+3)*5"));
expectType<never>(parse("3+"));
expectType<never>(parse("+3"));
expectType<never>(parse("+3+"));
expectType<never>(parse("3++"));
expectType<never>(parse("3++5"));
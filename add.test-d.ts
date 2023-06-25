import {  expectType } from "tsd";
import { add, decrement, increment } from "./add";

/** Increment */
expectType<"1">(increment("0"));
expectType<"2">(increment("1"));
expectType<"10">(increment("9"));
expectType<"20">(increment("19"));
expectType<"100">(increment("99"));

expectType<"0">(increment("-1"));
expectType<"-1">(increment("-2"));
expectType<"-9">(increment("-10"));

/** Decrement */
expectType<"0">(decrement("1"));
expectType<"1">(decrement("2"));
expectType<"9">(decrement("10"));
expectType<"19">(decrement("20"));
expectType<"99">(decrement("100"));

expectType<"-1">(decrement("0"));
expectType<"-2">(decrement("-1"));
expectType<"-10">(decrement("-9"));

/** Add */
expectType<"2">(add("2", "0"));
expectType<"4">(add("0", "4"));
expectType<"6">(add("2", "4"));
expectType<"10">(add("4", "6"));
expectType<"17">(add("9", "8"));
expectType<"16">(add("14", "2"));
expectType<"19">(add("4", "15"));
expectType<"33">(add("18", "15"));
expectType<"123">(add("58", "65"));
expectType<"920">(add("420", "500"));

/** How about negative numbers? */
expectType<"-2">(add("-2", "0"));
expectType<"-4">(add("0", "-4"));
expectType<"2">(add("-2", "4"));
expectType<"2">(add("6", "-4"));
expectType<"-6">(add("-2", "-4"));
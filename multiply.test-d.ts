import {  expectType } from "tsd";
import { multiply } from "./multiply";

/** Add */
expectType<"0">(multiply("2", "0"));
expectType<"0">(multiply("0", "4"));
expectType<"2">(multiply("2", "1"));
expectType<"5">(multiply("5", "1"));
expectType<"6">(multiply("3", "2"));
expectType<"24">(multiply("4", "6"));
expectType<"128">(multiply("64", "2"));
expectType<"100">(multiply("4", "25"));
expectType<"225">(multiply("15", "15"));


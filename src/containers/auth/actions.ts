import { createAction } from "@reduxjs/toolkit";
import {  ErrorPayload } from "../../types/requests";
import { User } from "./../../types/userTypes";

export const getUser = createAction("auth/getUser");
export const getUserSuccess = createAction<User>("auth/getUserSuccess");
export const getUserFailed = createAction<ErrorPayload>("auth/getUserFailed");
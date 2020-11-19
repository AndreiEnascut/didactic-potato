import Vue from 'vue';
import Vuex from 'vuex';
import {AxiosResponse} from "axios";
import {apiResource, getStuff} from "@/api/apiService";
import * as vuexTypes from "vuex/types/index";

Vue.use(Vuex);

export enum MutationTypes {
    SET_BOOKS = "SET_BOOKS",
    SET_HOUSES = "SET_HOUSES",
    SET_MESSAGE = "SET_MESSAGE"
}

export enum ActionTypes {
    FETCH_DATA = "FETCH_DATA",
}

export interface GOTState {
    books: [],
    houses: [],
    message: string
}

export const state: () => GOTState = () => {
    return {
        books: [],
        houses: [],
        message: ""
    }
}

export const mutations: vuexTypes.MutationTree<GOTState> = {
    [MutationTypes.SET_BOOKS](givenState, event) {
        Vue.set(givenState, "books", event);
    },
    [MutationTypes.SET_HOUSES](givenState, event) {
        Vue.set(givenState, "houses", event);
    },
    [MutationTypes.SET_MESSAGE](givenState, event) {
        givenState.message = event;
    }
}

export const actions: vuexTypes.ActionTree<GOTState, GOTState> = {
    [ActionTypes.FETCH_DATA]({commit}, query) {
        const axiosResponsePromise: Promise<AxiosResponse> = getStuff(query.type);

        // check vue devtools
        return axiosResponsePromise.then(response => {
            if (query.type === apiResource.BOOKS) {
                commit(MutationTypes.SET_BOOKS, response.data);
            } else if (query.type === apiResource.HOUSES) {
                commit(MutationTypes.SET_HOUSES, response.data);
            }
        });
    }
}

export const getters: vuexTypes.GetterTree<GOTState, GOTState> = {
    books: (givenState) => givenState.books,
    houses: (givenState) => givenState.houses,
    message: (givenState) => {
        return givenState.message
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});

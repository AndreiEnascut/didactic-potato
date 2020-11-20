import axios, {AxiosResponse} from "axios";
// @ts-ignore
import querystring from "querystring";

export const apiResource = {
    BOOKS: "books",
    CHARACTERS: "characters",
    HOUSES: "houses"
}

const defaultQuery = {
    page: 1,
    pageSize: 10
}

export function getStuff(value: string, query?: {} ): Promise<AxiosResponse> {
    const stringifiedParams = querystring.stringify(query || defaultQuery);
    const params = stringifiedParams ? `?${stringifiedParams}` : "";
    return axios.get(`https://www.anapioficeandfire.com/api/${value}${params}`);
}

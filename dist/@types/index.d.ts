/**
 * Get latest comics update
 * @returns {Promise<Object>}
 */
export declare const Latest: () => Promise<object>;
/**
 * Get comics data by query
 * @param {String} query
 * @returns {Promise<object>}
 */
export declare const Search: (query: string) => Promise<object>;
/**
 * get comic details
 * @param {String} url
 * @returns {Promise<Object>}
 */
export declare const Info: (url: string) => Promise<object>;
declare const komikcast: {
    Search: (query: string) => Promise<object>;
    Latest: () => Promise<object>;
    Info: (url: string) => Promise<object>;
    search: (query: string) => Promise<object>;
    latest: () => Promise<object>;
    detail: (url: string) => Promise<object>;
};
export default komikcast;
//# sourceMappingURL=index.d.ts.map
export declare const domain: string;
/**
 * Help me to fix this :/
 */
export declare function parseUrl(url: string): string | boolean;
export interface Result {
    success: boolean;
    message?: string;
    title?: string;
    title_other?: string;
    author?: string;
    rating?: string;
    sinopsis?: string;
    type?: string;
    status?: string;
    released?: string;
    total_chapter?: number | string;
    update_on?: string;
    genres?: string[];
    total_page?: number;
    total_data?: number;
    list_chapter?: {
        ch?: string | number;
        time_release?: string;
        link?: string;
        linkId?: string;
    }[];
    ch?: string | number;
    comic_title?: string;
    prev_ch?: string | unknown;
    next_ch?: string | unknown;
    prev_link?: string | unknown;
    next_link?: string | unknown;
    images?: string[];
    data?: {
        title?: string;
        ch?: string | number;
        chapter?: string | number;
        rating?: string | number;
        image?: string;
        image2?: string;
        type?: string;
        isCompleted?: string | boolean;
        link?: string;
        linkId?: string;
        isHot?: boolean | string;
        ch_id?: unknown;
        ch_time?: unknown;
    }[];
}
//# sourceMappingURL=utils.d.ts.map
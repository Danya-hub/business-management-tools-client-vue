type Children<T> = [string, { [key: string]: string }, T[]];
interface RenderFuncContentType extends Children<RenderFuncContentType> { }

export type StoredContentViewType = {
    id: number,
    content: RenderFuncContentType,
};

export interface IMapper<From, To> {
    map(mappingObject: From): To
}
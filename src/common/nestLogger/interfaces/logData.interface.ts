export interface LogData{
    event?:string,
    service?:string,
    requestId?:string,
    method:string,
    [keys:string]:unknown
}
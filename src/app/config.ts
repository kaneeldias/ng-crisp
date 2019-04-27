const url = "http://localhost:3000/api";

export class API{

    public static getUrl(params:string){
        return url+"/"+params;
    }

}
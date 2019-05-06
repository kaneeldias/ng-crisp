const url = "http://localhost:3000/apis";

export class API{

    public static getUrl(params:string){
        return url+"/"+params;
    }

}
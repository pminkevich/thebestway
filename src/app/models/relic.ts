export class Relic{
    id?: string;
    userId:string;
    name: string;
    descripcion?: string;
    valor:number;
    madeIn?: string;
    anio?:string;
    urlPhotos:string[];
    geoLocation?:string;
    Localidad?:string;
    

}

export class Baul{
    id?:string;
    idUser:string;
    myObjects: Relic[];
    
    }
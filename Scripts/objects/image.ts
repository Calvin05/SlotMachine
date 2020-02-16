module objects 
{
    export class Image extends GameObject
    {

        constructor(imagePath:string, x:number = 0, y:number = 0, isCentered:boolean = true)
        {
            super(imagePath, x, y, isCentered);
        }
        
        protected _checkBounds(): void {
            throw new Error("Method not implemented.");
        }        
        public Start(): void {
            throw new Error("Method not implemented.");
        }
        public Update(): void {
            throw new Error("Method not implemented.");
        }
        public Reset(): void {
            throw new Error("Method not implemented.");
        }


    }
}
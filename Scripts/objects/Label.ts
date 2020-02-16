module objects 
{
    export class Label extends createjs.Text
    {
        /**
         * Creates an instance of Label.
         * @param {string} labelString
         * @param {string} fontSize
         * @param {string} fontFamily
         * @param {string} fontColour
         * @param {number} x
         * @param {number} y
         * @param {boolean} isCentered
         * @memberof Label
         */
        constructor(
            labelString:string, 
            fontSize:string, 
            fontFamily:string, 
            fontColour:string, 
            x:number, y:number, isCentered:boolean)
        {
            super(labelString, fontSize + " " + fontFamily, fontColour);

            if(isCentered)
            {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getMeasuredLineHeight() * 0.5;
            }

            this.x = x;
            this.y = y;
        }
    }
}
module objects 
{
    export class Button extends GameObject
    {
        // constructor
        constructor(imagePath:string, x:number = 0, y:number = 0, isCentered:boolean = true)
        {
            super(imagePath, x, y, isCentered);

            this.on("mouseover", this.HoverOver);
            this.on("mouseout", this.HoverOut);

            this.Start();
        }

        // PRIVATE LIFE CYCLE METHODS
        protected _checkBounds():void
        {

        }


        // PUBLIC Methods
        HoverOver():void
        {
            this.shadow = new createjs.Shadow("#222222", 0, 4, 4);
            this.setTransform
            this.scaleX = 1.1;
            this.scaleY = 1.1;
        }

        HoverOut():void
        {
            this.shadow = new createjs.Shadow("#000000", 0, 0, 0);
            this.scaleX = 1.0;
            this.scaleY = 1.0;
           
        }

        // PUBLIC LIFE CYCLE METHODS

        /**
         * Initialization happens here
         *
         * @memberof Button
         */
        public Start():void
        {

        }

        public Update():void
        {

        }

        public Reset():void
        {

        }



    }
}
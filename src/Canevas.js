const Canvas = require('canvas')
const Color = require('color-engine')
const Vector = require('./Vector')

/**
 * @class
 */

class Canevas {

    /**
     * 
     * @param {number} width 
     * @param {number} height 
     */

    constructor( width, height ){

        this.canvas = Canvas.createCanvas( width, height )
        this.ctx = this.canvas.getContext('2d')

    }

    /**
     * 
     * @param {number} fontSize 
     * @param {string} fontName 
     */

    font( fontSize, fontName ){
        this.ctx.font = fontSize + 'px ' + fontName
        return this
    }

    /**
     * 
     * @param {number} fontSize 
     */

    fontSize( fontSize ){
        const lastFontName = ctx.font.split(/\s+/).filter(arg => /[A-Z]+/i.test(arg))[0]
        this.ctx.font = fontSize + 'px ' + lastFontName
        return this
    }

    /**
     * 
     * @param {(string|number)} r 
     * @param {number} g 
     * @param {number} b 
     */

    fill( r, g, b ){
        this.ctx.fillStyle = resolveColor( r, g, b, 'fill')
        return this
    }

    /**
     * 
     * @param {(string|number)} r 
     * @param {number} g 
     * @param {number} b 
     */

    stroke( r, g, b ){
        this.ctx.strokeStyle = resolveColor( r, g, b, 'stroke' )
        return this
    }

    /**
     * 
     */

    noFill(){
        this.ctx.fillStyle = null
    }

    noStroke(){
        this.ctx.strokeStyle = null
    }

    /**
     * 
     * @param  {...any} colors 
     * @param {(Vector|number)} start 
     * @param {(Vector|number)} end 
     * @param {?number} targetX 
     * @param {?number} targetY 
     */

    gradient( ...colors, start, end, targetX, targetY ){
        let gradient
        if(start instanceof Vector)
        gradient = this.ctx.createLinearGradient( start.x, start.y, end.x, end.y )
        else gradient = this.ctx.createLinearGradient( start, end, targetX, targetY )
        colors.forEach( (color, i) => {
            const offset = Vector.map( i, 0, colors.length, .0, 1.0 )
            gradient.addColorStop( offset, color )
        })
        this.ctx.fillStyle = gradient
        return this
    }

    /**
     * 
     * @param {(Vector|number)} position 
     * @param {(Vector|number)} size 
     * @param {?number} width 
     * @param {?number} height 
     */

    rect( position, size, width, height ){
        if(position instanceof Vector)
        this.ctx.fillRect( position.x, position.y, size.x, size.y )
        else this.ctx.fillRect( position, size, width, height )
        return this
    }

    /**
     * 
     * @param {(Vector|number)} position 
     * @param {number} ray 
     * @param {?number} rayBis 
     */

    circle( position, ray, rayBis ){
        if(position instanceof Vector){
            this.ctx.arc( 
                position.x, position.y, 
                ray, 0, 2 * Math.PI
            )
        }else{
            this.ctx.arc( 
                position, ray, 
                rayBis, 0, 2 * Math.PI
            )
        }
        return this
    }

    /**
     * 
     * @param {string} text 
     * @param {(Vector|number)} position 
     * @param {?number} y 
     * @param {?number} maxWidth
     */

    text( text, position, y, maxWidth ){
        if(position instanceof Vector)
        this.ctx.fillText( text, position.x, position.y, y )
        else this.ctx.fillText( text, position, y, maxWidth )
        return this
    }

}

function resolveColor( ...args, functionName ){
    const [ r, g, b ] = args
    let color
    if(
        g === null &&
        b === null
    ){
        if(typeof r === 'number'){
            // niveau de gris
            color = (new Color([r,r,r])).hex
        }else if(typeof r === 'string'){
            // chaine hexa ou nom de couleur
            color = r
        }else throw Error(`please put a valid color into <Canevas>.${functionName} function.`)
    }else if(
        typeof r === 'number' &&
        typeof g === 'number' &&
        typeof b === 'number'
    ){
        // rgb code
        color = (new Color([r,g,b])).hex
    }
    return color
}
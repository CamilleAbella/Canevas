

class Vector {

    constructor( x, y ){
        this.x = x
        this.y = y
    }

    /**
     * 
     * @param {(Vector|number)} vec 
     * @param {?number} y 
     */

    add( vec, y ){
        if(vec instanceof Vector){
            this.x += vec.x
            this.y += vec.y
        }else{
            this.x += vec
            this.y += y
        }
    }

    static map( value, range, newRange, start, end ){
        if(range instanceof Vector)
        return (value - range.x) / (range.y - range.x) * (newRange.y - newRange.x) + newRange.x
        else return (value - range) / (newRange - range) * (end - start) + start
    }

}

module.exports = {
    Vector: Vector,
    vec: (x,y) => new Vector(x,y)
}